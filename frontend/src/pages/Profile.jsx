import React from 'react'
import MyOrderPage from '../components/Products/MyOrderPage'
const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
            {/* Left user section */}
            <div className='w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-semibold mb-4 text-center'>User Profile</h2>
                <div className='flex mx-auto justify-center items-center text-center space-x-4 mb-6'>
                    
                    <div className='flex flex-col items-center'>
                        <img src='https://picsum.photos/100' alt='User Avatar' className='w-12 h-12 rounded-full object-cover' />
                        <h3 className='text-lg font-medium'>John Doe</h3>
                        <p className='text-gray-600 mb-2'>johndoe@example.com</p>
                        <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>Logout</button>
                    </div>
                </div>
            </div>
            {/* Right user details section */}
            <div className='w-full md:w-2/3 lg:w-3/4'>
                <MyOrderPage />
            </div>
        </div>
    </div>
    </div>
  )
}

export default Profile