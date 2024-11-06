import axios from 'axios'

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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/user`)
        return response.data
    } catch (error) {
        console.error('Error get customer:', error)
        throw error
    }
}

export const getBuyerCustomers = async () => {
    try {
        const [maleResponse, femaleResponse] = await Promise.all([
            axios.get(`${process.env.REACT_APP_BACKEND_API}/user/statistics/male`),
            axios.get(`${process.env.REACT_APP_BACKEND_API}/user/statistics/female`)
        ])

        return {
            male: maleResponse.data,
            female: femaleResponse.data
        }
    } catch (error) {
        console.error('Error fetching customer statistics:', error)
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
