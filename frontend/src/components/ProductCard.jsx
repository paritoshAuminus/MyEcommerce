// src/components/ProductCard.jsx
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg shadow-sm hover:shadow-md p-4 transition duration-200 bg-white"
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
    </div>
  )
}

export default ProductCard
