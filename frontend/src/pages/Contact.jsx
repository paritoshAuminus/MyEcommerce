import React from "react";
import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reset(); // clear form after submit
  };

  return (
    <main className="min-h-screen bg-liner-to-r from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          We would love to connect with you, providing better service for you are a part of our family
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2`}
              placeholder="Your name"
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2`}
              placeholder="your@email.com"
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2`}
              placeholder="Enter your password"
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
            Singup
          </button>
        </form>
      </div>
    </main>
  );
}

export default Contact;
