import React from 'react'
import { Link } from 'react-router-dom'
import logoshop from '../../assets/icons/onlineshop1-removebg.png'

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 py-3">
                {/* Logo and Title */}
                <div className="text-3xl font-semibold text-white h-full">
                    <Link to="/" className="hover:text-gray-200 transition duration-300 !no-underline">
                        <img width={'75rem'} src={logoshop} alt="logo" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="w-[8%] flex flex-col space-y-1 w-full text-sm justify-center">
                    <Link
                        to="/login"
                        className="w-full h-[50%] py-2 px-2 bg-white text-blue-600 rounded-lg hover:bg-blue-200 transition duration-300 !no-underline text-center"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to="/register"
                        className="w-full h-[50%] py-2 px-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 !no-underline text-center"
                    >
                        Đăng ký
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
