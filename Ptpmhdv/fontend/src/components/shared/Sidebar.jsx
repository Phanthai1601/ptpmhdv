import React from 'react'
import { RiAdminFill } from 'react-icons/ri'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../library/consts/navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {
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
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <div className={classNames('text-red-500 cursor-pointer', linkClasses)}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Đăng xuất
                </div>
            </div>
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
