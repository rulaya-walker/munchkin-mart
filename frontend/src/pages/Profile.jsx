import React, { useEffect } from 'react'
import MyOrderPage from '../components/Products/MyOrderPage'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
const Profile = () => {
  const {user} = useSelector((state) => state.auth);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  const handleLgout = () => {
    // Implement logout functionality here
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
  }
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
                        <h3 className='text-lg font-medium'>{user?.name}</h3>
                        <p className='text-gray-600 mb-2'>{user?.email}</p>
                        <button onClick={handleLgout} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer'>Logout</button>
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