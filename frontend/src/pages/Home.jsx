import React, { useEffect, useState } from 'react'
import { ShoppingBag, Star } from "lucide-react";
import { FaBagShopping } from "react-icons/fa6";
import services from '../auth/service';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProductCard } from './../components'

export function Home() {

    const [featuredProducts, setFeaturedProducts] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const status = useSelector((state) => state.auth.status)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await services.getProducts();
                if (response.status === 200) {
                    const featured = response.data.filter(item => item.featured_product);
                    setFeaturedProducts(featured)
                    setProducts(response.data.slice(0, 6))
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white text-center py-20 px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to <span className="text-yellow-300">ShopEase</span>
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Discover premium gadgets at unbeatable prices.
                </p>
                <Link to={'/products'} className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded-full transition cursor-pointer">
                    Shop Now
                </Link>
            </section>

            {/* Featured Products */}
            <section className="max-w-6xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
                    <Star className="text-yellow-400 w-6 h-6" /> Featured Products
                </h2>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                    {loading ? (
                        <div className="flex justify-center items-center text-xl text-gray-600 w-full col-span-full">
                            <p>Loading featured products...</p>
                        </div>
                    ) : featuredProducts.length !== 0 ? (
                        featuredProducts.map((product) => (
                            <Link
                                to={`/products/${product.id}`}
                                key={product.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center text-center"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-blue-600 font-bold text-lg mb-3">
                                    ${product.price}
                                </p>
                                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-full transition">
                                    <ShoppingBag size={18} /> Add to Cart
                                </button>
                            </Link>
                        ))
                    ) : (
                        <div className="flex justify-center items-center text-xl text-gray-600 w-full col-span-full">
                            <p>No featured products</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action Footer */}
            {!status && <section className="bg-white py-12 text-center border-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Join thousands of happy customers!
                </h3>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-full transition">
                    Create Your Account
                </button>
            </section>}

            {/* Set products */}
            <section className='max-w-6xl mx-auto py-16 px-6 border-t border-gray-400'>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
                    <FaBagShopping className="text-indigo-400 w-8 h-8" /> Shop Now
                </h2>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
                    {products && products.map((item) => (
                        <div key={item.id}>
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;