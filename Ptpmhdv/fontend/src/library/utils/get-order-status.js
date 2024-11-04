export function getOrderStatus(status) {
    switch (status) {
        case 'Được đặt':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Đã xác nhận':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Đã vận chuyển':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Ra ngoài để giao hàng':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            )
        case 'Đã giao hàng':
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
