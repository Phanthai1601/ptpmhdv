import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPopularProducts } from '../services/APIServices'

const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([])
    const getData = async () => {
        try {
            const data = await getAllPopularProducts()
            setPopularProducts(data)
        } catch (error) {
            console.error('Error fetching popular products:', error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 w-full max-w-xs">
            <strong className="text-gray-700 font-medium">Sản phẩm phổ biến</strong>
            <div className="mt-4 grid grid-cols-1 gap-3">
                {popularProducts.slice(0, 5).map((product) => (
                    <Link
                        to={`/products/${product.id}`}
                        className="flex items-center hover:no-underline"
                        key={product.id}
                    >
                        <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm overflow-hidden">
                            <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm text-gray-800">{product.name}</p>
                            <span
                                className={`text-sm font-medium ${
                                    product.stock === 0 ? 'text-orange-500' : 'text-green-500'
                                }`}
                            >
                                {product.stock === 0 ? 'Hết hàng' : 'Còn ' + product.stock + ' trong kho'}
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 pl-2">{product.sale_price}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularProducts
