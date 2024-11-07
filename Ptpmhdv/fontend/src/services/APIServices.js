import axios from 'axios'
import convertVNDToUSD from '../library/utils/convertVNDToUSD'

export const getAllPopularProducts = async () => {
    try {
        let productData = []
        await axios.get(`${process.env.REACT_APP_BACKEND_API}/laptops/bestSelling`).then((data) => {
            productData = data.data
        })
        return productData
    } catch (error) {
        console.log('Error fetching  popular product:', error)
    }
}

export const getRevenue = async () => {
    try {
        let revenueData = []
        await axios.get(`${process.env.REACT_APP_BACKEND_API}/revenue`).then((data) => {
            revenueData = data.data
        })
        return revenueData
    } catch (error) {
        console.log('Error fetching  revenue:', error)
    }
}

export const getProducts = async () => {
    try {
        let Data = []
        await axios.get(`${process.env.REACT_APP_BACKEND_API}/laptops`).then((data) => {
            Data = data.data
            Data.sort((a, b) => a.id - b.id)
        })
        return Data
    } catch (error) {
        console.log('Error fetching  product:', error)
    }
}

export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/laptops`, newProduct)
        return response.data
    } catch (error) {
        console.error('Error adding product:', error)
        throw error
    }
}

export const updateProduct = async (updatedProduct) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_API}/laptops/${updatedProduct.id}`,
            updatedProduct
        )
        return response.data
    } catch (error) {
        console.error('Error updating product:', error)
        throw error
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/laptops/${productId}`)
        return response.data
    } catch (error) {
        console.error('Error deleting product:', error)
        throw error
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/laptops/${productId}`)
        return response.data
    } catch (error) {
        console.error('Error get product by id:', error)
        throw error
    }
}

export const getCustomers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/users`)
        return response.data
    } catch (error) {
        console.error('Error get customer:', error)
        throw error
    }
}

export const getBuyerCustomers = async () => {
    try {
        const [maleResponse, femaleResponse] = await Promise.all([
            axios.get(`${process.env.REACT_APP_BACKEND_API}/users/count/male`),
            axios.get(`${process.env.REACT_APP_BACKEND_API}/users/count/female`)
        ])

        return {
            male: maleResponse.data,
            female: femaleResponse.data
        }
    } catch (error) {
        console.error('Error fetching customer :', error)
        throw error
    }
}

export const getProductOrders = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/product_order`)
        return response.data
    } catch (error) {
        console.error('Error fetching  product_order:', error)
        throw error
    }
}

export const getStasGrid = async () => {
    try {
        const [revenue, countUsers, orders] = await Promise.all([
            axios.get(`${process.env.REACT_APP_BACKEND_API}/revenue`),
            axios.get(`${process.env.REACT_APP_BACKEND_API}/users/count`),
            axios.get(`${process.env.REACT_APP_BACKEND_API}/orders`)
        ])

        const total_sales = revenue.data.reduce((sum, item) => {
            return sum + item.revenue_month
        }, 0)

        const total_expense = revenue.data.reduce((sum, item) => {
            return sum + item.expensive
        }, 0)

        return {
            total_sales: convertVNDToUSD(total_sales),
            total_sales_change: +234,
            total_customer: countUsers.data,
            total_customer_change: -2,
            total_expense: convertVNDToUSD(total_expense),
            total_expense_change: +456,
            total_orders: orders.data.length,
            total_orders_change: +2
        }
    } catch (error) {
        console.error('Error fetching customer data:', error)
        throw error
    }
}

export const addCustomer = async (customer) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/users`, customer)
        return response.data
    } catch (error) {
        console.error('Error adding user:', error)
        throw error
    }
}

export const updateCustomer = async (updateCustomer) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_API}/users/${updateCustomer.id}`,
            updateCustomer
        )
        return response.data
    } catch (error) {
        console.error('Error updating users:', error)
        throw error
    }
}

export const deleteCustomer = async (customerId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/users/${customerId}`)
        return response.data
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}
