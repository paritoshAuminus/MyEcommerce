// src/pages/ProductDetails.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import services from '../auth/service'

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            const response = await services.getProduct({ id: id })
            console.log(response.image)
            return response
        }
        fetchProduct()
    }, [id])

    async function handleAddToCart() {
        setAdding(true)
        try {
            await axiosInstance.post(
                '/cart',
                { productId: product.id, quantity: 1 },
                {
                    headers: {
                        'x-user-id': localStorage.getItem('userId'),
                    },
                }
            )
            alert('Product added to cart!')
        } catch (error) {
            console.log('Error adding to cart:', error)
            alert('Failed to add to cart')
        } finally {
            setAdding(false)
        }
    }

    // if (loading) return <p className="text-center py-10">Loading...</p>
    // if (!product) return <p className="text-center py-10">Product not found.</p>

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden p-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name || 'name'}
                        className="w-80 h-80 object-contain"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {product.name || 'name'}
                    </h2>
                    <p className="text-gray-500 mb-2">{product.category || 'category'}</p>
                    <p className="text-gray-700 mb-4">{product.description || 'Description'}</p>

                    <p className="text-2xl font-bold text-gray-900 mb-3">
                        ${product.price}
                    </p>

                    <div className="text-yellow-500 mb-4">
                        {'⭐'.repeat(Math.round(product.rating))}{' '}
                        <span className="text-gray-500 text-sm">
                            {/* {({product.rating.toFixed(1)})} */}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {adding ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
