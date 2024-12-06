import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="flex justify-between items-center p-4 bg-yellow-300 text-white">
            <div className="text-2xl font-bold">
                <Link to="/" className="text-white hover:text-gray-200">
                    Laptop
                </Link>
            </div>
            <div className="space-x-4">
                <Link to="/login" className="py-2 px-4 bg-white text-blue-600 rounded hover:bg-gray-200">
                    Đăng nhập
                </Link>
                <Link to="/register" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Đăng ký
                </Link>
            </div>
        </div>
    )
}

export default Header
