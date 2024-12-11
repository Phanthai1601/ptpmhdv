import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatbotPopup from '../user/ChatbotPopup'
import CompareLaptops from '../user/CompareLaptops'

const Layout = () => {
    return (
        <>
            <Header />

            {/* Nội dung động */}
            <main className="mt-[5.5rem]">
                <Outlet />
            </main>
            <CompareLaptops />
            <ChatbotPopup />
            <Footer />
        </>
    )
}

export default Layout
