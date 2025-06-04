import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
const CartContents = () => {
    const cartProducts = [
        {
            id: 1,
            name: 'Product 1',
            price: 29.99,
            quantity: 2,
            size: 'M',
            color: 'Red',
            description: 'This is a great product.',
            category: 'Clothing',
            image: 'https://picsum.photos/300?random=1',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 19.99,   
            quantity: 1,
            size: 'L',
            color: 'Blue',
            description: 'This is another great product.',
            category: 'Accessories',
            image: 'https://picsum.photos/300?random=2',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 39.99,
            quantity: 3,
            size: 'S',
            color: 'Green',
            description: 'This is yet another great product.',
            category: 'Footwear',
            image: 'https://picsum.photos/300?random=3',
        },
        {
            id: 4,
            name: 'Product 4',
            price: 49.99,
            quantity: 1,
            size: 'XL',
            color: 'Black',
            description: 'This is a fantastic product.',
            category: 'Electronics',
            image: 'https://picsum.photos/300?random=4',
        },
        {
            id: 5,
            name: 'Product 5',
            price: 15.99,
            quantity: 2,
            size: 'M',
            color: 'White',
            description: 'This is a must-have product.',
            category: 'Home',
            image: 'https://picsum.photos/300?random=5',
        },
    ];
  return (
    <div className='p-4 bg-white rounded-lg overflow-auto'>
        <div className='flex-1 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
            {/* Cart items will go here */}
            {cartProducts.length === 0 ? <p className='text-gray-500'>Your cart is empty.</p> : ""}
        </div>
      {cartProducts.map((product) => (
        <div key={product.id} className="flex items-center justify-between py-4 border-b border-gray-200">
          <img src={product.image} alt={product.name} className="h-16 w-16 object-cover mr-4" />
          <div className="flex-1 items-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className='text-sm text-gray-500'>
                Size: {product.size} | Color: {product.color}
            </p>
                      <div className='flex items-center space-x-2'>
            <button className='border rounded px-1 py-0 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer'>
                -
            </button>
            <span className="mx-2">{product.quantity}</span>
            <button className='border rounded px-1 py-0 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer'>+</button>
            </div>
          </div>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <button className="text-red-500 hover:text-red-700 cursor-pointer">
            <RiDeleteBin6Line className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartContents