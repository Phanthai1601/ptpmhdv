import React from 'react'
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white py-10">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
                {/* Cột 1: Logo và giới thiệu */}
                <div>
                    <h3 className="text-3xl font-bold text-blue-400 mb-4">ABC LapTop</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Chuyên cung cấp các sản phẩm công nghệ chất lượng cao với dịch vụ hậu mãi tuyệt vời. Chúng tôi
                        luôn đồng hành cùng bạn.
                    </p>
                </div>

                {/* Cột 2: Đường dẫn nhanh */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-4">Đường dẫn nhanh</h3>
                    <ul className="space-y-3">
                        <li>
                            <a href="/about" className="hover:text-blue-300 transition-all duration-300">
                                Giới thiệu
                            </a>
                        </li>
                        <li>
                            <a href="/products" className="hover:text-blue-300 transition-all duration-300">
                                Sản phẩm
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-300 transition-all duration-300">
                                Liên hệ
                            </a>
                        </li>
                        <li>
                            <a href="/faq" className="hover:text-blue-300 transition-all duration-300">
                                Câu hỏi thường gặp
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Liên hệ */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-4">Liên hệ</h3>
                    <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">Địa chỉ:</span> 123 Đường ABC, Hà Nội
                    </p>
                    <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">Điện thoại:</span> +84 355 144 421
                    </p>
                    <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">Email:</span>{' '}
                        <a
                            href="mailto:vu19092k4@gmail.com"
                            className="text-blue-300 hover:text-blue-500 transition-all"
                        >
                            vu19092k4@gmail.com
                        </a>
                    </p>
                </div>

                {/* Cột 4: Theo dõi chúng tôi */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-4">Theo dõi chúng tôi</h3>
                    <div className="flex items-center space-x-6 ">
                        <a
                            href="https://www.facebook.com/profile.php?id=100040972215595&mibextid=ZbWKwL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transform transition-transform duration-300"
                        >
                            <img src={facebook} alt="Facebook" className="w-8 h-8" />
                        </a>
                        <a
                            href="https://www.instagram.com/vu4g_/profilecard/?igsh=MW1uMHg0MG4zMmpxag=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transform transition-transform duration-300"
                        >
                            <img src={instagram} alt="Instagram" className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Dòng bản quyền */}
            <div className="text-center text-sm mt-8 border-t border-gray-600 pt-4 text-gray-400">
                © {new Date().getFullYear()} <span className="text-blue-400">Vucoder</span>. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
