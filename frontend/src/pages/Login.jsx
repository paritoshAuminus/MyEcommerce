import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import authService from '../auth/auth';
import { login } from '../store/authSlice';
import { useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import { useEffect } from 'react';

function Login() {

    const status = useSelector((state) => state.auth.status)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await authService.login({
                email: data.email,
                password: data.password
            })
            dispatch(login(res.data.user))
            navigate('/')
        } catch (error) {
            setError(`${error}`)
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }, [error])

    if (status)
        return (
            <div className='flex justify-center items-center w-full text-lg min-h-screen'>
                <div className='flex gap-0.5 flex-col items-center'>
                    <p>You are already logged in</p>
                    <p>Go to <Link to='/' className='text-indigo-500 hover:text-indigo-600 transition font-semibold'>home page</Link></p>
                </div>
            </div>
        )

    return (
        <main className="min-h-screen bg-liner-to-r from-indigo-50 to-white flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
                    Log In
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                    Welcome back, we are very happy to see you again. Thankyou for believing in us, as we believe in you.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <div className='flex items-center justify-center text-sm text-gray-600 mt-2'>
                    <p>Don't have an account?<Link to={'/signup'} className='text-indigo-600 font-semibold'>Signup</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Login