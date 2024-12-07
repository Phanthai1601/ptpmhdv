import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

// Reducer quản lý danh sách laptop
const laptopReducer = (state = { laptops: [], loading: true, error: '', currentPage: 1 }, action) => {
    console.log('Reducer Action:', action) // Xem action được nhận trong reducer
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

// Kết hợp các reducers (nếu có nhiều reducers trong ứng dụng)
const rootReducer = combineReducers({
    laptopData: laptopReducer
})

// Tạo store với rootReducer và middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
