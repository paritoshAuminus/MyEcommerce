import { useEffect, useState } from 'react'
import { ProductCard, Filter } from './../components'
import services from '../auth/service'
import { FaFilter } from "react-icons/fa6";

function Products() {
  const [products, setProducts] = useState([])
  const [filterSidebar, setFilterSidebar] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      const response = await services.getProducts()
      setProducts(response.data)
    }
    fetchProducts()
  }, [])

  //---------------------------------------------------------------
  // TODO: CONTINUE WITH FILTER SIDEBAR DEVELOPMENT AND DEPLOYMENT
  //---------------------------------------------------------------

  return (
    <>
      <div className='w-full flex justify-end bg-white shadow-md p-5 text-white text-lg md:text-2xl relative'>
        <button onClick={() => setFilterSidebar(true)} className='flex items-center gap-2 px-3 py-1 font-semibold bg-indigo-600 rounded-lg cursor-pointer'>
          <span>
            Filter
          </span>
          <span className='text-sm'>
            <FaFilter />
          </span>
        </button>
        {/* filter sidebar */}
        {filterSidebar && <Filter setFilterSidebar={setFilterSidebar}/>}
      </div>
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Products