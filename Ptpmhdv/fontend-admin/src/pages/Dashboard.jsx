import React from 'react'
import DashboardStatsGrid from '../components/admin/DashboardStatsGrid'
import TransactionChart from '../components/admin/TransactionChart'
import BuyerProfileChart from '../components/admin/BuyerProfileChart'
import RecentOrders from '../components/admin/RecentOrders'
import PopularProducts from '../components/admin/PopularProducts'

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <DashboardStatsGrid />
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerProfileChart />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    )
}

export default Dashboard
