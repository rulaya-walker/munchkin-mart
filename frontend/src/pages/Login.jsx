import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png' // Assuming you have a logo image
import login from '../assets/login.webp' // Assuming you have a login image
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { mergeCarts } from '../redux/slices/cartSlice'
import { toast } from 'sonner'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const { user, guestId, loading, error } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const isCheckoutRedirect = redirect.includes('checkout');
    useEffect(() => {
      if(user){
        // If there's a guestId (which there should always be), attempt to merge carts
        // This ensures we check for both situations - guest cart with items and possible user cart
        if(guestId){
            dispatch(mergeCarts({guestId, user}))
                .then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                })
                .catch((error) => {
                    console.error("Error merging carts:", error);
                    // Still navigate even if merge fails
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
        } else {
            navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
      }  
    }, [user, guestId, isCheckoutRedirect, dispatch, navigate]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            // Reset form fields on success
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Login error:', err);
            // Error will be handled by the useEffect above
        }
    };
    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
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
                <button 
                    type='submit' 
                    className='w-full bg-primary text-white p-2 rounded-md cursor-pointer'
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className='text-center mt-4'>
                    Don't have an account? <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className='text-primary'>Register</Link>
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