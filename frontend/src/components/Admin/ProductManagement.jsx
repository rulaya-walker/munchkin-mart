import React from 'react'
import { Link } from 'react-router-dom';

const ProductManagement = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, sku: 'SKU123' },
        { id: 2, name: 'Product 2', price: 49.99, sku: 'SKU456' },
        { id: 3, name: 'Product 3', price: 19.99, sku: 'SKU789' },
        { id: 4, name: 'Product 4', price: 39.99, sku: 'SKU101' }
    ];
    const handleDeleteProduct = (id) => {
        // Logic to delete product
        if (window.confirm('Are you sure you want to delete this product?')) {
            console.log(`Deleting product with ID: ${id}`);
            // Here you would typically make an API call to delete the product
        }
    };
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Product Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>SKU</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map(product => (
                        <tr key={product.id} className='border-b border-gray-300 hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>${product.price.toFixed(2)}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.sku}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <Link to={`/admin/products/${product.id}/edit`} className='bg-yellow-500 text-white px-2 py-1 rounded mr-4'>Edit</Link>
                                <button onClick={() => handleDeleteProduct(product.id)} className='bg-red-500 rounded px-2 py-1 text-white cursor-pointer hover:bg-red-600'>Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className='px-6 py-4 text-center'>No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductManagement