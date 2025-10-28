// src/pages/ProductsPage.jsx
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import services from '../auth/service'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await services.getProducts()
      setProducts(response.data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Products