import React from 'react'

function CartItem({
    srcImg='https://placehold.co/120x120/CFF3E0/0B6623?text=Product',
    name = 'Product name',
    price = 999,
    id,
    handleQuant,
    handleRemove,
    quantity=1,
    description='No description available'
}) {
    return (
        <article className="flex gap-4 md:gap-6 items-start border-b last:border-b-0 pb-6 mb-6">
            <img
                src={srcImg}
                alt={name}
                className="w-28 h-28 rounded-lg object-cover border-2 border-indigo-100"
            />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                        <p className='text-sm text-gray-600'>{description.slice(0, 60)}...</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">${price}</p>
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="inline-flex items-center rounded-lg bg-gray-100 p-1">
                        <button
                            type="button"
                            onClick={(e) => {handleQuant(e, '+')}}
                            className="px-3 py-1 text-lg font-medium text-gray-600 cursor-pointer"
                        >
                            −
                        </button>
                        <div className="px-4 py-1 text-sm font-semibold">{quantity}</div>
                        <button
                            type="button"
                            onClick={(e) => {handleQuant(e, '-')}}
                            aria-label="Increase quantity"
                            className="px-3 py-1 text-lg font-medium text-gray-600 cursor-pointer"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={(e) => handleRemove(e, id)}
                            type="button"
                            className="text-red-600 hover:underline text-sm font-medium cursor-pointer"
                            aria-disabled="true"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CartItem