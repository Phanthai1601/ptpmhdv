import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { compareLaptops } from '../services/APIServices'

const CompareProduct = () => {
    const location = useLocation()
    const { products } = location.state || []
    const [comparisonData, setComparisonData] = useState([])
    const [showDifferences, setShowDifferences] = useState(false)
    const readableKeys = {
        ram: 'Dung lượng RAM',
        ssd: 'SSD',
        sale_price: 'Giá bán',
        discount_percentage: 'Phần trăm giảm giá',
        gift: 'Quà tặng',
        screen: 'Màn hình',
        graphics_card: 'Card đồ họa',
        battery: 'Dung lượng Pin',
        weight: 'Trọng lượng'
    }

    const fetchComparisonData = useCallback(async () => {
        const data = await compareLaptops(products[0].id, products[1].id)
        setComparisonData(data)
    }, [products]) // gọi lại hàm này khi product thay đổi

    useEffect(() => {
        fetchComparisonData()
    }, [fetchComparisonData])

    const renderComparisonTable = () => {
        if (comparisonData.length === 0 || !comparisonData[0] || !comparisonData[1]) {
            return <p className="mt-2 text-center">Đang tải dữ liệu...</p>
        }

        const keys = Object.keys(comparisonData[0]).filter((key) => !['id', 'name', 'image'].includes(key))

        return (
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-white">
                        <th className="bg-white border border-gray-300 px-4 py-2 text-center cursor-pointer">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showDifferences}
                                    onChange={() => setShowDifferences(!showDifferences)}
                                    className="form-checkbox h-6 w-6 text-blue-600"
                                />
                                <span>Chỉ xem điểm khác biệt</span>
                            </label>
                        </th>
                        <th className="bg-white border border-gray-300 px-4 py-2 text-center">
                            <img src={comparisonData[0].image} alt={comparisonData[0].name} />
                        </th>
                        <th className="bg-white border border-gray-300 px-4 py-2 text-center">
                            <img src={comparisonData[1].image} alt={comparisonData[1].name} />
                        </th>
                    </tr>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Thông số</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">{comparisonData[0].name}</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">{comparisonData[1].name}</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => {
                        const value1 = comparisonData[0][key]
                        const value2 = comparisonData[1][key]
                        const isDifferent = value1 !== value2
                        const highlight1 = value1 === 'TRUE' ? 'bg-green-100 font-bold' : ''
                        const highlight2 = value2 === 'TRUE' ? 'bg-green-100 font-bold' : ''

                        // lọc khác biệt
                        if (showDifferences && !isDifferent) return null

                        return (
                            <tr key={key} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{readableKeys[key]}</td>
                                <td className={`border border-gray-300 px-4 py-2 ${highlight1}`}>{products[0][key]}</td>
                                <td className={`border border-gray-300 px-4 py-2 ${highlight2}`}>{products[1][key]}</td>
                            </tr>
                        )
                    })}
                    <tr className="bg-gray-100 font-bold text-center">
                        <td className="border border-gray-300 px-4 py-2">Số ưu điểm</td>
                        <td className="border border-gray-300 px-4 py-2">
                            {keys.filter((key) => comparisonData[0][key] === 'TRUE').length}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            {keys.filter((key) => comparisonData[1][key] === 'TRUE').length}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <div className="m-6 p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto mt-[8rem]">
            <h2 className="text-2xl text-sky-700 font-bold text-center mb-6">So sánh sản phẩm</h2>
            <div className="mt-6">{renderComparisonTable()}</div>
        </div>
    )
}

export default CompareProduct
