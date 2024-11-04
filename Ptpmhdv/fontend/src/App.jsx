import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Transaction from './pages/Transaction'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useHideUnimportantErrors from './library/utils/useHideUnimportantErrors'

const App = () => {
    useHideUnimportantErrors()
    return (
        <Router>
            <Routes>
                {/* Đường dẫn trang Home */}
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<div className="text-center pt-5">404 - Page Not Found</div>} />
                {/* Đường dẫn đến các trang dành cho quản trị viên */}
                <Route path="/admin" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="transactions" element={<Transaction />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
