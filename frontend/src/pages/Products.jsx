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

  //-----------------------------------
  // FILTER FUNCTIONALITY AND STATES
  //-----------------------------------

  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [categories, setCategories] = useState([])

  // input states
  const [price, setPrice] = useState(100)
  const [rating, setRating] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleRating = (e) => {
    setRating(e.target.value)
  }

  useEffect(() => {
    async function getCat() {
      const response = await services.getCategories()
      setCategories(response.data)
    }
    getCat()
  }, [])


  // ------------------------------ CHAT GPT CODE -----------------------------
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setSelectedCategories((prev) => [...prev, value])
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value))
    }
  }
  // ---------------------------------------------------------------------------

  // HANDLE SUBMIT >>> BAD REQUEST 505 AXIOS ERROR
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await services.filterProducts({
      prc: price,
      ratng: rating,
      cat: selectedCategories
    })
    console.log(response)
  }

  const handleReset = () => {
    setRating(1)
    setPrice(100)
    setSelectedCategories([])
  }

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
        {filterSidebar &&
          <Filter
            selectedCategories={selectedCategories}
            setFilterSidebar={setFilterSidebar}
            categories={categories}
            setCategories={setCategories}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            categoriesOpen={categoriesOpen}
            setCategoriesOpen={setCategoriesOpen}
            handlePrice={handlePrice}
            handleRating={handleRating}
            handleCategoryChange={handleCategoryChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
          />}
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