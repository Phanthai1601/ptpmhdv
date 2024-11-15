import React, { useState } from 'react'
import { RiAdminFill } from 'react-icons/ri'
import { DASHBOARD_SIDEBAR_LINKS } from '../../library/consts/navigation'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'
import ConfirmLogOut from '../admin/ConfirmDelete'

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {
    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)

    const handleLogout = () => {
        setShowConfirm(true)
    }
    const handleConfirmLogout = () => {
        // Thực hiện đăng xuất ở đây, ví dụ như xóa token và chuyển hướng
        // Xử lý đăng xuất
        navigate('/')
    }

    const handleCancelLogout = () => {
        setShowConfirm(false)
    }
    return (
        <div className={classNames('bg-neutral-900 w-35 md:w-42 lg:w-51 p-3 flex flex-col text-white h-full')}>
            <div className="flex items-center gap-2 px-1 py-3">
                <RiAdminFill fontSize={24} className="text-sky-500" />
                <span className="text-lg text-sky-300">Quản trị viên</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                <div
                    role="button"
                    className={classNames('text-red-500 cursor-pointer', linkClasses)}
                    onClick={handleLogout}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Đăng xuất
                </div>
            </div>
            {showConfirm && (
                <ConfirmLogOut
                    message="Bạn có chắc muốn đăng xuất?"
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                />
            )}
        </div>
    )
}

const SidebarLink = ({ item }) => {
    const { pathname } = useLocation()
    return (
        <Link
            to={item.path}
            className={classNames(
                pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                linkClasses
            )}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default Sidebar
