import axios from 'axios'

export const getAllPopularProducts = async () => {
    let productData = []
    await axios.get(`${process.env.REACT_APP_BACKEND_API}/laptops/bestSelling`).then((data) => {
        productData = data.data
    })
    return productData
}

export const getRevenue = async () => {
    let revenueData = []
    await axios.get(`${process.env.REACT_APP_BACKEND_API}/revenue`).then((data) => {
        revenueData = data.data
    })
    return revenueData
}

export const getProducts = async () => {
    let Data = []
    await axios.get(`${process.env.REACT_APP_BACKEND_API}/laptops`).then((data) => {
        Data = data.data
    })
    console.log(Data)
    return Data
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
