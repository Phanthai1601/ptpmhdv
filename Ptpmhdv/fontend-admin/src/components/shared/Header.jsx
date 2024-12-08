import React, { Fragment, useEffect, useState } from 'react'
import { HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import SearchProduct from '../admin/SearchProduct'
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmLogOut from '../admin/ConfirmDelete'

const Header = ({ toggleSidebar, setToggleSidebar }) => {
    const location = useLocation()
    const isProductPage = location.pathname.startsWith('/admin/products')
    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)
    const [nameAdmin, setNameAdmin] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const parsedUser = JSON.parse(user)
            setNameAdmin(parsedUser.fullName)
            const avatar = parsedUser.avatar
            setAvatar(avatar)
        }
    }, [])

    const handleLogout = () => {
        setShowConfirm(true)
    }

    const handleConfirmLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    const handleCancelLogout = () => {
        setShowConfirm(false)
    }

    const handleToggleSidebar = () => {
        setToggleSidebar(!toggleSidebar)
    }

    return (
        <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200">
            <button className="text-2xl text-gray-600" onClick={handleToggleSidebar}>
                <HiOutlineMenu />
            </button>

            {isProductPage && <SearchProduct />}

            <div className="flex items-center gap-2 ml-auto">
                <div className="text-sm text-green-700">
                    {nameAdmin.length > 0 ? 'Xin chào, ' + nameAdmin : 'Xin chào, Admin'}
                </div>

                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="ml-1 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                            <span className="sr-only">Open user menu</span>
                            <div
                                style={{ backgroundImage: `url(${avatar})` }}
                                className="h-9 w-9 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                            >
                                <span className="sr-only">Vucoder</span>
                            </div>
                        </Menu.Button>
                    </div>

                    {/* Menu dropdown */}
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-1 w-40 rounded-sm shadow-md p-1 bg-white ring-black ring-1 ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        role="button"
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'flex items-center gap-1 text-red-900 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={handleLogout}
                                    >
                                        <span>Đăng xuất</span>
                                        <span className="text-lg">
                                            <HiOutlineLogout />
                                        </span>
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
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

export default Header
