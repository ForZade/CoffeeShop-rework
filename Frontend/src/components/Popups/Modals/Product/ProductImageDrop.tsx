import React, { useState } from "react";

interface ProductImageDropProps {
    onImageSelect: (image: File) => void;
}

const ProductImageDrop: React.FC<ProductImageDropProps> = ({ onImageSelect }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Generate preview
            onImageSelect(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Generate preview
            onImageSelect(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div
            className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {preview ? (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-20 lg:max-h-40 object-contain mb-2"
                />
            ) : (
                <p className="text-gray-500">Drag and drop an image here, or click to select</p>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
            />
            <label htmlFor="image-upload" className="text-blue-500 cursor-pointer">
                Select an image
            </label>
        </div>
    );
};

export default ProductImageDrop;
