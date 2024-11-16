import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Login from './pages/Login'
import useHideUnimportantErrors from './library/utils/useHideUnimportantErrors'

const App = () => {
    // Trạng thái đăng nhập
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Route bảo vệ
    const ProtectedRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />
    }

    useHideUnimportantErrors()

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                {/* Admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Outlet />}>
                        <Route index element={<Products />} />
                        <Route path=":id" element={<Products />} />
                    </Route>
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Outlet />}>
                        <Route index element={<Customers />} />
                        <Route path=":id" element={<Customers />} />
                    </Route>
                </Route>

                <Route path="*" element={<div className="text-center pt-5">404 - Page Not Found</div>} />
            </Routes>
        </Router>
    )
}

export default App
