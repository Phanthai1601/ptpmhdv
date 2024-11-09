import React, { useState, useEffect } from 'react'
import '../../assets/css/FormCustomer.scss'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const FormCustomer = ({ customer, onSave, onClose }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [formData, setFormData] = useState({
        userId: '',
        fullName: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        gender: 'Male',
        role: 'Customer'
    })

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (customer) {
            setFormData(customer)
        } else {
            setFormData({
                userId: '',
                fullName: '',
                email: '',
                password: '',
                address: '',
                phone: '',
                gender: 'Male',
                role: 'Customer'
            })
        }
    }, [customer])

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible) // Toggle mật khẩu hiển thị/ẩn
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
        setIsExiting(true)
        setTimeout(onClose, 300)
    }

    const handleClose = () => {
        setIsExiting(true)
        setTimeout(onClose, 400)
    }

    const fields = [
        { label: 'Họ và tên', name: 'fullName' },
        { label: 'Email', name: 'email' },
        { label: 'Mật khẩu', name: 'password' },
        { label: 'Địa chỉ', name: 'address' },
        { label: 'Số điện thoại', name: 'phone' }
    ]

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>

            <div
                className={`fixed inset-0 flex justify-end items-start z-50 p-4 ${
                    isExiting ? 'slide-out' : 'slide-in'
                }`}
            >
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md h-full overflow-auto">
                    <h2 className="text-lg font-semibold mb-4 text-gray-600">
                        {customer ? 'Sửa thông tin khách hàng' : 'Thêm mới khách hàng'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {fields.map(({ label, name }) => (
                            <div key={name} className="mb-2">
                                <label className="block text-sm font-medium text-gray-500">{label}</label>
                                {name === 'password' ? (
                                    <div className="relative">
                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            className="border rounded w-full p-2"
                                            required
                                        />
                                        <span
                                            onClick={handlePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        >
                                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="border rounded w-full p-2"
                                        required
                                    />
                                )}
                            </div>
                        ))}

                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-500">Giới tính</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                            </select>
                        </div>

                        <div className="flex">
                            <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md mr-1">
                                Lưu
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormCustomer
