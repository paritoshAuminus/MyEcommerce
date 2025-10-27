import React from 'react'
import { ShoppingBag, Star } from "lucide-react";

export function Home() {
    const featuredProducts = [
        { id: 1, name: "Smart Watch", price: "$199", image: "/images/watch.jpg" },
        { id: 2, name: "Wireless Headphones", price: "$149", image: "/images/headphones.jpg" },
        { id: 3, name: "Gaming Keyboard", price: "$89", image: "/images/keyboard.jpg" },
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-indigo-600 text-white text-center py-20 px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to <span className="text-yellow-300">ShopEase</span>
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Discover premium gadgets at unbeatable prices.
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded-full transition">
                    Shop Now
                </button>
            </section>

            {/* Featured Products */}
            <section className="max-w-6xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
                    <Star className="text-yellow-400 w-6 h-6" /> Featured Products
                </h2>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center text-center"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-40 h-40 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {product.name}
                            </h3>
                            <p className="text-blue-600 font-bold text-lg mb-3">{product.price}</p>
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-full transition">
                                <ShoppingBag size={18} /> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Footer */}
            <section className="bg-white py-12 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Join thousands of happy customers!
                </h3>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-full transition">
                    Create Your Account
                </button>
            </section>
        </main>
    );
}