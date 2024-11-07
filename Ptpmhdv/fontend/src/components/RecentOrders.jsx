import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../library/utils/get-order-status'
import { getProductOrders } from '../services/APIServices'

const RecentOrders = () => {
    const [productOrders, setProductOrders] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getProductOrders()
                const softData = data.sort((a, b) => a.id - b.id)
                setProductOrders(softData)
            } catch (error) {
                console.error('Error fetching product data:', error)
            }
        }
        getData()
    }, [])

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-auto">
            <strong className="text-gray-700 font-medium">Đơn hàng gần đây</strong>
            <div className="mt-3">
                <div className="overflow-x-auto">
                    <table className="w-full text-gray-700 border border-gray-200 rounded-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 text-left">ID</th>
                                <th className="py-2 text-left">Tên sản phẩm</th>
                                <th className="py-2 text-left">Tên khách hàng</th>
                                <th className="py-2 text-left">Ngày đặt hàng</th>
                                <th className="py-2 text-left">Tổng đơn hàng</th>
                                <th className="py-2 text-left">Địa chỉ giao hàng</th>
                                <th className="py-2 text-left">Trạng thái đơn hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productOrders.map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td>{order.id}</td>
                                    <td>
                                        <Link to={`/admin/products/${order.product.id}`}>{order.product.name}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/admin/customers/${order.user.id}`}>{order.user.fullName}</Link>
                                    </td>
                                    <td>{new Date(order.order.orderDate).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        {order.price
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                            .concat('đ')}
                                    </td>
                                    <td>{order.user.address}</td>
                                    <td>{getOrderStatus(order.order.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RecentOrders
