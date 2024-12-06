import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return (
        <>
            <Header />

            {/* Nội dung động */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout
