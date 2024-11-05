import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/APIServices'

const ProductWithID = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({
        name: '',
        ram: '',
        ssd: '',
        sale_price: '',
        old_price: '',
        discount_percentage: '',
        gift: '',
        screen: '',
        cpu: '',
        graphics_card: '',
        battery: '',
        weight: '',
        stock: '',
        image: ''
    })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id)
                setProduct(productData)
            } catch (error) {
                console.error('Error fetching product details:', error)
            }
        }
        fetchProduct()
    }, [id])

    return (
        <div className="h-screen w-screen flex flex-col bg-white m-4">
            <h2 className="text-3xl font-semibold mb-4 text-center">{product.name}</h2>
            <div className="flex flex-row flex-grow">
                {product.image && (
                    <img src={product.image} alt={product.name} className="flex-shrink-0 w-1/3 h-1/2 object-cover" />
                )}
                <div className="flex flex-col justify-between w-1/2 p-4 overflow-y-auto">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium">Giá bán:</span>
                            <span>{product.sale_price} VND</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Giá cũ:</span>
                            <span>{product.old_price} VND</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">% Giảm giá:</span>
                            <span>{product.discount_percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">RAM:</span>
                            <span>{product.ram}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">SSD:</span>
                            <span>{product.ssd}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Quà tặng:</span>
                            <span>{product.gift}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Màn hình:</span>
                            <span>{product.screen}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">CPU:</span>
                            <span>{product.cpu}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Card đồ họa:</span>
                            <span>{product.graphics_card}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Pin:</span>
                            <span>{product.battery}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Khối lượng:</span>
                            <span>{product.weight} kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Kho:</span>
                            <span>{product.stock}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductWithID
