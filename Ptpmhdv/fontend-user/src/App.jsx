import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Layout from './components/shared/Layout'
import ProductDetail from './pages/ProductDetails'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Kiểm tra token từ localStorage khi ứng dụng được tải
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
            <Routes>
                {/* Layout chung với header */}
                <Route path="/" element={<Layout />}>
                    {/* Trang chủ */}
                    <Route index element={<Home />} />

                    {/* Trang đăng ký */}
                    <Route path="register" element={<Register />} />
                    {/* Trang chi tiết sản phẩm */}
                    <Route path="product/:id" element={<ProductDetail />} />

                    {/* Các trang cần đăng nhập */}
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <div>Đây là trang quản lý dành cho người dùng đã đăng nhập!</div>
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* Trang đăng nhập */}
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
