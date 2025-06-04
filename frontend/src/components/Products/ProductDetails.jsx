import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

    const  selectedProduct = {
        _id: 1,
        name: "Product Name",
        description: "This is a detailed description of the product. It includes all the features and specifications that make this product unique and desirable.",
        price: 29.99,
        category: "Category Name",
        stock: 100,
        brand: "Leather",
        materials: ["Cotton", "Polyester", "Leather"],
        sizes: [
            "S",
            "M",
            "L",
            "XL"
        ],
        colors: [
            "Red",
            "Blue",
            "Green"
        ],
        images: [
            {
                url: "https://picsum.photos/200/200?random=1",
                alt: "Product Image 1"
            },
            {
                url: "https://picsum.photos/200/200?random=2",
                alt: "Product Image 2"
            },
            {
                url: "https://picsum.photos/200/200?random=3",
                alt: "Product Image 3"
            },
        ]
    };
const similarProducts = [
    {
        _id: 2,
        name: "Similar Product 1",
        price: 24.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=1",
                alt: "Product Image 1"
            },

        ]
    },
    {
        _id: 3,
        name: "Similar Product 2",  
        price: 34.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=2",
                alt: "Product Image 2"
            },
        ]
    },
    {
        _id: 4,
        name: "Similar Product 3",
        price: 19.99,
        images: [   
            {
                url: "https://picsum.photos/200/200?random=3",
                alt: "Product Image 3"
            },
        ]
    },
    {
        _id: 5,
        name: "Similar Product 4",
        price: 39.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=4",
                alt: "Product Image 4"
            },
        ]
    }
];

