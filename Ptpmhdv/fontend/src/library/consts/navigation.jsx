import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    // HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Bảng điều khiển',
        path: '/admin',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'products',
        label: 'Các sản phẩm',
        path: '/admin/products',
        icon: <HiOutlineCube />
    },
    {
        key: 'orders',
        label: 'Đơn hàng',
        path: '/admin/orders',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'customers',
        label: 'Khách hàng',
        path: '/admin/customers',
        icon: <HiOutlineUsers />
    },
    // {
    //     key: 'transactions',
    //     label: 'Giao dịch',
    //     path: '/admin/transactions',
    //     icon: <HiOutlineDocumentText />
    // },
    {
        key: 'messages',
        label: 'Tin nhắn',
        path: '/admin/messages',
        icon: <HiOutlineAnnotation />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Cài đặt',
        path: '/admin/settings',
        icon: <HiOutlineCog />
    }
]
