import React from 'react'

const Messages = () => {
    const messages = [
        { id: 1, text: 'Đơn hàng #123 đã được giao thành công.', timestamp: '2024-11-05 10:00', user: 'Khách hàng A' },
        {
            id: 2,
            text: 'Khách hàng B đã gửi yêu cầu hỗ trợ kỹ thuật.',
            timestamp: '2024-11-04 15:30',
            user: 'Khách hàng B'
        },
        {
            id: 3,
            text: 'Có sản phẩm mới được cập nhật. Kiểm tra trang sản phẩm để biết thêm.',
            timestamp: '2024-11-03 09:15',
            user: 'Hệ thống'
        }
    ]

    return (
        <div className="p-4 bg-gray-50">
            <h2 className="text-lg font-bold mb-4">Tin nhắn Quản trị viên</h2>
            <ul className="list-disc list-inside">
                {messages.map((message) => (
                    <li key={message.id} className="mb-2 p-2 border border-gray-200 rounded">
                        <span className="font-semibold">{message.user}: </span>
                        <span>{message.text}</span>
                        <br />
                        <span className="text-gray-500 text-sm">{message.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Messages
