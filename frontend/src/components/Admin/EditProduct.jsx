import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
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
        images: [
            { url: 'https://picsum.photos/200?random=1'},
            { url: 'https://picsum.photos/200?random=2'},
            { url: 'https://picsum.photos/200?random=3' }
        ]
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImage = {
                url: URL.createObjectURL(file)
            };
            setProduct((prevProduct) => ({
                ...prevProduct,
                images: [...prevProduct.images, newImage]
            }));
        }
    }
const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the product data to your backend API
        console.log('Product updated:', product);
        // After successful update, navigate back to the product list or details page
        navigate('/admin/products');

    };
  return (
    <div className='max-w-7xl mx-auto p-6 shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Product Name</label>
          <input
            type='text'
            name='name'
            value={product.name}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Price</label>
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>SKU</label>
          <input
            type='text'
            name='sku'
            value={product.sku}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Sizes (comma-separated)</label>
          <input
            type='text'
            name='sizes'
            value={product.sizes.join(', ')}
            onChange={(e) => setProduct({
                ...product,
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
            value={product.colors.join(', ')}
            onChange={(e) => setProduct({
                ...product,
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
            value={product.countInStock}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Description</label>
          <textarea
            name='description'
            value={product.description}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded w-full'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Upload Image</label>
          <input
            type='file'
            name='images'
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const newImages = files.map(file => ({
                url: URL.createObjectURL(file)
              }));
              setProduct({
                ...product,
                images: [...product.images, ...newImages]
              });
            }}
            className='border border-gray-300 p-2 rounded w-full'
          />
            <div className='flex gap-4 mt-4'>
            {product.images.map((image, index) => (
              <div key={index} className='w-24 h-24 relative'>
                <img src={image.url} alt={`Product Image ${index + 1}`} className='w-full h-full object-cover rounded' />
                <button
                  type='button'
                  onClick={() => {
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      images: prevProduct.images.filter((_, i) => i !== index)
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