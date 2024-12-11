import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Layout from './components/shared/Layout'
import ProductDetail from './pages/ProductDetails'
import CompareProduct from './pages/CompareProduct'
import ScrollToTop from './components/shared/ScrollToTop'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(token !== null)
    }, [])

    // Route bảo vệ
    const ProtectedRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />
    }

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="register" element={<Register />} />
                    <Route path="product/:id" element={<ProductDetail />} />

                    <Route path="compare" element={<CompareProduct />} />

                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <div>Đây là trang quản lý dành cho người dùng đã đăng nhập!</div>
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="/login"
                    element={
                        <Login
                            onLogin={() => {
                                setIsAuthenticated(true)
                                // Lưu trạng thái đăng nhập vào localStorage
                                localStorage.setItem('token', 'your_token_here') // Thay thế bằng token thực tế
                            }}
                        />
                    }
                />

                {/* Trang 404 */}
                <Route path="*" element={<div className="text-center pt-5">404 - Page Not Found</div>} />
            </Routes>
        </Router>
    )
}

export default App
