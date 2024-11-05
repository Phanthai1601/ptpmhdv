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
