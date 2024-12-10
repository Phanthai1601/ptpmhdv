import React from 'react'
import { useParams } from 'react-router-dom'

const CompareProduct = () => {
    const { id1, id2 } = useParams()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 m-6 py-6 px-6 mt-12 h-95 bg-white rounded-lg shadow-lg mt-[10%]">
            So sánh sản phẩm có id {id1} và {id2}
        </div>
    )
}

export default CompareProduct
