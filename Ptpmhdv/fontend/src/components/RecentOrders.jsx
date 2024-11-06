import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../library/utils/get-order-status'
import { getProductOrders } from '../services/APIServices'

// const recentOrders = [
//     {
//         id: '1',
//         product_id: '4324',
//         customer_id: '23143',
//         customer_name: 'Shirley A. Lape',
//         order_date: '2022-05-17T03:24:00',
//         order_total: '$435.50',
//         current_order_status: 'Được đặt',
//         shipment_address: 'Cottage Grove, OR 97424'
//     },
//     {
//         id: '7',
//         product_id: '7453',
//         customer_id: '96453',
//         customer_name: 'Ryan Carroll',
//         order_date: '2022-05-14T05:24:00',
//         order_total: '$96.35',
//         current_order_status: 'Đã xác nhận',
//         shipment_address: 'Los Angeles, CA 90017'
//     },
//     {
//         id: '2',
//         product_id: '5434',
//         customer_id: '65345',
//         customer_name: 'Mason Nash',
//         order_date: '2022-05-17T07:14:00',
//         order_total: '$836.44',
//         current_order_status: 'Đã vận chuyển',
//         shipment_address: 'Westminster, CA 92683'
//     },
//     {
//         id: '3',
//         product_id: '9854',
//         customer_id: '87832',
//         customer_name: 'Luke Parkin',
//         order_date: '2022-05-16T12:40:00',
//         order_total: '$334.50',
//         current_order_status: 'Đã vận chuyển',
//         shipment_address: 'San Mateo, CA 94403'
//     },
//     {
//         id: '4',
//         product_id: '8763',
//         customer_id: '09832',
//         customer_name: 'Anthony Fry',
//         order_date: '2022-05-14T03:24:00',
//         order_total: '$876.00',
//         current_order_status: 'Ra ngoài để giao hàng',
//         shipment_address: 'San Mateo, CA 94403'
//     },
//     {
//         id: '5',
//         product_id: '5627',
//         customer_id: '97632',
//         customer_name: 'Ryan Carroll',
//         order_date: '2022-05-14T05:24:00',
//         order_total: '$96.35',
//         current_order_status: 'Đã giao hàng',
//         shipment_address: 'Los Angeles, CA 90017'
//     }
// ]
const formatCurrency = (amount) => {
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.').concat('đ')
}
const RecentOrders = () => {
    const [productOrders, setproductOrders] = useState([])

    useEffect(() => {
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
                                        <Link to={`/admin/products/${order.product_id}`}>{order.product_name}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/admin/customers/${order.customer_id}`}>{order.customer_name}</Link>
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
export default RecentOrders
