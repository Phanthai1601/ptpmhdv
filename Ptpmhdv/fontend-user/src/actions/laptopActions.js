import { getProducts } from '../services/APIServices'

// Action fetch dữ liệu laptop
export const fetchLaptops = () => async (dispatch) => {
    dispatch({ type: 'FETCH_LAPTOPS_REQUEST' })

    try {
        const response = await getProducts()
        dispatch({ type: 'FETCH_LAPTOPS_SUCCESS', payload: response })
    } catch (error) {
        dispatch({ type: 'FETCH_LAPTOPS_FAILURE', payload: 'Lỗi khi lấy dữ liệu sản phẩm!' })
    }
}

// Action thêm laptop vào danh sách so sánh
export const addToCompare = (laptop) => {
    return {
        type: 'ADD_TO_COMPARE',
        payload: laptop
    }
}

// Action xóa laptop khỏi danh sách so sánh
export const removeFromCompare = (laptopId) => {
    return {
        type: 'REMOVE_FROM_COMPARE',
        payload: laptopId
    }
}

// Action xóa tất cả laptop khỏi danh sách so sánh
export const clearCompareList = () => {
    return {
        type: 'CLEAR_COMPARE_LIST'
    }
}
