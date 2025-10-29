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
      try {
        const response = await services.getProduct({ id })
        setProduct(response)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  async function handleAddToCart() {
    if (!product) return
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
      alert('✅ Product added to cart!')
    } catch (error) {
      console.log('Error adding to cart:', error)
      alert('❌ Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600">Loading...</div>
      </div>
    )

  if (!product)
    return <p className="text-center py-10 text-gray-500">Product not found.</p>

  return (
    <div className="max-w-6xl mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 p-10">

        {/* Left: Product Image with gallery-style background */}
        <div className="relative flex justify-center items-center bg-gray-100 rounded-xl p-6">
          <img
            src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.name || 'Product'}
            className="w-96 h-96 object-contain transition-transform duration-500 transform hover:scale-110 drop-shadow-md"
          />

          {/* Optional: floating discount badge or tag */}
          {product.discount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <p className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-2">
            {product.category || 'Category'}
          </p>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name || 'Product Name'}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <span className="text-yellow-400 text-lg">
              {'⭐'.repeat(Math.round(product.rating || 4))}
            </span>
            <span className="ml-2 text-gray-500 text-sm">
              ({product.rating ? product.rating.toFixed(1) : '4.0'})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description ||
              'This product is crafted with exceptional attention to detail, ensuring top-notch performance and lasting quality. Perfect for elevating your everyday lifestyle.'}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-4xl font-extrabold text-blue-600">
                ${product.price?.toFixed(2) || '49.99'}
              </p>
            </div>
            {product.originalPrice && (
              <p className="text-sm line-through text-gray-400">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`px-10 py-4 rounded-xl font-semibold text-white text-lg tracking-wide shadow-lg transition-all duration-300 ${adding
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
              }`}
          >
            {adding ? 'Adding...' : '🛒 Add to Cart'}
          </button>

          {/* Optional: trust badges or shipping info */}
          <div className="mt-8 text-sm text-gray-500 flex items-center gap-4">
            <span>✅ Free Shipping</span>
            <span>🔒 Secure Payment</span>
            <span>💬 24/7 Support</span>
          </div>
        </div>
      </div>
      {/* reviews section */}
    </div>
  )
}

export default ProductDetails
