import React, { useEffect, useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { ImCross } from "react-icons/im";
import services from '../auth/service';

function Filter({ setFilterSidebar }) {

  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [price, setPrice] = useState(100)
  const [rating, setRating] = useState(1)

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

  const handleSubmit = () => {
    
  }

  return (
    <div className='w-50 md:w-62 min-h-screen z-90 text-black fixed right-0 top-16 bg-white shadow-lg py-5'>
      <div className='flex justify-end px-3'>
        <button onClick={() => setFilterSidebar(false)} className='text-sm md:text-md text-gray-600 cursor-pointer'>
          <ImCross />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col'>
          {/* Categories drop down */}
          <div className='w-full shadow-md p-3'>
            <span className='flex justify-between w-full items-center'>
              <h1 className='text-lg md:text-2xl'>Categories</h1>
              <button type='button' onClick={() => setCategoriesOpen(!categoriesOpen)}>
                {categoriesOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
            </span>
            {/* Categories */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${categoriesOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
            >
              <div className='text-md md:text-xl flex gap-2 items-center flex-col'>
                {categories.map((category) => (
                  <div key={category} className='flex justify-between w-full'>
                    <label htmlFor={category}>{category}</label>
                    <input type="checkbox" id={category} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price range */}
          <div className='p-3 shadow-lg'>
            <div className='flex gap-3'>
              <label htmlFor="price">Price:</label>
              <span>&#8377;{price}</span>
            </div>
            <input
              className='appearence-none accent-indigo-600'
              onChange={(e) => handlePrice(e)}
              value={price}
              type="range"
              min={100}
              max={4000}
              step={100} />
          </div>

          {/* Rating range */}
          <div className='p-3 shadow-lg'>
            <div className='flex gap-3'>
              <label htmlFor="price">Rating:</label>
              <span>{rating}</span>
            </div>
            <input
              className='appearence-none accent-indigo-600'
              onChange={(e) => handleRating(e)}
              value={rating}
              type="range"
              min={1}
              max={5} />
          </div>
        {/* Lower section */}
        <div className='flex justify-between text-white p-2'>
          <button type='submit' className='py-2 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer'>Apply</button>
          <button type='reset' className='py-2 px-3 bg-gray-700 hover:bg-gray-800 rounded-lg cursor-pointer'>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Filter