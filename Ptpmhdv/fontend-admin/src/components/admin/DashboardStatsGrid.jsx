import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoCart, IoPeople, IoPieChart } from 'react-icons/io5'
import { getStasGrid } from '../../services/APIServices'

const DashboardStatsGrid = () => {
    const [dataTotal, setData] = useState({
        total_sales: 0,
        total_expense: 0,
        total_customer: 0,
        total_orders: 0,
        total_sales_change: 0,
        total_expense_change: 0,
        total_customer_change: 0,
        total_orders_change: 0
    })

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const Data = await getStasGrid()
                if (isMounted && Data) {
                    setData(Data)
                }
            } catch (error) {
                console.error('Error fetching customer data:', error)
            }
        }

        fetchData()
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="flex flex-wrap gap-4 w-full">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Tổng doanh số</span>
                    <div className="flex items-center ">
                        <strong className="text-xl text-gray-700 font-semibold">${dataTotal.total_sales}</strong>
                        <span
                            className={
                                dataTotal.total_sales_change >= 0
                                    ? 'text-sm pl-2 text-green-500'
                                    : 'text-sm pl-2 text-red-500'
                            }
                        >
                            {dataTotal.total_sales_change >= 0
                                ? `+${dataTotal.total_sales_change}`
                                : dataTotal.total_sales_change}
                        </span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Tổng chi phí</span>
                    <div className="flex items-center ">
                        <strong className="text-xl text-gray-700 font-semibold">${dataTotal.total_expense}</strong>
                        <span
                            className={
                                dataTotal.total_expense_change >= 0
                                    ? 'text-sm pl-2 text-green-500'
                                    : 'text-sm pl-2 text-red-500'
                            }
                        >
                            {dataTotal.total_expense_change >= 0
                                ? `+${dataTotal.total_expense_change}`
                                : dataTotal.total_expense_change}
                        </span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Tổng số khách hàng</span>
                    <div className="flex items-center ">
                        <strong className="text-xl text-gray-700 font-semibold">{dataTotal.total_customer}</strong>
                        <span
                            className={
                                dataTotal.total_customer_change >= 0
                                    ? 'text-sm pl-2 text-green-500'
                                    : 'text-sm pl-2 text-red-500'
                            }
                        >
                            {dataTotal.total_customer_change >= 0
                                ? `+${dataTotal.total_customer_change}`
                                : dataTotal.total_customer_change}
                        </span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Tổng số đơn hàng</span>
                    <div className="flex items-center ">
                        <strong className="text-xl text-gray-700 font-semibold">{dataTotal.total_orders}</strong>
                        <span
                            className={
                                dataTotal.total_orders_change >= 0
                                    ? 'text-sm pl-2 text-green-500'
                                    : 'text-sm pl-2 text-red-500'
                            }
                        >
                            {dataTotal.total_orders_change >= 0
                                ? `+${dataTotal.total_orders_change}`
                                : dataTotal.total_orders_change}
                        </span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}

function BoxWrapper({ children }) {
    return (
        <div className="bg-white rounded-sm p-4 flex-1 min-w-[200px] border border-gray-200 flex items-center">
            {children}
        </div>
    )
}

export default DashboardStatsGrid
