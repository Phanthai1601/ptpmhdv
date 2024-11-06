import React, { useState, useEffect } from 'react'
import '../assets/css/FormProduct.scss'

const FormProduct = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        ram: '',
        ssd: '',
        sale_price: '',
        old_price: '',
        discount_percentage: '',
        gift: '',
        screen: '',
        cpu: '',
        graphics_card: '',
        battery: '',
        weight: '',
        stock: '',
        image: ''
    })

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (product) {
            setFormData(product)
        } else {
            setFormData({
                id: '',
                name: '',
                ram: '',
                ssd: '',
                sale_price: '',
                old_price: '',
                discount_percentage: '',
                gift: '',
                screen: '',
                cpu: '',
                graphics_card: '',
                battery: '',
                weight: '',
                stock: '',
                image: ''
            })
        }
    }, [product])

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
        { label: 'Ram', name: 'ram' },
        { label: 'SSD', name: 'ssd' },
        { label: 'Giá bán', name: 'sale_price' },
        { label: 'Giá cũ', name: 'old_price' },
        { label: '% giảm giá', name: 'discount_percentage' },
        { label: 'Quà tặng', name: 'gift' },
        { label: 'Màn hình', name: 'screen' },
        { label: 'CPU', name: 'cpu' },
        { label: 'Card đồ hoạ', name: 'graphics_card' },
        { label: 'Pin', name: 'battery' },
        { label: 'Khối lượng', name: 'weight' },
        { label: 'Kho', name: 'stock' }
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
                        {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-500">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-500">Liên kết ảnh</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>

                        {fields.map(({ label, name }) => (
                            <div key={name} className="mb-2">
                                <label className="block text-sm font-medium text-gray-500">{label}</label>
                                <input
                                    type="text"
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="border rounded w-full p-2"
                                    required
                                />
                            </div>
                        ))}

                        <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded">
                            {product ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                        <button type="button" className="ml-2 text-gray-600" onClick={handleClose}>
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormProduct
