import React, { useEffect, useState } from 'react'
import { getCustomers } from '../services/APIServices'

const Customers = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getCustomers()
                setCustomers(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    }, [])

    return (
        <div className="p-2">
            <h1 className="text-l font-bold mb-4 text-gray-700">Danh sách khách hàng</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-gray-700">ID</th>
                        <th className="border border-gray-300 p-2 text-gray-700">Họ tên</th>
                        <th className="border border-gray-300 p-2 text-gray-700">Email</th>
                        <th className="border border-gray-300 p-2 text-gray-700">Địa chỉ</th>
                        <th className="border border-gray-300 p-2 text-gray-700">Sdt</th>
                        <th className="border border-gray-300 p-2 text-gray-700">Giới tính</th>
                        <th className="border border-gray-300 p-2 text-gray-700">Quyền</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="border border-gray-300 p-2">{customer.id}</td>
                            <td className="border border-gray-300 p-2">{customer.fullName}</td>
                            <td className="border border-gray-300 p-2">{customer.email}</td>
                            <td className="border border-gray-300 p-2">{customer.address}</td>
                            <td className="border border-gray-300 p-2">{customer.phone}</td>
                            <td className="border border-gray-300 p-2">{customer.gender === 'Male' ? 'Nam' : 'Nữ'}</td>
                            <td
                                className={`border border-gray-300 p-2 ${
                                    customer.role === 'Admin'
                                        ? 'text-sky-600 bg-sky-100'
                                        : 'text-yellow-600 bg-yellow-100'
                                }`}
                            >
                                {customer.role === 'Admin' ? 'Quản trị viên' : 'Người dùng'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customers
