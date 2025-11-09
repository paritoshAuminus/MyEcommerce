import React from 'react'
import { useForm } from 'react-hook-form'

function EditProfile() {

    const {register, handleSubmit} = useForm()

    const onSubmit = () => {
        console.log('Hey submitted!!')
    }

    return (
        <main className="min-h-screen bg-liner-to-r from-indigo-50 to-white flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
                    Update your profile
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition`}
                            placeholder="Your name"
                            {...register('name', {
                                required: 'Name field cannot be empty'
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition`}
                            placeholder="youremail@gmail.com"
                            {...register('email', {
                                required: 'Email field cannot be empty',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email'
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Message
                        </label>
                        <input
                            type='textarea'
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition`}
                            placeholder="Type your message here..."
                            {...register('message', {
                                required: 'Please enter a message',
                                minLength: {
                                    value: 10,
                                    message: 'Message must be atleast 10 characters long'
                                },
                                maxLength: {
                                    value: 150,
                                    message: 'Message should not exceed 150 characters'
                                }
                            })}
                        />
                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-full transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}

export default EditProfile