// LaptopList.js
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLaptops } from '../actions/laptopActions'
import { Link } from 'react-router-dom'

const LaptopList = () => {
    const dispatch = useDispatch()
    const { laptops, loading, error, currentPage } = useSelector((state) => state.laptopData)
    const productsPerPage = 30

    // Fetch laptops when the component mounts
    useEffect(() => {
        if (laptops.length === 0) {
            dispatch(fetchLaptops())
        }
    }, [dispatch, laptops.length])


    const totalPages = Math.ceil(laptops.length / productsPerPage)
    const startIndex = (currentPage - 1) * productsPerPage
    const currentProducts = laptops.slice(startIndex, startIndex + productsPerPage)

    const handlePrevious = () => {
        if (currentPage > 1) dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
    }

    const handleNext = () => {
        if (currentPage < totalPages) dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
    }

    const handlePageClick = (page) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
    }

    if (loading) {
        return <div className="text-center text-lg h-5 mt-5">Đang tải dữ liệu...</div>
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>
    }

    return (
        <div className="p-6 font-sans" style={{ marginTop: '100px' }}>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row m-5">
                            <div className="col-6">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/76/fb/76fbc67548f64e5857bc526b2649f8a9.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="col-6">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/c8/3a/c83a18563c1751564790a036e9755a6f.png" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row m-5">
                            <div className="col-6">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/39/5a/395a8c292aa5163c665d9052d6b87f6c.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="col-6">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/5e/59/5e59a729438eb1e72ad4ef2b4e2cdd29.png" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row m-5">
                            <div className="col-6">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/76/fb/76fbc67548f64e5857bc526b2649f8a9.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="col-6">
                                <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/c8/3a/c83a18563c1751564790a036e9755a6f.png" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 m-5 py-4 px-4 bg-white rounded-lg pt-6">
                <div className="col-span-full text-center mb-6 w-full h-5">
                    <h1 className="text-2xl font-bold text-center mb-6">Danh sách sản phẩm Laptop</h1>
                </div>
                {currentProducts.map((laptop) => (
                    <div
                        key={laptop.id}
                        className="border border-gray-200 rounded-lg p-4 text-left bg-white"
                        style={{ height: '250px' }}
                    >
                        <img
                            src={laptop.image}
                            alt={laptop.name}
                            className="hover:scale-105 w-full h-24 object-contain rounded mb-2"
                        />
                        <Link
                            to={`/product/${laptop.id}`}
                            state={laptop}
                            className="block text-gray-700 hover:text-sky-500 !no-underline"
                        >
                            <h2 className="text-sm font-sans-serif mb-1 h-10 overflow-hidden">{laptop.name}</h2>
                            <h2 className="text-sm font-sans-serif mb-1">
                                {laptop.ram}/{laptop.ssd}
                            </h2>
                        </Link>
                        <p className="text-red-500 font-bold text-base">{laptop.sale_price}</p>
                        <div>
                            <span className="font-sans-serif text-gray-500 line-through text-sm">
                                {laptop.old_price === 'Không có thông tin' ? laptop.sale_price : laptop.old_price}
                            </span>
                            <span className="text-red-500 font-sans-serif text-sm">
                                &nbsp;&nbsp;
                                {laptop.discount_percentage === 'Không có thông tin'
                                    ? '-0%'
                                    : laptop.discount_percentage}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-center items-center space-x-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                    Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageClick(i + 1)}
                        className={`px-4 py-2 rounded ${currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    )
}

export default LaptopList
