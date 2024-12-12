import { CgAdd } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { addToCompare } from '../actions/laptopActions'

const ProductDetail = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const laptop = location.state

    const handleAddToCompare = () => {
        dispatch(addToCompare(laptop))
    }
    if (!laptop) {
        return <div className="text-center text-red-500">Không tìm thấy thông tin sản phẩm</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 m-6 py-6 px-6 mt-[10%] h-95 bg-white rounded-lg shadow-lg">
            <div className="lg:col-span-2 px-3">
                <h1 className="text-3xl font-semibold mb-4 text-gray-800">{laptop.name}</h1>
                <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="w-full h-auto object-contain mb-4 rounded-lg transition-transform transform hover:scale-105"
                />
            </div>

            <div className="lg:col-span-4">
                <div className="space-y-4">
                    <p className="text-lg flex items-center">
                        <strong className="mr-2">Màn hình:</strong>
                        <span>{laptop.screen}</span>
                        <span
                            className="cursor-pointer flex items-center justify-center text-sky-500 font-sans-serif ml-4"
                            onClick={() => handleAddToCompare()}
                        >
                            <CgAdd className="mr-1 mt-[0.2rem]" />
                            So sánh
                        </span>
                    </p>

                    <p className="text-lg">
                        <strong>CPU:</strong> {laptop.cpu}
                    </p>
                    <p className="text-lg">
                        <strong>RAM:</strong> {laptop.ram}
                    </p>
                    <p className="text-lg">
                        <strong>SSD:</strong> {laptop.ssd}
                    </p>
                    <p className="text-lg">
                        <strong>Pin:</strong> {laptop.battery}
                    </p>
                    <p className="text-lg">
                        <strong>Card đồ họa:</strong> {laptop.graphics_card}
                    </p>
                    <p className="text-lg">
                        <strong>Cân nặng:</strong> {laptop.weight}
                    </p>
                    <p className="text-lg">
                        <strong>Giảm giá:</strong> {laptop.discount_percentage}
                    </p>
                    <p className="text-lg">
                        <strong>Quà tặng:</strong> {laptop.gift}
                    </p>
                    <p className="text-lg">
                        <strong>Kho hàng:</strong> {laptop.stock} sản phẩm
                    </p>
                </div>

                {/* Giá sản phẩm */}
                <div className="mt-6 flex space-x-4 items-center">
                    <p className="text-gray-500 line-through text-lg">Giá cũ:{laptop.old_price}</p>
                    <p className="text-red-500 font-semibold text-xl">Giá sale:{laptop.sale_price}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
