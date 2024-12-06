export function getOrderStatus(status) {
    switch (status) {
        case 'Đơn hàng đã được xác nhận':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Đơn hàng đã huỷ':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Đang vận chuyển':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Chờ lấy hàng ':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Giao hàng thành công':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        default:
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
    }
}
