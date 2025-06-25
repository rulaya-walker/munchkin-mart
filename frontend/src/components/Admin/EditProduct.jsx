import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../../redux/slices/productSlice';
import {axiosTokenInstance} from '../../axios/axiosInstance';
import { toast } from 'sonner';

const EditProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id}  = useParams();
    const {user} = useSelector((state) => state.auth);
    const {product,loading,error} = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        sku: '',
        countInStock: '',
        description: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: "",
        materials: "",
        gender: "",
        images: []
    });
    const [uploading,setUploading] = useState(false);
    useEffect(() => {
        if(!user || user.role !== 'admin') {
            navigate('/');  // Redirect to home if user is not an admin
        }
    }, [user, navigate]);
    useEffect(() => {
           if(id) {
            dispatch(fetchProductById(id));
           }
    }, [dispatch,id]);

    useEffect(() => {
        if(product) {
            setProductData(product);
        }
    }, [product]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image",file);
        try{
          setUploading(true);
          const {data} = await axiosTokenInstance.post('/api/upload', formData);
          setProductData((prevData) => ({
              ...prevData,
              images: [...prevData.images, {url:data.imageUrl,altText:""}]
          }));
          setUploading(false);
        }catch(error){
          console.error("Image upload failed:", error);
          setUploading(false);
          // Optionally, you can show an error message to the user
        }
    }

const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the product dta to your backend API
        dispatch(updateProduct({productId:id, productData})).then((response) => {
            if(response.error) {
                toast.error("Failed to update product:", response.error.message);
            }else{
                toast.success("Product updated successfully:", response.payload);
            }
        }).catch((error) => {
            toast.error("Error updating product:", error.message);
        });
        // After successful update, navigate back to the product list or details page
        navigate('/admin/products');

    };
    if(loading) {
        return <div>Loading...</div>;
    } 
    if(error) {
        return <div className='text-red-500'>Error: {error}</div>;
    }
  return (
    <div className='max-w-7xl mx-auto p-6 shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Product Name</label>
          <input
            type='text'
            name='name'
            value={productData.name}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Price</label>
          <input
            type='number'
            name='price'
            value={productData.price}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>SKU</label>
          <input
            type='text'
            name='sku'
            value={productData.sku}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Sizes (comma-separated)</label>
          <input
            type='text'
            name='sizes'
            value={productData.sizes.join(', ')}
            onChange={(e) => setProductData({
                ...productData,
                sizes: e.target.value.split(',').map(size => size.trim())
            })}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Colors (comma-separated)</label>
          <input
            type='text'
            name='colors'
            value={productData.colors.join(', ')}
            onChange={(e) => setProductData({
                ...productData,
                colors: e.target.value.split(',').map(color => color.trim())
            })}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        {/* Image Upload */}

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Count in Stock</label>
          <input
            type='number'
            name='countInStock'
            value={productData.countInStock}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Description</label>
          <textarea
            name='description'
            value={productData.description}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Upload Image</label>
          <input
            type='file'
            onChange={handleImageUpload}
            className='border border-gray-300 p-2 rounded w-full'
          />
          {uploading && <p className='text-sm text-gray-500'>Uploading...</p>}
            <div className='flex gap-4 mt-4'>
            {productData.images.map((image, index) => (
              <div key={index} className='w-24 h-24 relative'>
                <img src={image.url} alt={`Product Image ${index + 1}`} className='w-full h-full object-cover rounded' />
                <button
                  type='button'
                  onClick={() => {
                    setProductData((prevData) => ({
                      ...prevData,
                      images: prevData.images.filter((_, i) => i !== index)
                    }));
                  }}
                  className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Add more fields as necessary */}
        <button type='submit' className='bg-primary text-white px-4 py-2 rounded cursor-pointer'>
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditProduct