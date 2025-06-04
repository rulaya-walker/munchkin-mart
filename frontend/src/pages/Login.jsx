import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png' // Assuming you have a logo image
import login from '../assets/login.webp' // Assuming you have a login image

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login details:', { email, password });
    // You can add your API call here to log in the user    
    // Reset form fields
    setEmail('');
    setPassword('');

};
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
            <form className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                <div className='flex flex-row justify-center mb-6'>
                    <img src={logo} alt='Logo' className='w-full rounded-lg' />

                </div>
                <h2 className='text-2xl font-bold text-gray-800 text-center'>Hey There!</h2>
                <p className='text-center mb-6'>Enter your username and password to login</p>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                        required
                    />
                </div>
                <button onClick={handleSubmit} type='submit' className='w-full bg-primary text-white p-2 rounded-md'>Login</button>
                <p className='text-center mt-4'>
                    Don't have an account? <Link to='/register' className='text-primary'>Register</Link>
                    </p>
            </form>
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={login} alt='Login' className='w-full h-[750px] object-cover' />
            </div>
        </div>
    </div>
  )
}

export default Login