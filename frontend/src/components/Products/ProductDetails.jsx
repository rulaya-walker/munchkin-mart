import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchSimilarProducts } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";


const ProductDetails = ({productId}) => {
const {id} = useParams();
const dispatch = useDispatch();
const { product, loading, error, similarProducts } = useSelector((state) => state.products);
const {user, guestId} = useSelector((state) => state.auth);
const [mainImage, setMainImage] = useState('');
const [selectedImage, setSelectedImage] = useState('');
const [selectedSize, setSelectedSize] = useState('');
const [selectedColor, setSelectedColor] = useState('');
const [quantity, setQuantity] = useState(1);
const [isButtonDisabled, setButtonDisabled] = useState(false);
const productFetchId = productId || id;

useEffect(() => {
    if(productFetchId) {
        dispatch(fetchProductById(productFetchId));
        dispatch(fetchSimilarProducts({productId:productFetchId}));
    }
}, [dispatch, productFetchId]);
useEffect(() => {
    if(product?.images?.length > 0) {
        setMainImage(product.images[0].url);
        setSelectedImage(product.images[0].url);
    }
}, [product]);   

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
    
    const cartData = {
        productId: productFetchId,
        guestId: guestId,
        userId: user?._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
    };
    
    
    dispatch(addToCart(cartData))
        .unwrap()
        .then((response) => {
            toast.success("Product added to cart successfully!", {
                duration: 1000,
            });
        })
        .catch((error) => {
            toast.error(error.message || "Failed to add product to cart. Please try again.", {
                duration: 2000,
            });
        })
        .finally(() => {
            setButtonDisabled(false);
        });
};

if(loading) {
    return <div className="text-center text-gray-700">Loading product details...</div>;
}
if(error) {
    return <div className="text-center text-red-500">Error loading product details: {error}</div>;
}
if(!product) {
    return <div className="text-center text-gray-700">Product not found</div>;
}

    return (
        <div className='p-6'>
            <div className='container mx-auto bg-white p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Left thumbnail */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {product.images && product.images.map((image, index) => (
                            <img key={index} src={image.url} alt={image.alt} className='w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-300' onClick={() => setSelectedImage(image.url)} />
                    ))}
                </div>
                {/* Main image */}
                <div className="md:w-1/2">
                    <img src={selectedImage} alt={selectedImage && product.images && product.images.find(img => img.url === selectedImage)?.alt} className='w-full h-auto object-cover rounded-lg' />
                </div>
                {/* Mobile Thumbnails */}
                <div className='flex md:hidden overscroll-x-scroll space-x-2'>
                    {product.images && product.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.alt} className='w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-300' onClick={() => setSelectedImage(image.url)} />
                    ))}
                </div>

                {/* Product Details */}
                <div className='md:w-1/2 md:ml-10'>
                    <h1 className='text-2xl font-bold mb-4 text-gray-700'>{product.name}</h1>
                    <p className='text-gray-700 mb-4'>{product.description}</p>
                    <div className='flex items-center mb-4'>
                       <del><span className='text-xl font-semibold text-gray-700'>${product.price.toFixed(2)}</span></del>
                             <span className='text-xl font-semibold text-gray-700'>${product.price.toFixed(2)}</span>
                        <span className='ml-4 text-sm text-gray-500'>In Stock: {product.stock}</span>
                    </div>
                    <div className='mb-4'>
                        <h3 className='font-semibold mb-2 text-gray-700'>Colors:</h3>
                        <div className='flex gap-2 mt-2'>
                            {product.colors && product.colors.map((color, index) => (
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
                                product.sizes && product.sizes.map((size, index) => (
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
                                    <td className='py-2 border-b border-gray-200'>{product.stock}</td>
                                </tr>
                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Brand</td>
                                    <td className='py-2 border-b border-gray-200'>{product.brand}</td>
                                </tr>

                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Category</td>
                                    <td className='py-2 border-b border-gray-200'>{product.category}</td>
                                </tr>
                                <tr>
                                    <td className='py-2 border-b border-gray-200'>Materials</td>
                                    <td className='py-2 border-b border-gray-200'>{product.materials && product.materials.join(", ")}</td>
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
        </div>
    </div>
  )
}

export default ProductDetails