import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatbotPopup from '../user/ChatbotPopup'

const Layout = () => {
    return (
        <>
            <Header />

            {/* Nội dung động */}
            <main>
                <Outlet />
            </main>
            <ChatbotPopup />
            <Footer />
        </>
    )
}

export default Layout
