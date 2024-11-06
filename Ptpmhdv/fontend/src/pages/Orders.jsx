import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../library/utils/get-order-status'
import { getProductOrders } from '../services/APIServices'

const formatCurrency = (amount) => {
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.').concat('đ')
}

const Orders = () => {
    const [productOrders, setproductOrders] = useState([])

    const getData = async () => {
        try {
            const data = await getProductOrders()
            const formatData = data.map((item) => ({
                id: item.id,
                product_id: item.product.id,
                product_name: item.product.name,
                customer_id: item.user.id,
                customer_name: item.user.fullName,
                order_date: item.order.orderDate,
                order_total: formatCurrency(item.price.toString()),
                current_order_status: item.order.status,
                shipment_address: item.user.address
            }))

            setproductOrders(formatData)
        } catch (error) {
            console.error('Error fetching product data:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-auto">
            <strong className="text-gray-700 font-medium">Danh sách đơn hàng</strong>
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
                                        <Link to={`/products/${order.product_id}`}>{order.product_name}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/customers/${order.customer_id}`}>{order.customer_name}</Link>
                                    </td>
                                    <td>{new Date(order.order_date).toLocaleDateString('vi-VN')}</td>
                                    <td>{order.order_total}</td>
                                    <td>{order.shipment_address}</td>
                                    <td>{getOrderStatus(order.current_order_status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Orders
