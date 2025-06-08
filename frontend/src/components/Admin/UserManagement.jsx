import React, { useState } from 'react'

const UserManagement = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'customer' },
        { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'customer' }
    ];
    const [formData , setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer'
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // Reset form data
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer'
        });
    };
    const handleChangeRole = (userId, newRole) => {
        // Logic to change user role
        console.log(`Changing role for user ${userId} to ${newRole}`);
    };

    const handleDeleteUser = (userId) => {
        if(!window.confirm('Are you sure you want to delete this user?')) return;
        // Logic to delete user
        console.log(`Deleting user with ID: ${userId}`);
    };
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>User Management</h2>
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-xl font-semibold mb-4'>Add New User</h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='border border-gray-300 p-2 rounded w-full'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='border border-gray-300 p-2 rounded w-full'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='border border-gray-300 p-2 rounded w-full'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Role</label>
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleInputChange}
                        className='border border-gray-300 p-2 rounded w-full'
                    >
                        <option value='customer'>Customer</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <button type='submit' className='bg-primary text-white px-4 py-2 rounded cursor-pointer'>
                    Add User
                </button>
            </form>
        </div>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className='border-b border-gray-300 hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap'>{user.id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <select
                                    value={user.role}
                                    onChange={(e) => { handleChangeRole(user.id, e.target.value) }}
                                    className='border border-gray-300 p-2 rounded w-full'
                                >
                                    <option value='customer'>Customer</option>
                                    <option value='admin'>Admin</option>
                                </select>

                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button onClick={() => handleDeleteUser(user.id)} className='bg-red-500 rounded px-4 py-1 text-white cursor-pointer hover:bg-red-600'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserManagement