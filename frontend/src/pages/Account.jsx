import React from "react";
import { useSelector } from "react-redux";

const Account = () => {

    const userData = useSelector((state) => state.auth.userData)

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            {/* Header Section */}
            <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">My Account</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Manage your profile, track your orders, and customize your shopping preferences — all in one place.
                </p>
            </section>

            {/* Profile Section */}
            <section className="max-w-6xl mx-auto py-16 px-6 md:px-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <img
                        src={`https://placehold.co/400x400/C3F5F7/blue?text=${userData.name}`}
                        alt={`${userData.name}`}
                        className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-indigo-600 mb-2">{userData.name}</h2>
                        <p className="text-gray-600 mb-4">{userData.email}</p>
                        <p className="text-gray-700 leading-relaxed">
                            Loyal customer since <span className="font-semibold">2021</span>. Passionate about discovering
                            high-quality products and smooth shopping experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Account Overview Section */}
            <section className="max-w-6xl mx-auto py-10 px-6 md:px-12 grid gap-8 md:grid-cols-3">
                {/* Orders */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">My Orders</h3>
                    <p className="text-gray-600 mb-4">
                        View your recent purchases, order details, and track deliveries.
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
                        View Orders
                    </button>
                </div>

                {/* Wishlist */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Wishlist</h3>
                    <p className="text-gray-600 mb-4">
                        Keep track of the items you save and buy later.
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
                        View Cart
                    </button>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Settings</h3>
                    <p className="text-gray-600 mb-4">
                        Update your personal information, passwords, and preferences.
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
                        Edit Profile
                    </button>
                </div>
            </section>

            {/* Address Section */}
            <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 border-t border-gray-200">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Saved Addresses</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <h4 className="font-semibold text-gray-800 mb-2">Home Address {i}</h4>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                123 Main Street<br />
                                Springfield, USA<br />
                                ZIP: 12345
                            </p>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer">
                                Edit Address
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Payment Methods */}
            <section className="bg-white py-16 px-6 md:px-12 border-t border-gray-200">
                <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Payment Methods</h2>
                <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Visa Card {i}</h4>
                                <p className="text-gray-500 text-sm">**** **** **** 123{i}</p>
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <section className="bg-indigo-600 text-white text-center py-10 px-6">
                <h3 className="text-2xl font-semibold mb-2">Stay in Control</h3>
                <p className="max-w-2xl mx-auto text-lg leading-relaxed">
                    Manage every aspect of your account with ease. Your satisfaction and privacy are our top priorities.
                </p>
            </section>
        </div>
    );
};

export default Account;
