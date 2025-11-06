import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import authService from './../auth/auth'
import { login, logout } from './../store/authSlice'

function Signup() {

    const status = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // send data to backend (signup)
        const response = await authService.signup({
            name: data.name,
            email: data.email,
            password: data.password
        })

        if (response.status === 201) {  // User registered succesfully
            // login
            const res = await authService.login({
                email: data.email,
                password: data.password
            })
            if (res.status === 200) {
                dispatch(login(res.data.user))
                navigate('/')
            }
        }
    }

    if (status)
        return (
            <div className='flex justify-center items-center w-full text-lg min-h-screen'>
                <div className='flex gap-0.5 flex-col items-center'>
                    <p>You are already logged in</p>
                    <p>Go to <Link to='/' className='text-indigo-500 hover:text-indigo-600 transition font-semibold'>home page</Link></p>
                    <button onClick={() => dispatch(logout())} className='bg-indigo-600 px-3 py-2 text-white'>Logout</button>
                </div>
            </div>
        )

    return (
        <main className="min-h-screen bg-liner-to-r from-indigo-50 to-white flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
                    Signup
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                    We are very excited to have you on our platform. We look forward to sharing precious memories with you.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                            placeholder='Enter your name'
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                            placeholder="youremail@gmail.com"
                            {...register('email', {
                                required: 'Email field cannot be empty',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address",
                                },
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
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password field cannot be empty',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be atleast 6 characters'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Password must not exceed 20 characters'
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-full transition duration-200 cursor-pointer"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Signup