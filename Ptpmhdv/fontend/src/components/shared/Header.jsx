import React, { Fragment } from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineLogout, HiOutlineSearch } from 'react-icons/hi'
import { Menu, Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import logoAdmin from '../../assets/icons/hacker.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200">
            <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
                />
            </div>
            <div className="flex items-center gap-2 mr-2 ml-auto">
                {/* this is message */}
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'gb-gray-100',
                                    'inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineChatAlt fontSize={24} />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1" // Khi mở, nó trượt xuống
                                enterTo="opacity-100 translate-y-0" // Đến vị trí gốc
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0" // Khi thoát, bắt đầu từ vị trí gốc
                                leaveTo="opacity-0 translate-y-1" // Trượt lên
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-1/2 w-80">
                                    <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                        <strong className="text-gray-700 font-medium">Tin nhắn</strong>
                                        <div className="mt-2 py-1 text-sm">Đây là bảng tin nhắn.</div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>

                {/* this is notifications */}
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'gb-gray-100',
                                    'inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineBell fontSize={24} />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1" // Khi mở, nó trượt xuống
                                enterTo="opacity-100 translate-y-0" // Đến vị trí gốc
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0" // Khi thoát, bắt đầu từ vị trí gốc
                                leaveTo="opacity-0 translate-y-1" // Trượt lên
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-1/2 w-80">
                                    <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                        <strong className="text-gray-700 font-medium">Thông báo</strong>
                                        <div className="mt-2 py-1 text-sm">Đây là bảng thông báo.</div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>

                <Menu as="div" className="relative ">
                    <div>
                        <Menu.Button className="ml-1 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                            <span className="sr-only">Open user menu</span>
                            <div
                                style={{ backgroundImage: `url(${logoAdmin})` }}
                                className="h-9 w-9 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                            >
                                <span className="sr-only">Vucoder</span>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-1/2 w-40 rounded-sm shadow-md p-1 bg-white ring-black ring-1 ring-opacity-5 focus:outline-none">
                            {/* <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'text-gray-700 focus:bg-gary-200 block cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={() => navigate('/adprofile')}
                                    >
                                        Hồ sơ của bạn
                                    </div>
                                )}
                            </Menu.Item> */}
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'text-gray-700 focus:bg-gary-200 block cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={() => navigate('/admin/settings')}
                                    >
                                        Cài đặt
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'flex flex-1 gap-1 text-gray-700 focus:bg-gary-200 block cursor-pointer rounded-sm px-4 py-2'
                                        )}
                                        onClick={() => navigate('/')}
                                    >
                                        Đăng xuất
                                        <span className="text-x pt-0.5 px-1/5">
                                            <HiOutlineLogout />
                                        </span>
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default Header
