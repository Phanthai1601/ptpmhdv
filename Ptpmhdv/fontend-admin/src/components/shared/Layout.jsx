import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ChatbotPopup from '../admin/ChatbotPopup'

const Layout = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            {toggleSidebar && <Sidebar />}

            <div className="flex flex-col flex-1">
                <Header toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

                <div className="flex-1 p-2 min-h-0 overflow-auto">
                    <Outlet />
                </div>
                <ChatbotPopup />
            </div>
        </div>
    )
}

export default Layout
