import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
                {/* Logo and Title */}
                <div className="text-3xl font-semibold text-white">
                    <Link to="/" className="hover:text-gray-200 transition duration-300 !no-underline">
                        <img width='250px' src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/noel/2024/tgdd/logo-dt.png" alt="" />
                    </Link>
                </div>
                

                {/* Navigation Links */}
                <nav className="space-x-6">
                    <Link
                        to="/login"
                        className="py-2 px-5 bg-white text-blue-600 rounded-lg hover:bg-blue-200 transition duration-300 !no-underline"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to="/register"
                        className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 !no-underline"
                    >
                        Đăng ký
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
