import React, { useEffect, useState } from "react";
import { CartItem } from "../components";
import { FaRegSadCry } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import services from "../auth/service";

function Cart() {

  const [quantity, setQuantity] = useState(1)
  const cartItemsRaw = useSelector((state) => state.cart.cart)
  const [cartItems, setCartItems] = useState([])

  const handleQuant = (e, opr) => {
    e.stopPropagation()
    if (opr === '+') {
      setQuantity((...prev) => prev + 1)
    } else if (opr === '-') {
      setQuantity((...prev) => prev - 1)
    }
  }

  useEffect(() => {
      const cartFetcher = async () => {
        try {
          const cartRes = await services.getCart();
          const productRes = await services.getProducts();

          const cartResult = cartRes.data.map((c) => productRes.data.find((p) => p.id === c.productId.productId))
          console.log(cartRes)
          console.log(cartResult)
          setCartItems(cartResult)
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        }
      };

      cartFetcher();
  }, [cartItemsRaw])


  const handleRemove = async (id) => {
    const response = await services.removeFromCart({ id: id })
    console.log(response)
  }

  // useEffect(() => {
  //   handleRemove(2)
  // }, [])

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Your Cart</h1>
        <p className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          Review items before checkout. Update quantities, apply a promo code, or remove items.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto py-12 px-6 md:px-12 grid gap-10 md:grid-cols-3">
        {/* Cart list */}
        <section className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Items in your cart ({cartItems.length})</h2>

            {/* Cart items */}
            {cartItems.length > 0 ?
              cartItems.map((item) => (
                <Link to={`/products/${item.id}`}>
                  <CartItem
                    key={Math.random() * 10}
                    id={item.id}
                    srcImg={item.image}
                    name={item.name}
                    price={item.price}
                    setQuantity={setQuantity}
                    quantity={quantity}
                    handleRemove={handleRemove}
                    handleQuant={handleQuant}
                    description={item.description} />
                </Link>
              ))
              : <div className="w-full flex flex-col items-center justify-center gap-3 py-12 px-3">
                <p className="text-3xl flex items-center gap-3 text-gray-400 font-semibold">The cart is empty <FaRegSadCry className='text-yellow-300' /></p>
                <Link to={'/products'} className="text-md font-semibold text-indigo-600 hover:text-indigo-500">Start Shopping</Link>
              </div>}
          </div>
        </section>

        {/* Summary / Checkout */}
        <aside className="col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>

            <dl className="text-sm text-gray-600 space-y-3">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">₹13,296</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="font-medium text-gray-900">₹199</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="font-medium text-gray-900">₹1,200</dd>
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between items-center">
                <dt className="text-lg font-semibold">Total</dt>
                <dd className="text-lg font-extrabold text-indigo-600">₹14,695</dd>
              </div>
            </dl>

            {/* Promo code (no logic) */}
            <div className="mt-6">
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                Promo code
              </label>
              <div className="flex gap-3">
                <input
                  id="promo"
                  name="promo"
                  type="text"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter code"
                  aria-label="Promo code (no-op)"
                  readOnly
                />
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition cursor-not-allowed"
                  aria-disabled="true"
                >
                  Apply
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">*Promo input is decorative in this presentational version.</p>
            </div>

            <button
              type="button"
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition cursor-not-allowed"
              aria-disabled="true"
            >
              Proceed to Checkout
            </button>

            <p className="mt-4 text-xs text-gray-500">
              Secure checkout · 30-day returns · Multiple payment methods accepted
            </p>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white text-center py-10 px-6">
        <h4 className="text-lg font-semibold mb-1">Need help?</h4>
        <p className="max-w-2xl mx-auto text-sm leading-relaxed">
          Visit our help center or contact support to change orders before shipping.
        </p>
      </footer>
    </div>
  );
}

export default Cart;