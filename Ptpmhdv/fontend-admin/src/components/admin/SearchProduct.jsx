import React, { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { searchProduct } from '../../services/APIServices'

const SearchProduct = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleOnChangeQuery = (e) => {
        setQuery(e.target.value)
    }

    const searchProductByName = async (e) => {
        try {
            if (e.key === 'Enter' && query) {
                let dataSearch = await searchProduct(query)
                if (dataSearch && dataSearch.length > 0) {
                    navigate(`/admin/products/${dataSearch[0].id}`)
                }
            }
        } catch (error) {
            console.log('Error with search product:', error)
        }
    }

    return (
        <div className="relative">
            <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
                onChange={handleOnChangeQuery}
                onKeyDown={searchProductByName}
                value={query}
            />
        </div>
    )
}

export default SearchProduct
