import { Link } from "react-router-dom";
import services from "../auth/service";

function CartItem({ cartItem, product, setCartItems }) {

    const { id: cartItemId, quantity } = cartItem;
    const { id, name, img, description, price } = product;

    const handleUpdateQuantity = async (operation) => {
        const newQuantity =
            operation === "increment" ? quantity + 1 : quantity - 1;

        if (newQuantity < 1) return;

        try {
            await services.updateCart({
                cartItemId,
                quantity: newQuantity
            });

            setCartItems(prev =>
                prev.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

        } catch (err) {
            console.log("Error updating quantity:", err);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 gap-4">

            <Link to={`/products/${id}`}>
                <img
                    src={img}
                    alt={name}
                    className="w-36 h-32 object-cover rounded-md"
                />
            </Link>

            <div className="flex flex-col justify-between w-full">

                <div>
                    <h3 className="font-semibold text-gray-800 text-xl">{name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{description}</p>
                    <p className="text-indigo-600 font-bold text-lg mt-3">${price}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3">
                        <button
                            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100 transition"
                            onClick={() => handleUpdateQuantity("decrement")}
                        >
                            -
                        </button>

                        <span className="text-gray-800 font-semibold">{quantity}</span>

                        <button
                            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100 transition"
                            onClick={() => handleUpdateQuantity("increment")}
                        >
                            +
                        </button>
                    </div>

                    <button className="px-4 py-1 text-red-600 border border-red-500 rounded hover:bg-red-50 transition font-medium">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem
