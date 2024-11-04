import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-sky-600 text-white">
            <div className="text-2xl font-bold">
                <Link to="/" className="text-gray-700">
                    MyWebsite
                </Link>
            </div>
            <div className="space-x-4 focus:no-underline">
                <Link
                    to="/login"
                    className="py-2 px-4 bg-white text-blue-600 rounded hover:bg-gray-200 focus:text-blue-600 "
                >
                    Đăng nhập
                </Link>
                <Link
                    to="/register"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:text-white "
                >
                    Đăng kí
                </Link>
            </div>
        </header>
    )
}

export default Home
