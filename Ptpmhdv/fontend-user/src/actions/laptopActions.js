// actions/laptopActions.js
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
