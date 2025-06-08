import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png' // Adjust the path as necessary
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from 'react-icons/fa6'
import { FaSignOutAlt } from "react-icons/fa";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear user data and redirect to login page
    navigate('/');
  }
  return (
    <div className='p-6'>
        <div className='mb-6 bg-white p-2 rounded-lg shadow-md flex items-center justify-start'>
            <Link to='/admin/dashboard' className='text-white text-lg font-semibold hover:text-gray-300'>
            <img src={logo} alt='Logo' className='h-10 w-auto mb-2' />
            
            </Link>

        </div>
        <h2 className='text-xl font-medium mb-6'>Admin Dashboard</h2>
        <nav className='flex flex-col space-y-2'>
            <NavLink to='/admin/users' className={({isActive}) => isActive ? 'bg-gray-800 text-white py-3 px-4 flex items-center space-x-2' : 'text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 flex items-center justify-start space-x-2'}>
              <FaUser className='mr-2'/> <span className='mr-2'>Users</span>
            </NavLink>
            <NavLink to='/admin/products' className={({isActive}) => isActive ? 'bg-gray-800 text-white py-3 px-4 flex items-center space-x-2' : 'text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 flex items-center justify-start space-x-2'}>
              <FaBoxOpen className='mr-2'/> <span className='mr-2'>Products</span>
            </NavLink>

            <NavLink to='/admin/orders' className={({isActive}) => isActive ? 'bg-gray-800 text-white py-3 px-4 flex items-center space-x-2' : 'text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 flex items-center justify-start space-x-2'}>
              <FaClipboardList className='mr-2'/> <span className='mr-2'>Orders</span>
            </NavLink>

            <NavLink to='/' className={({isActive}) => isActive ? 'bg-gray-800 text-white py-3 px-4 flex items-center space-x-2' : 'text-gray-300 hover:bg-gray-300 hover:text-white py-3 px-4 flex items-center justify-start space-x-2'}>
              <FaStore className='mr-2'/> <span className='mr-2'>Shop</span>
            </NavLink>
        </nav>
        <div className='mt-6'>
          <button onClick={handleLogout} className='w-full bg-red-600 text-white py-3 px-4 flex items-center justify-center rounded-lg cursor-pointer hover:bg-red-700 transition-colors duration-300'>
           <FaSignOutAlt /> <span className='mr-2'></span> Logout
          </button>
        </div>  
    </div>
  )
}

export default AdminSidebar