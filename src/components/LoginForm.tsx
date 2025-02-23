"use client"
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill the input fields before proceeding');
            return;
        }
        const res = await signIn('credentials', {
            redirect: false,
            username,
            password,
            callbackUrl: '/',
        });

        if (res?.error) {
            setError('Login failed: ' + res.error);
        } else if (res?.ok) {
            setError('');
            window.location.href = '/';
        }
    };

    return (
        <div className='bg-gray-950 w-full min-h-screen flex items-center justify-center p-6'>
            <form onSubmit={handleSubmit} className='bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-sm'>
                <div className='flex justify-center mb-6'>
                    <div className='bg-gray-800 p-4 rounded-full'>
                        <FaUser className='text-white text-3xl' />
                    </div>
                </div>
                <h1 className='text-white text-3xl font-bold mb-4 text-center'>Login</h1>
                {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
                <div className='mb-4'>
                    <label className='block text-gray-300 font-medium mb-1'>Username</label>
                    <div className='flex items-center border border-gray-700 p-3 rounded-lg bg-gray-800'>
                        <FaUser className='text-gray-500 mr-2' />
                        <input 
                            type='text' 
                            className='w-full bg-transparent outline-none text-white placeholder-gray-500' 
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-300 font-medium mb-1'>Password</label>
                    <div className='flex items-center border border-gray-700 p-3 rounded-lg bg-gray-800'>
                        <FaLock className='text-gray-500 mr-2' />
                        <input 
                            type='password' 
                            className='w-full bg-transparent outline-none text-white placeholder-gray-500' 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm text-gray-400 mb-6'>
                    <div>
                        <input type='checkbox' id='remember' className='mr-2' />
                        <label htmlFor='remember'>Remember me</label>
                    </div>
                    <a href='#' className='text-blue-500 hover:underline'>Forget Password?</a>
                </div>
                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300'>
                    Login
                </button>
                <p className='text-gray-400 text-center mt-6 text-sm'>
                    Don't have an account? <a href='#' className='text-blue-500 hover:underline'>Sign up</a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;