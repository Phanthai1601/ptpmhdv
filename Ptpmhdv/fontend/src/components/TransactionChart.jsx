import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getRevenue } from '../services/APIServices'

const data = [
    { name: 'Jan', 'Chi phí': 4000, 'Thu nhập': 2400 },
    { name: 'Feb', 'Chi phí': 3000, 'Thu nhập': 1398 },
    { name: 'Mar', 'Chi phí': 2000, 'Thu nhập': 9800 },
    { name: 'Apr', 'Chi phí': 2780, 'Thu nhập': 3908 },
    { name: 'May', 'Chi phí': 1890, 'Thu nhập': 4800 },
    { name: 'Jun', 'Chi phí': 2390, 'Thu nhập': 3800 },
    { name: 'July', 'Chi phí': 3490, 'Thu nhập': 4300 },
    { name: 'Aug', 'Chi phí': 2000, 'Thu nhập': 9800 },
    { name: 'Sep', 'Chi phí': 2780, 'Thu nhập': 3908 },
    { name: 'Oct', 'Chi phí': 1890, 'Thu nhập': 4800 }
    // { name: 'Nov', 'Chi phí': 2390, 'Thu nhập': 3800 },
    // { name: 'Dec', 'Chi phí': 3490, 'Thu nhập': 4300 }
]

export default function TransactionChart() {
    const [transactionData, settransactionData] = useState([])
    const getData = async () => {
        try {
            const data = await getRevenue()
            console.log(data)
            settransactionData(data)
        } catch (error) {
            console.error('Error fetching transactions chart:', error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Giao dịch</strong>
            <div className="mt-3 w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Thu nhập" fill="#0ea5e9" />
                        <Bar dataKey="Chi phí" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
