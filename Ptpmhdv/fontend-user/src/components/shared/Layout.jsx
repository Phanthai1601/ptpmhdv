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
            <main>
                <Outlet />
            </main>
            <CompareLaptops />
            <ChatbotPopup />
            <Footer />
        </>
    )
}

export default Layout
