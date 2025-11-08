// src/components/ProductCard.jsx
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product, handleAddToCart }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  const handleAdd = (e) => {
    e.stopPropagation(); // stops the click from reaching the parent div
    handleAddToCart({ productId: product.id });
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border border-gray-200 rounded-lg shadow-sm hover:shadow-md p-4 transition duration-200 bg-white"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain mb-3"
      />

      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm mb-2">{product.category}</p>

      <p className="text-lg font-bold text-gray-900">${product.price}</p>

      <div className="text-yellow-500 text-sm">
        {'⭐'.repeat(Math.round(product.rating))}{' '}
        <span className="text-gray-500 text-xs">
          ({product.rating.toFixed(1)})
        </span>
      </div>
      <button
        onClick={(e) => handleAdd(e)}
        className='w-full py-2 text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer my-1 rounded-lg'
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
