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
export const compareLaptops = async (id1, id2) => {
    try {
        let Data = []
        await axios
            .post(`${process.env.REACT_APP_BACKEND_API}/compare`, null, {
                params: {
                    id1: id1,
                    id2: id2
                }
            })
            .then((response) => {
                Data = response.data
            })
        return Data
    } catch (error) {
        console.log('Error comparing laptops:', error)
    }
}