const placeholderProducts = [
    {
        _id: 2,
        name: "Placeholder Product 1",
        price: 24.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=1",
                alt: "Product Image 1"
            },

        ]
    },
    {
        _id: 3,
        name: "Placeholder Product 2",  
        price: 34.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=2",
                alt: "Product Image 2"
            },
        ]
    },
    {
        _id: 4,
        name: "Placeholder Product 3",
        price: 19.99,
        images: [   
            {
                url: "https://picsum.photos/200/200?random=3",
                alt: "Product Image 3"
            },
        ]
    },
    {
        _id: 5,
        name: "Placeholder Product 4",
        price: 39.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=4",
                alt: "Product Image 4"
            },
        ]
    },
    {
        _id: 6,
        name: "Placeholder Product 5",
        price: 29.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=5",
                alt: "Product Image 5"
            },
        ]
    },
    {
        _id: 7,
        name: "Placeholder Product 6",
        price: 49.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=6",
                alt: "Product Image 6"
            },
        ]
    },
    {
        _id: 8,
        name: "Placeholder Product 7",
        price: 59.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=7",
                alt: "Product Image 7"
            },
        ]
    },
    {
        _id: 9,
        name: "Placeholder Product 8",
        price: 69.99,
        images: [
            {
                url: "https://picsum.photos/200/200?random=8",
                alt: "Product Image 8"
            },
        ]
    }
];
const ProductDetails = () => {
const [selectedImage, setSelectedImage] = useState(selectedProduct.images[0].url);
const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");
const [quantity, setQuantity] = useState(1);
const [isButtonDisabled, setButtonDisabled] = useState(false);
useEffect(() => {
    if(selectedProduct?.images?.length > 0) {
        setSelectedImage(selectedProduct.images[0].url);
    }
}, [selectedProduct.images]);   

const handleQuantityChange = (action) => {
    if (action === 'increment') {
        setQuantity(quantity + 1);
    } else if (action === 'decrement') {
        setQuantity(quantity - 1);
    }
};

const handleAddToCart = () => {
    if(!selectedSize || !selectedColor) {
        toast.error("Please select a size and color before adding to cart.",{
            duration:1000
        });
        return;
    }
    setButtonDisabled(true);
    setTimeout(() => {
        toast.success("Product added to cart successfully!", {
            duration: 1000
        });
        setButtonDisabled(false);
    }, 500);
};

return (
    <div className='p-6'>
        <div className='container mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row gap-8'>
                {/* Left thumbnail */}
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProduct.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.alt} className='w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-300' onClick={() => setSelectedImage(image.url)} />
                    ))}
                </div>
                {/* Main image */}
                <div className="md:w-1/2">
                    <img src={selectedImage} alt={selectedProduct.images.find(img => img.url === selectedImage).alt} className='w-full h-auto object-cover rounded-lg' />
                </div>
                {/* Mobile Thumbnails */}
                <div className='flex md:hidden overscroll-x-scroll space-x-2'>
                    {selectedProduct.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.alt} className='w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-300' onClick={() => setSelectedImage(image.url)} />
                    ))}
                </div>

                {/* Product Details */}
                <div className='md:w-1/2 md:ml-10'>
                    <h1 className='text-2xl font-bold mb-4 text-gray-700'>{selectedProduct.name}</h1>
                    <p className='text-gray-700 mb-4'>{selectedProduct.description}</p>
                    <div className='flex items-center mb-4'>
                        <span className='text-xl font-semibold text-gray-700'>${selectedProduct.price.toFixed(2)}</span>
                        <span className='ml-4 text-sm text-gray-500'>In Stock: {selectedProduct.stock}</span>
                    </div>
                    <div className='mb-4'>
                        <h3 className='font-semibold mb-2 text-gray-700'>Colors:</h3>
                        <div className='flex gap-2 mt-2'>
                            {selectedProduct.colors.map((color, index) => (
                                <button key={index}
                                onClick={() => setSelectedColor(color)}
                                 className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color ? 'border-4 border-black' : 'border-gray-300'}`} style={{ backgroundColor: color.toLowerCase(), filter: 'brightness(0.5)' }}>

                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h3 className='font-semibold mb-2'>Sizes:</h3>
                        <div className='flex gap-2 mt-2'>
                            {
                                selectedProduct.sizes.map((size, index) => (
                                    <button key={index}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer ${selectedSize === size ? 'bg-black text-white' : ''}`}>
                                        {size}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mb-6">
                            <h3 className='font-semibold mb-2 text-gray-700'>Quantity:</h3>
                            <div className="flex items-center space-x-4 mt-2">
                                <button
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">-</button>
                                <span className="text-gray-700">{quantity}</span>
                                <button onClick={() => handleQuantityChange('increment')} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">+</button>
                            </div>
                    </div>

                    <button disabled={isButtonDisabled} onClick={() => handleAddToCart()} className={`bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>{isButtonDisabled ? 'Adding...' : 'Add to Cart'}</button>
                    <div className="mt-10 text-gray-700">
                        <h3 className='font-semibold mb-2 text-gray-700'>Characteristics:</h3>
                        <table className='w-full text-left'>
                            <tbody>
                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Stock</td>
                                    <td className='py-2 border-b border-gray-200'>{selectedProduct.stock}</td>
                                </tr>
                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Brand</td>
                                    <td className='py-2 border-b border-gray-200'>{selectedProduct.brand}</td>
                                </tr>

                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Category</td>
                                    <td className='py-2 border-b border-gray-200'>{selectedProduct.category}</td>
                                </tr>
                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Materials</td>
                                    <td className='py-2 border-b border-gray-200'>{selectedProduct.materials.join(", ")}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div className="mt-20">
                <h2 className="text-2xl text-capitalize text-center font-semibold text-gray-700 mb-4">
                    You may also like
                </h2>
                <ProductGrid products={similarProducts} />
            </div>

             <div className="mt-20">
                <h2 className="text-2xl text-capitalize text-center font-semibold text-gray-700 mb-4">
                    Top Wears for Women
                </h2>
                <ProductGrid products={placeholderProducts} />
            </div>
        </div>
    </div>
  )
}

export default ProductDetails