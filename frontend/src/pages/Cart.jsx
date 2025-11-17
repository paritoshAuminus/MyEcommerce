import { useEffect, useState } from "react";
import services from './../auth/service'
import CartItem from './../components/CartItem'

function Cart() {

  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProd = async () => {
      const response = await services.getProducts()
      setProducts(response.data)
    }
    getProd()
  }, [])

  useEffect(() => {
    const getCartItems = async () => {
      const response = await services.getCart()
      setCartItems(response.data)
    }
    getCartItems()
  }, [])

  console.log("Cart: ", cartItems)
  console.log("Products: ", products)

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">

      {/* Hero */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3">Your Cart</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Review your selected items and adjust quantities before checkout.
        </p>
      </section>

      {/* Cart Layout */}
      <section className="max-w-7xl mx-auto py-16 px-6 md:px-12 grid md:grid-cols-3 gap-10">

        {/* LEFT: Cart Items */}
        <div className="md:col-span-2 space-y-6">
          <ol>
            {cartItems.map((i) => {
              const product = products.find(p => p.id === i.productId);
              if (!product) return null; // prevent crashes

              return (
                <li key={i.id}>
                  <CartItem
                    img={product.image}
                    cartItem={i}
                    product={product}
                    setCartItems={setCartItems}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 h-fit">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Order Summary</h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$00.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$00.00</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t">
              <span>Total</span>
              <span>$00.00</span>
            </div>
          </div>

          <button className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-indigo-600 text-white text-center py-12 px-6">
        <h3 className="text-2xl font-semibold mb-2">Almost Done</h3>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          Your items are ready — complete your purchase and enjoy fast delivery.
        </p>
      </section>
    </div>
  );
}

export default Cart;