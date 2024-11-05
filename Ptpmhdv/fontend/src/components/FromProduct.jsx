import React, { useState, useEffect } from 'react'

const FormSanPham = ({ product, onSave, onClose }) => {
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
        onClose()
    }

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

            {/* Form Modal */}
            <div className="fixed inset-0 flex justify-end items-start z-50 p-4">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md h-full overflow-auto">
                    <h2 className="text-lg font-semibold mb-4 text-gray-600">
                        {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Tên sản phẩm */}
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

                        {/* Liên kết ảnh */}
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

                        {[
                            'ram',
                            'ssd',
                            'sale_price',
                            'old_price',
                            'discount_percentage',
                            'gift',
                            'screen',
                            'cpu',
                            'graphics_card',
                            'battery',
                            'weight',
                            'stock'
                        ].map((key) => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium text-gray-500">
                                    {key === 'ram' && 'RAM'}
                                    {key === 'ssd' && 'SSD'}
                                    {key === 'sale_price' && 'Giá bán'}
                                    {key === 'old_price' && 'Giá cũ'}
                                    {key === 'discount_percentage' && '% giảm giá'}
                                    {key === 'gift' && 'Quà tặng'}
                                    {key === 'screen' && 'Màn hình'}
                                    {key === 'cpu' && 'CPU'}
                                    {key === 'graphics_card' && 'Card đồ họa'}
                                    {key === 'battery' && 'Pin'}
                                    {key === 'weight' && 'Trọng lượng'}
                                    {key === 'stock' && 'Kho'}
                                </label>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="border rounded w-full p-2"
                                    required
                                />
                            </div>
                        ))}

                        <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded">
                            {product ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                        <button type="button" className="ml-2 text-gray-600" onClick={onClose}>
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormSanPham
