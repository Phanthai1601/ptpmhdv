import React from 'react'
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 py-8">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Cột 1: Logo và giới thiệu */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">ABC LapTop</h3>
                    <p className="text-sm text-gray-600">
                        Nơi cung cấp các sản phẩm công nghệ chất lượng và đáng tin cậy. Luôn sẵn sàng phục vụ bạn.
                    </p>
                </div>

                {/* Cột 2: Đường dẫn nhanh */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Đường dẫn nhanh</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/about" className="hover:text-blue-600 transition-colors">
                                Giới thiệu
                            </a>
                        </li>
                        <li>
                            <a href="/products" className="hover:text-blue-600 transition-colors">
                                Sản phẩm
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-600 transition-colors">
                                Liên hệ
                            </a>
                        </li>
                        <li>
                            <a href="/faq" className="hover:text-blue-600 transition-colors">
                                Câu hỏi thường gặp
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Liên hệ */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Liên hệ</h3>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Địa chỉ:</span> 123 Đường ABC, TP HCM
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Điện thoại:</span> +84 355 144 421
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span>{' '}
                        <a href="mailto:support@techstore.com" className="text-blue-600 hover:text-blue-800">
                            vu19092k4@gmail.com
                        </a>
                    </p>
                </div>

                {/* Cột 4: Theo dõi chúng tôi */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Theo dõi chúng tôi</h3>
                    <div className="flex space-x-4 ml-12">
                        <a
                            href="https://www.facebook.com/profile.php?id=100040972215595&mibextid=ZbWKwL"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={facebook}
                                alt="Facebook"
                                className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/vu4g_/profilecard/?igsh=MW1uMHg0MG4zMmpxag=="
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={instagram}
                                alt="Instagram"
                                className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Dòng bản quyền */}
            <div className="text-center text-sm mt-8 border-t border-gray-300 pt-4 text-gray-600">
                © {new Date().getFullYear()} Vucoder. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
