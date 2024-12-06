import React, { useState } from 'react'
import logo from '../assets/icons/user-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        cpassword: '',
        phoneNumber: ''
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Kiểm tra mật khẩu nhập lại
        if (formData.password !== formData.cpassword) {
            setError('Mật khẩu nhập lại không khớp!')
            return
        }

        // Nếu mật khẩu khớp, tiếp tục xử lý dữ liệu
        setError('')
        console.log(formData)
        // Ví dụ: Chuyển hướng sang trang login sau khi đăng ký thành công
        navigate('/login')
    }

    return (
        <div
            className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4"
            style={{
                background: 'linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)',
                height: '100vh'
            }}
        >
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-5 bg-white">
                <div className="text-center mb-8">
                    <button>
                        <img src={logo} alt="logo" className="w-20 h-20 inline-block" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Số điện thoại</label>
                            <input
                                name="phoneNumber"
                                type="tel"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Nhập số điện thoại"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Mật khẩu</label>
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
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Nhập lại mật khẩu</label>
                            <input
                                name="cpassword"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Nhập lại mật khẩu"
                                value={formData.cpassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                    <div className="!mt-12">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)'
                            }}
                        >
                            Tạo tài khoản
                        </button>
                    </div>
                    <p className="text-gray-800 text-sm mt-6 text-center">
                        Bạn đã có tài khoản?
                        <button
                            type="button"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập tại đây
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
