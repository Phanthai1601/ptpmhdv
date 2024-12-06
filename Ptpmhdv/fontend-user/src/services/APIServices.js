import axios from 'axios'

export const getProducts = async () => {
    try {
        let Data = []
        await axios.get(`${process.env.REACT_APP_BACKEND_API}/laptops`).then((data) => {
            Data = data.data
        })
        return Data
    } catch (error) {
        console.log('Error fetching  product:', error)
    }
}
