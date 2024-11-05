import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, addProduct, deleteProduct, updateProduct } from '../services/APIServices'
import ReactPaginate from 'react-paginate'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import FormProduct from '../components/FromProduct'
import ConfirmDelete from '../components/ConfirmDelete'

const Products = () => {
    const [productData, setProductData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage] = useState(10)
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [productIdToDelete, setProductIdToDelete] = useState(null)

    const getData = async () => {
        try {
            const apiData = await getProducts()
            setProductData(apiData)
        } catch (error) {
            console.error('Error fetching product data:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    const currentProducts = productData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

    const handleEdit = (product) => {
        setSelectedProduct(product)
        setIsFormVisible(true)
    }

    const handleDelete = async () => {
        if (productIdToDelete) {
            try {
                setTimeout(() => {
                    setIsConfirmDeleteVisible(false)
                }, 400)
                await deleteProduct(productIdToDelete)
                await getData()
            } catch (error) {
                console.error('Error deleting product:', error)
            }
            setProductIdToDelete(null)
            setIsConfirmDeleteVisible(false)
        }
    }

    const handleDeleteClick = (id) => {
        setProductIdToDelete(id)
        setIsConfirmDeleteVisible(true)
    }

    const handleAddNew = () => {
        setSelectedProduct(null)
        setIsFormVisible(true)
    }

    const handleSave = async (product) => {
        if (selectedProduct) {
            try {
                await updateProduct({ ...product, id: selectedProduct.id }) // Truyền ID sản phẩm vào object
            } catch (error) {
                console.log('Error updating product:', error)
            }
        } else {
            try {
                await addProduct(product)
            } catch (error) {
                console.error('Error adding product:', error)
            }
        }
        await getData()
        setIsFormVisible(false)
    }

    const handleCloseForm = () => {
        setIsFormVisible(false)
    }

    return (
        <div className="flex">
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-auto">
                <div className="flex justify-between items-center">
                    <strong className="text-gray-700 font-medium">Các sản phẩm</strong>
                    <button
                        className="bg-blue-700 text-white py-2 px-3 rounded flex items-center"
                        onClick={handleAddNew}
                    >
                        <FaPlus className="mr-1" />
                        Thêm mới
                    </button>
                </div>
                <div className="mt-3">
                    <div className="overflow-x-auto">
                        <table className="w-full text-gray-700 border border-gray-200 rounded-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 text-left text-xs">ID</th>
                                    <th className="py-2 text-left text-xs">Sản phẩm</th>
                                    <th className="py-2 text-left text-xs">RAM</th>
                                    <th className="py-2 text-left text-xs">SSD</th>
                                    <th className="py-2 text-left text-xs">Giá bán</th>
                                    <th className="py-2 text-left text-xs">Giá cũ</th>
                                    <th className="py-2 text-left text-xs">% giảm giá</th>
                                    <th className="py-2 text-left text-xs">Quà tặng</th>
                                    <th className="py-2 text-left text-xs">Màn hình</th>
                                    <th className="py-2 text-left text-xs">CPU</th>
                                    <th className="py-2 text-left text-xs">Card đồ họa</th>
                                    <th className="py-2 text-left text-xs">Pin</th>
                                    <th className="py-2 text-left text-xs">Khối lượng</th>
                                    <th className="py-2 text-left text-xs">Kho</th>
                                    <th className="py-2 text-left text-xs">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="py-2 text-xs">{product.id}</td>
                                        <td className="py-2 text-xs">
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="py-2 text-xs">{product.ram}</td>
                                        <td className="py-2 text-xs">{product.ssd}</td>
                                        <td className="py-2 text-xs">{product.sale_price}</td>
                                        <td className="py-2 text-xs">{product.old_price}</td>
                                        <td className="py-2 text-xs">{product.discount_percentage}</td>
                                        <td className="py-2 text-xs">{product.gift}</td>
                                        <td className="py-2 text-xs">{product.screen}</td>
                                        <td className="py-2 text-xs">{product.cpu}</td>
                                        <td className="py-2 text-xs">{product.graphics_card}</td>
                                        <td className="py-2 text-xs">{product.battery}</td>
                                        <td className="py-2 text-xs">{product.weight}</td>
                                        <td className="py-2 text-xs">{product.stock}</td>
                                        <td className="py-2 text-xs">
                                            <div className="flex flex-col">
                                                <button
                                                    className="bg-blue-700 text-white border border-blue-500 py-1 px-2 rounded mb-1 flex items-center"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <FaEdit className="mr-1" />
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-600 text-white border border-red-500 py-1 px-2 rounded flex items-center"
                                                    onClick={() => handleDeleteClick(product.id)}
                                                >
                                                    <FaTrash className="mr-1" />
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={'Trước'}
                    nextLabel={'Sau'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(productData.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'flex space-x-2 pt-2'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>

            {isFormVisible && <FormProduct product={selectedProduct} onSave={handleSave} onClose={handleCloseForm} />}
            {isConfirmDeleteVisible && (
                <ConfirmDelete
                    message="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                    onConfirm={handleDelete}
                    onCancel={() => setIsConfirmDeleteVisible(false)}
                />
            )}
        </div>
    )
}

export default Products
