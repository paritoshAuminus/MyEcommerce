const jsonServer = require("json-server");
const jwt = require('jsonwebtoken');

// ----------------------------------------------------------------------
// FIRE UP THE SERVER (auth + e-commerce endpoints) >>> node server.cjs
// FIRE UP THE SERVER (basic CRUD for db.json)    >>> json-server --watch db.json
// ----------------------------------------------------------------------

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ----------------------------------------
// AUTH ROUTES
// ----------------------------------------

// Register user
server.post("/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password required" });

    const existing = router.db.get("users").find({ email }).value();
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const newUser = { id: Date.now(), name, email, password, role: "user" };
    router.db.get("users").push(newUser).write();

    res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, name, email } });
});

// Login user
server.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = router.db.get("users").find({ email }).value();
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) return res.status(401).json({ message: "Invalid credentials" });

    // simple token
    res.json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token: user.id
    });
});

// Update user
server.put("/auth/update", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const userId = parseInt(authHeader.split(' ')[1]);
    const user = router.db.get("users").find({ id: userId }).value();
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password } = req.body;
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) {
        if (router.db.get("users").find(u => u.email === email && u.id !== userId).value()) {
            return res.status(409).json({ message: "Email already in use by another account" });
        }
        updatedData.email = email;
    }
    if (password) updatedData.password = password;

    const updatedUser = router.db.get("users").find({ id: userId }).assign(updatedData).write();
    res.json({ message: "User updated successfully", user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email } });
});

// Get logged-in user
server.get("/auth/getUser", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(' ')[1]; // e.g. "Bearer 1" → "1"
    const userId = parseInt(token);
    const user = router.db.get("users").find({ id: userId }).value();

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
        message: "User is logged in",
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
});

// ----------------------------------------
// PRODUCT ROUTES
// ----------------------------------------

// Get all products or filter by category
server.get("/products", (req, res) => {
    let products = router.db.get("products").value();
    if (req.query.categoryId) {
        products = products.filter(p => p.categoryId == parseInt(req.query.categoryId));
    }
    res.json(products);
});

// Get single product
server.get("/products/:id", (req, res) => {
    const product = router.db.get("products").find({ id: parseInt(req.params.id) }).value();
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});


// CUSTOM FILTER ROUTE
server.post("/products/filter", (req, res) => {
    console.log("➡️ /products/filter called");
    console.log("Request body:", req.body);

    const { categories, price, rating } = req.body;

    // Fetch all products initially
    let products = router.db.get("products").value();

    if (Array.isArray(categories) && categories.length > 0) {
        const allCategories = router.db.get("categories").value();

        // Convert frontend names → lowercase
        const selected = categories.map(c => c.toLowerCase());

        // Find matching category IDs
        const selectedIds = allCategories
            .filter(cat => selected.includes(cat.name.toLowerCase()))
            .map(cat => cat.id);

        console.log("Matched category IDs:", selectedIds);

        // Filter products that belong to these category IDs
        products = products.filter(p => selectedIds.includes(p.categoryId));
    }

    if (typeof price === "number" && !isNaN(price)) {
        products = products.filter(p => p.price <= price);
    }

    if (typeof rating === "number" && !isNaN(rating)) {
        products = products.filter(p => (p.rating || 0) >= rating);
    }

    res.status(200).json(products);
});


// Admin - add product
server.post("/products", (req, res) => {
    const { title, description, price, categoryId, stock } = req.body;
    if (!title || !price || !categoryId) return res.status(400).json({ message: "Title, price, and category required" });

    const newProduct = { id: Date.now(), title, description, price, categoryId, stock: stock || 0 };
    router.db.get("products").push(newProduct).write();
    res.status(201).json(newProduct);
});

// Admin - update product
server.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = router.db.get("products").find({ id }).value();
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedProduct = router.db.get("products").find({ id }).assign(req.body).write();
    res.json(updatedProduct);
});

// Admin - delete product
server.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = router.db.get("products").find({ id }).value();
    if (!product) return res.status(404).json({ message: "Product not found" });

    router.db.get("products").remove({ id }).write();
    res.status(204).end();
});

// ----------------------------------------
// CATEGORY ROUTES
// ----------------------------------------

// get all categories
server.get("/categories", (req, res) => {
    res.json(router.db.get("categories").value());
});

// add new category
server.post("/categories", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name required" });

    const newCategory = { id: Date.now(), name };
    router.db.get("categories").push(newCategory).write();
    res.status(201).json(newCategory);
});

// ----------------------------------------
// CART ROUTES
// ----------------------------------------

// 🛒 GET /cart
// Fetch all cart items belonging to the logged-in user (based on x-user-id header)
server.get("/cart", (req, res) => {
    const userId = parseInt(req.headers["x-user-id"]);
    if (!userId) return res.status(401).json({ message: "Missing x-user-id header" });

    const cart = router.db.get("carts").filter({ userId }).value();
    res.json(cart);
});


// 🛍️ POST /cart
// Add a new product to the user's cart (requires userId, productId, and quantity)
server.post("/cart", (req, res) => {
    const userId = parseInt(req.headers["x-user-id"]);
    const { productId, quantity } = req.body;
    if (!userId || !productId || !quantity) return res.status(400).json({ message: "User, productId, and quantity required" });

    const newItem = { id: Date.now(), userId, productId, quantity };
    router.db.get("carts").push(newItem).write();
    res.status(201).json(newItem);
});


// ✏️ PUT /cart/:id
// Update a specific cart item (e.g., change quantity) for the current user
server.put("/cart/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.headers["x-user-id"]);
    const item = router.db.get("carts").find({ id, userId }).value();
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    const updatedItem = router.db.get("carts").find({ id }).assign(req.body).write();
    res.json(updatedItem);
});


// 🗑️ DELETE /cart/:id
// Remove a specific cart item for the current user
server.delete("/cart/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.headers["x-user-id"]);
    const item = router.db.get("carts").find({ id, userId }).value();
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    router.db.get("carts").remove({ id }).write();
    res.status(204).end();
});

// ----------------------------------------
// ORDERS
// ----------------------------------------
server.get("/orders", (req, res) => {
    const userId = parseInt(req.headers["x-user-id"]);
    if (!userId) return res.status(401).json({ message: "Missing x-user-id header" });

    const orders = router.db.get("orders").filter({ userId }).value();
    res.json(orders);
});

server.post("/orders", (req, res) => {
    const userId = parseInt(req.headers["x-user-id"]);
    const { items, total } = req.body;
    if (!items || !total) return res.status(400).json({ message: "Items and total required" });

    const newOrder = { id: Date.now(), userId, items, total, createdAt: new Date().toISOString(), status: "pending" };
    router.db.get("orders").push(newOrder).write();
    res.status(201).json(newOrder);
});

// ----------------------------------------
// REVIEWS
// ----------------------------------------
server.get("/reviews/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    const reviews = router.db.get("reviews").filter({ productId }).value();
    res.json(reviews);
});

server.post("/reviews/:productId", (req, res) => {
    const userId = parseInt(req.headers["x-user-id"]);
    const productId = parseInt(req.params.productId);
    const { rating, comment } = req.body;
    if (!rating || !comment) return res.status(400).json({ message: "Rating and comment required" });

    const newReview = { id: Date.now(), userId, productId, rating, comment, createdAt: new Date().toISOString() };
    router.db.get("reviews").push(newReview).write();
    res.status(201).json(newReview);
});

// ----------------------------------------
// FALLBACK ROUTER
// ----------------------------------------
server.use(router);

server.listen(8080, () => console.log("✅ E-commerce JSON Server running on http://localhost:8080"));
