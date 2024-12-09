import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCompare, clearCompareList } from '../../actions/laptopActions'
import { useNavigate } from 'react-router-dom'

const CompareLaptops = () => {
    const dispatch = useDispatch()
    const compareList = useSelector((state) => state.compareList) || []
    const [isOpen, setIsOpen] = useState(true)
    const isDisableCompare = compareList.filter((item) => item !== null).length <= 1
    const navigate = useNavigate()

    const handleCompare = () => {
        if (compareList.filter((item) => item !== null).length === 2) {
            const productIds = compareList.filter((item) => item !== null).map((item) => item.id)
            navigate(`/compare/${productIds[0]}/${productIds[1]}`)
        }
    }
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleRemoveProduct = (id) => {
        dispatch(removeFromCompare(id))
    }

    const handleClearAll = () => {
        dispatch(clearCompareList())
    }

    const handleCollapse = () => {
        setIsOpen(true)
    }

    return (
        <div>
            {isOpen && (
                <div className="fixed bottom-4 left-10 z-50">
                    <button
                        onClick={handleOpen}
                        className="w-28 h-8 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all transform duration-300"
                    >
                        So sánh ({compareList.filter((item) => item !== null).length}){' '}
                    </button>
                </div>
            )}

            {!isOpen && (
                <div className="fixed bottom-0 left-1/2 z-50 bg-white transform -translate-x-1/2 border shadow-xl w-[80%] h-[8.1rem] flex">
                    {/* Nút thu gọn */}
                    <div className="absolute bottom-[8rem] right-[0]">
                        <button
                            onClick={handleCollapse}
                            className="rounded-t-lg bg-white flex items-center justify-center shadow-lg hover:bg-gray-300 transition-all"
                        >
                            <span className="text-sm font-semibold mx-2 text-gray-900 font-sans">
                                Thu gọn <span className="text-lg font-sans">↓</span>
                            </span>
                        </button>
                    </div>

                    {compareList.map((item, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center justify-center w-1/3 border-r border-gray-400"
                        >
                            {item ? (
                                <div className="text-center">
                                    <button
                                        onClick={() => handleRemoveProduct(item.id)}
                                        className="absolute top-2 right-2 text-[10px] font-sans opacity-60"
                                    >
                                        ✖
                                    </button>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-16 object-cover rounded-md mx-auto my-auto"
                                    />
                                    <p className="font-semibold text-sm font-sans">{item.name}</p>
                                    <p className="text-gray-600 text-sm font-sans">{item.specs}</p>
                                </div>
                            ) : (
                                <button className="w-14 h-14 text-3xl font-bold text-gray-800 border-[2px] rounded-lg border-dashed border-gray-400 flex items-center justify-center">
                                    +
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Nút hành động */}
                    <div className="flex flex-col items-center justify-center w-1/3">
                        <button
                            onClick={handleCompare}
                            className={`w-40 mb-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all ${
                                isDisableCompare ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isDisableCompare}
                        >
                            So sánh
                        </button>
                        <span onClick={handleClearAll} className="px-4 text-sky-700 cursor-pointer">
                            Xóa tất cả sản phẩm
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CompareLaptops
