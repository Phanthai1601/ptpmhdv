import React from 'react'

const ConfirmDelete = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <div className="flex items-center mb-4">
                    <svg
                        className="w-6 h-6 text-red-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01M20.39 16.39l-1.42-1.42M3.61 7.61l1.42 1.42M20.39 7.61l-1.42 1.42M3.61 16.39l1.42-1.42M12 3v6m6 6H6"
                        />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-700">Xác nhận</h2>
                </div>
                <p className="text-gray-600">{message}</p>
                <div className="mt-4">
                    <button onClick={onConfirm} className="bg-red-600 text-white py-2 px-4 rounded mr-2">
                        Xóa
                    </button>
                    <button onClick={onCancel} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete
