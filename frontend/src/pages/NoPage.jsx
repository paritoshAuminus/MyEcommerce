import React from 'react'
import { LuDog } from 'react-icons/lu'
import { Link } from 'react-router-dom'

function NoPage() {
    return (
        <div className='w-full h-full flex items-center justify-center pt-6 md:pt-12'>
            <div className='flex flex-col gap-3 justify-center items-center text-xl text-indigo-600'>
                <LuDog className='h-32 md:h-64 w-32 md:w-64 text-indigo-900' />
                <p className='text-indigo-600 font-semibold text-4xl'>Oops</p>
                <p className='text-md font-semibold text-gray-600'>The page you were looking for does not exist...</p>
                <Link to={'/'} className='text-sm font-semibold text-blue-600 hover:text-blue-500'>Go home</Link>
            </div>
        </div>
    )
}

export default NoPage