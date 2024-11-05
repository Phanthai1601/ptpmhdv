import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getRevenue } from '../services/APIServices'
import convertVNDToUSD from '../library/utils/convertVNDToUSD'

export default function TransactionChart() {
    const [transactionData, setTransactionData] = useState([])

    const getData = async () => {
        try {
            const apiData = await getRevenue()
            const formattedData = apiData.map((item) => ({
                id: item.id,
                name: item.month,
                'Chi phí': convertVNDToUSD(item.expensive),
                'Thu nhập': convertVNDToUSD(item.revenue_month)
            }))
            setTransactionData(formattedData)
        } catch (error) {
            console.error('Error fetching transactions chart:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const formatCurrency = (value) => `$${value}`

    return (
        <div className="h-[22rem] bg-white p-5 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Giao dịch</strong>
            <div className="mt-3 w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={transactionData}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={formatCurrency} />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="Thu nhập" fill="#0ea5e9" />
                        <Bar dataKey="Chi phí" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
