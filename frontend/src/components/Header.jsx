import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 rounded-full">
          <img
            src="./logo.jpg"
            alt="Logo"
            className="w-10 h-10 object-contain rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800">ShopEase</h1>
        </Link>

        {/* Navbar */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            Contact
          </NavLink>

          {/* User Icon */}
          <div className="relative" ref={dropdownRef}>
            <User
              className="w-6 h-6 text-gray-700 hover:text-blue-600 transition cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 border-b"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
