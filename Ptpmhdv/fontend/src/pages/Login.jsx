import React, { useState } from 'react'
import logo from '../assets/icons/user-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errMessage, setErrMessage] = useState('')
    const navigate = useNavigate()

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidEmail(formData.email)) {
            setErrMessage('Email không hợp lệ!')
            return
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/login`, {
                email: formData.email,
                password: formData.password,

                role: 'Admin'
            })
            const token = response.data.token
            localStorage.setItem('token', token)
            onLogin()
            navigate('/admin')
        } catch (error) {
            setErrMessage(error.response?.data?.message || 'Đăng nhập thất bại!')
        }
    }

    return (
        <div
            className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4"
            style={{
                background: 'linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)',
                height: '100vh'
            }}
        >
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl px-7 py-6 bg-white">
                <div className="text-center mb-12">
                    <button>
                        <img src={logo} alt="logo" className="w-20 h-20 inline-block" />
                    </button>
                    <p className="font-semibold">Admin</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <span className="text-gray-800 text-sm mb-2 block">Email</span>
                            <input
                                name="email"
                                type="email"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <span className="text-gray-800 text-sm mb-2 block">Mật khẩu</span>
                            <input
                                name="password"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="password"
                            />
                        </div>
                        {errMessage && <div className="text-red-500 text-sm">{errMessage}</div>}
                    </div>

                    <div className="!mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white focus:text-gray-600"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)'
                            }}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
