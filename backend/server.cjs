// server.cjs
require('dotenv').config()
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

// ----------------------------------------------------------------------
// FIRE UP THE SERVER (auth + e-commerce endpoints) >>> node server.cjs
// ----------------------------------------------------------------------

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(jsonServer.bodyParser)

const SECRET_KEY = process.env.JWT_SECRET
if (!SECRET_KEY) {
    console.error('❌ JWT_SECRET missing in .env file')
    process.exit(1)
}

// ----------------------------------------------------------------------
// JWT helper middleware
// ----------------------------------------------------------------------
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'No token provided' })

    const token = authHeader.split(' ')[1]
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' })
        req.user = decoded
        next()
    })
}

// ----------------------------------------------------------------------
// AUTH ROUTES
// ----------------------------------------------------------------------
server.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Name, email, and password required' })

    const existing = router.db.get('users').find({ email }).value()
    if (existing) return res.status(409).json({ message: 'Email already in use' })

    const newUser = { id: Date.now(), name, email, password, role: 'user' }
    router.db.get('users').push(newUser).write()

    res.status(201).json({
        message: 'User registered successfully',
        user: { id: newUser.id, name, email },
    })
})

server.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password required' })

    const user = router.db.get('users').find({ email }).value()
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.password !== password)
        return res.status(401).json({ message: 'Invalid credentials' })

    // create JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
    )

    res.json({
        message: 'Login successful',
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
    })
})

server.put('/auth/update', verifyToken, (req, res) => {
    const userId = req.user.id
    const user = router.db.get('users').find({ id: userId }).value()
    if (!user) return res.status(404).json({ message: 'User not found' })

    const { name, email, password } = req.body
    const updatedData = {}
    if (name) updatedData.name = name
    if (email) {
        const existing = router.db
            .get('users')
            .find((u) => u.email === email && u.id !== userId)
            .value()
        if (existing)
            return res
                .status(409)
                .json({ message: 'Email already in use by another account' })
        updatedData.email = email
    }
    if (password) updatedData.password = password

    const updatedUser = router.db.get('users').find({ id: userId }).assign(updatedData).write()
    res.json({
        message: 'User updated successfully',
        user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
    })
})

server.get('/auth/getUser', verifyToken, (req, res) => {
    const user = router.db.get('users').find({ id: req.user.id }).value()
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.status(200).json({
        message: 'User is logged in',
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
})

// ----------------------------------------------------------------------
// PRODUCT ROUTES
// ----------------------------------------------------------------------
server.get('/products', (req, res) => {
    let products = router.db.get('products').value()
    if (req.query.categoryId) {
        products = products.filter((p) => p.categoryId == parseInt(req.query.categoryId))
    }
    res.json(products)
})

server.get('/products/:id', (req, res) => {
    const product = router.db.get('products').find({ id: parseInt(req.params.id) }).value()
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
})

server.post('/products/filter', (req, res) => {
    const { categories, price, rating } = req.body
    let products = router.db.get('products').value()
    if (Array.isArray(categories) && categories.length > 0) {
        const allCategories = router.db.get('categories').value()
        const selected = categories.map((c) => c.toLowerCase())
        const selectedIds = allCategories
            .filter((cat) => selected.includes(cat.name.toLowerCase()))
            .map((cat) => cat.id)
        products = products.filter((p) => selectedIds.includes(p.categoryId))
    }
    if (typeof price === 'number' && !isNaN(price)) {
        products = products.filter((p) => p.price <= price)
    }
    if (typeof rating === 'number' && !isNaN(rating)) {
        products = products.filter((p) => (p.rating || 0) >= rating)
    }
    res.status(200).json(products)
})

server.post('/products', verifyToken, (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Admin access only' })

    const { title, description, price, categoryId, stock } = req.body
    if (!title || !price || !categoryId)
        return res.status(400).json({ message: 'Title, price, and category required' })

    const newProduct = { id: Date.now(), title, description, price, categoryId, stock: stock || 0 }
    router.db.get('products').push(newProduct).write()
    res.status(201).json(newProduct)
})

server.put('/products/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Admin access only' })

    const id = parseInt(req.params.id)
    const product = router.db.get('products').find({ id }).value()
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const updatedProduct = router.db.get('products').find({ id }).assign(req.body).write()
    res.json(updatedProduct)
})

