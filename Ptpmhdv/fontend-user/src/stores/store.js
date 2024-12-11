import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

// Reducer quản lý danh sách laptop
const laptopReducer = (state = { laptops: [], loading: true, error: '', currentPage: 1, laptopById: null }, action) => {
    switch (action.type) {
        case 'FETCH_LAPTOPS_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_LAPTOPS_SUCCESS':
            return { ...state, laptops: action.payload, loading: false }
        case 'FETCH_LAPTOPS_FAILURE':
            return { ...state, error: action.payload, loading: false }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload }
        default:
            return state
    }
}

const compareListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_COMPARE':
            // Kiểm tra nếu sản phẩm đã có hoặc danh sách đạt giới hạn 2
            if (state.length >= 2 || state.some((item) => item.id === action.payload.id)) {
                return state
            }
            return [...state, action.payload] // Thêm sản phẩm mới nếu chưa có và danh sách chưa đầy đủ
        case 'REMOVE_FROM_COMPARE':
            return state.filter((item) => item.id !== action.payload) // Sử dụng `id` để xóa
        case 'CLEAR_COMPARE_LIST':
            return [] // Xóa toàn bộ danh sách
        default:
            return state
    }
}

// Kết hợp các reducers
const rootReducer = combineReducers({
    laptopData: laptopReducer,
    compareList: compareListReducer
})

// Tạo store với rootReducer và middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
