import React, { useState } from 'react'

const ImagePopup = ({ image, altText }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)} // Khi chuột vào ảnh
            onMouseLeave={() => setIsHovered(false)} // Khi chuột ra khỏi ảnh và popup
        >
            {/* Thumbnail Image */}
            <img
                src={image || '/default-image.jpg'}
                alt={altText}
                className="w-full h-full object-cover aspect-w-1 aspect-h-1"
            />

            {/* Popup Image */}
            {isHovered && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
                    <div
                        className="bg-white p-4 rounded shadow-lg"
                        // Giữ popup hiển thị khi chuột hover vào popup
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)} // Khi chuột rời khỏi popup
                    >
                        <img
                            src={image || '/default-image.jpg'}
                            alt={altText}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImagePopup
