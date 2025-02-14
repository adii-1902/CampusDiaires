import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill out all fields.'));
        }
        try {
            dispatch(signInStart(true));
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                return dispatch(signInFailure(data.message));
            }
            if (res.ok) {
                dispatch(signInSuccess(data));
                return navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* Left */}
                <div className='flex-1'>
                    <Link to='/' className='  font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Campus
                        </span>
                        Diaries
                    </Link>
                    <p className='text-sm mt-5'>
                        This is a demo project. You can sign in with your email and password or with google.
                    </p>
                </div>
                {/* Right */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='Email'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    required
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500   focus:outline-none z-10"
                                >
                                    {showPassword ? (
                                        <HiEye className="h-5 w-5" />
                                    ) : (
                                        <HiEyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign In'
                            }
                        </Button>
                        <div className="flex items-center justify-center space-x-2 mt-4">
                            <hr className="flex-1 border-gray-300 dark:border-gray-700" />
                            <span className="px-4 text-gray-600 dark:text-gray-400">Or</span>
                            <hr className="flex-1 border-gray-300 dark:border-gray-700" />
                        </div>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>
                            Don't have an account ?
                        </span>
                        <Link to='/sign-up' className='text-blue-500'>
                            Sign-Up</Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className='mt-5' color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
