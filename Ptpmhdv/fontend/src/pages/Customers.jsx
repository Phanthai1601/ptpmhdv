import React, { useEffect, useState } from 'react'
import { getCustomers, addCustomer, deleteCustomer, updateCustomer } from '../services/APIServices'
import ReactPaginate from 'react-paginate'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import FormCustomer from '../components/admin/CustomerForm'
import ConfirmDelete from '../components/admin/ConfirmDelete'
import { useParams } from 'react-router-dom'

const Customers = () => {
    const { id } = useParams()
    const [customerData, setCustomerData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage] = useState(10)
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [customerIdToDelete, setCustomerIdToDelete] = useState(null)
    const [highlightedId, setHighlightedId] = useState(id)

    const getData = async () => {
        try {
            const apiData = await getCustomers()
            const data = apiData.filter((item) => item.role !== 'Admin')
            setCustomerData(data)
        } catch (error) {
            console.error('Error fetching customer data:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleBackgroundClick = () => {
        setHighlightedId(null)
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    const currentCustomers = customerData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

    const handleEdit = (customer) => {
        setSelectedCustomer(customer)
        setIsFormVisible(true)
    }

    const handleDelete = async () => {
        if (customerIdToDelete) {
            try {
                setTimeout(() => {
                    setIsConfirmDeleteVisible(false)
                }, 100)
                await deleteCustomer(customerIdToDelete)
                await getData()
            } catch (error) {
                console.error('Error deleting customer:', error)
            }
            setCustomerIdToDelete(null)
            setIsConfirmDeleteVisible(false)
        }
    }

    const handleDeleteClick = (id) => {
        setCustomerIdToDelete(id)
        setIsConfirmDeleteVisible(true)
    }

    const handleAddNew = () => {
        setSelectedCustomer(null)
        setIsFormVisible(true)
    }

    const handleSave = async (customer) => {
        if (selectedCustomer) {
            try {
                await updateCustomer({ ...customer, id: selectedCustomer.id })
                await getData()
            } catch (error) {
                console.log('Error updating customer:', error)
            }
        } else {
            try {
                await addCustomer(customer)
                await getData()
            } catch (error) {
                console.error('Error adding customer:', error)
            }
        }
        await getData()
        setIsFormVisible(false)
    }

    const handleCloseForm = () => {
        setIsFormVisible(false)
    }

    return (
        <div className="flex" onClick={handleBackgroundClick}>
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-auto">
                <div className="flex justify-between items-center">
                    <strong className="text-gray-700 font-medium">Danh sách khách hàng</strong>
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
                                    <th className="py-2 text-left text-xs">Tên khách hàng</th>
                                    <th className="py-2 text-left text-xs">Email</th>
                                    <th className="py-2 text-left text-xs">Mật khẩu</th>
                                    <th className="py-2 text-left text-xs">Số điện thoại</th>
                                    <th className="py-2 text-left text-xs">Địa chỉ</th>
                                    <th className="py-2 text-left text-xs">Giới tính</th>
                                    <th className="py-2 text-left text-xs">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        style={{
                                            backgroundColor:
                                                customer.id === Number(highlightedId) ? '#e0f7fa' : 'transparent'
                                        }}
                                    >
                                        <td className="py-2 text-xs">{customer.id}</td>
                                        <td className="py-2 text-xs">{customer.fullName}</td>
                                        <td className="py-2 text-xs">{customer.email}</td>
                                        <td className="py-2 text-xs">{customer.password}</td>
                                        <td className="py-2 text-xs">{customer.phone}</td>
                                        <td className="py-2 text-xs">{customer.address}</td>
                                        <td className="py-2 text-xs">{customer.gender === 'Male' ? 'Nam' : 'Nữ'}</td>
                                        <td className="py-2 text-xs">
                                            <div className="flex flex-col items-center">
                                                <button
                                                    className="bg-blue-700 text-white border border-blue-500 py-1 px-2 rounded mb-1 flex items-center"
                                                    onClick={() => handleEdit(customer)}
                                                >
                                                    <FaEdit className="mr-1" />
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-600 text-white border border-red-500 py-1 px-2 rounded flex items-center"
                                                    onClick={() => handleDeleteClick(customer.id)}
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
                    pageCount={Math.ceil(customerData.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'flex space-x-2 pt-2'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'font-bold text-blue-500'}
                    forcePage={currentPage}
                />
            </div>

            {isFormVisible && (
                <FormCustomer customer={selectedCustomer} onSave={handleSave} onClose={handleCloseForm} />
            )}
            {isConfirmDeleteVisible && (
                <ConfirmDelete
                    message="Bạn có chắc chắn muốn xóa khách hàng này không?"
                    onConfirm={handleDelete}
                    onCancel={() => setIsConfirmDeleteVisible(false)}
                />
            )}
        </div>
    )
}

export default Customers