server.delete('/products/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Admin access only' })

    const id = parseInt(req.params.id)
    const product = router.db.get('products').find({ id }).value()
    if (!product) return res.status(404).json({ message: 'Product not found' })

    router.db.get('products').remove({ id }).write()
    res.status(204).end()
})

// ----------------------------------------------------------------------
// CATEGORY ROUTES
// ----------------------------------------------------------------------
server.get('/categories', (req, res) => {
    res.json(router.db.get('categories').value())
})

server.post('/categories', verifyToken, (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Admin access only' })

    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Category name required' })
    const newCategory = { id: Date.now(), name }
    router.db.get('categories').push(newCategory).write()
    res.status(201).json(newCategory)
})

// ----------------------------------------------------------------------
// CART, ORDERS, REVIEWS (unchanged logic)
// ----------------------------------------------------------------------
server.get('/cart', (req, res) => {
    const userId = parseInt(req.headers['x-user-id'])
    if (!userId) return res.status(401).json({ message: 'Missing x-user-id header' })
    const cart = router.db.get('carts').filter({ userId }).value()
    res.json(cart)
})

server.post('/cart', (req, res) => {
    const userId = parseInt(req.headers['x-user-id'])
    const { productId, quantity } = req.body
    if (!userId || !productId || !quantity)
        return res.status(400).json({ message: 'User, productId, and quantity required' })

    const newItem = { id: Date.now(), userId, productId, quantity }
    router.db.get('carts').push(newItem).write()
    res.status(201).json(newItem)
})

server.put('/cart/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userId = parseInt(req.headers['x-user-id'])
    const item = router.db.get('carts').find({ id, userId }).value()
    if (!item) return res.status(404).json({ message: 'Cart item not found' })
    const updatedItem = router.db.get('carts').find({ id }).assign(req.body).write()
    res.json(updatedItem)
})

server.delete('/cart/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userId = parseInt(req.headers['x-user-id'])
    const item = router.db.get('carts').find({ id, userId }).value()
    if (!item) return res.status(404).json({ message: 'Cart item not found' })
    router.db.get('carts').remove({ id }).write()
    res.status(204).end()
})

server.get('/orders', (req, res) => {
    const userId = parseInt(req.headers['x-user-id'])
    if (!userId) return res.status(401).json({ message: 'Missing x-user-id header' })
    const orders = router.db.get('orders').filter({ userId }).value()
    res.json(orders)
})

server.post('/orders', (req, res) => {
    const userId = parseInt(req.headers['x-user-id'])
    const { items, total } = req.body
    if (!items || !total)
        return res.status(400).json({ message: 'Items and total required' })

    const newOrder = {
        id: Date.now(),
        userId,
        items,
        total,
        createdAt: new Date().toISOString(),
        status: 'pending',
    }
    router.db.get('orders').push(newOrder).write()
    res.status(201).json(newOrder)
})

server.get('/reviews/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)
    const reviews = router.db.get('reviews').filter({ productId }).value()
    res.json(reviews)
})

server.post('/reviews/:productId', (req, res) => {
    const userId = parseInt(req.headers['x-user-id'])
    const productId = parseInt(req.params.productId)
    const { rating, comment } = req.body
    if (!rating || !comment)
        return res.status(400).json({ message: 'Rating and comment required' })

    const newReview = {
        id: Date.now(),
        userId,
        productId,
        rating,
        comment,
        createdAt: new Date().toISOString(),
    }
    router.db.get('reviews').push(newReview).write()
    res.status(201).json(newReview)
})

// ----------------------------------------------------------------------
server.use(router)
server.listen(8080, () =>
    console.log('✅ E-commerce JSON Server running on http://localhost:8080')
)
