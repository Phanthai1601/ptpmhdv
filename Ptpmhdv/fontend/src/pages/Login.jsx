import React, { useEffect, useState } from 'react'
import logo from '../assets/icons/user-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errMessage: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    useEffect(() => {}, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        onLogin() // Cập nhật trạng thái đăng nhập
        navigate('/admin')
    }

    return (
        <div
            className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 "
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
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <span className="text-gray-800 text-sm mb-2 block">Email</span>
                            <input
                                name="email"
                                type="text"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleChange}
                                required
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
                            />
                        </div>
                        <div className="flex items-center">
                            <span
                                className={
                                    formData.errMessage.length > 0 ? ' text-red-500 text-orange-500 text-sm' : ''
                                }
                            >
                                {formData.errMessage}
                            </span>
                        </div>
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
                    <p className="text-gray-800 text-sm mt-6 text-center">
                        Bạn chưa có tài khoản?
                        <button
                            type="button"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                            onClick={() => navigate('/register')}
                        >
                            Đăng kí tại đây
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
