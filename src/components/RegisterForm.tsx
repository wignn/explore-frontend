"use client"
import { register } from '@/lib/action/auth';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!email || !username || !password) {
                setError('Please fill all input fields before proceeding');
                return;
            }
            const response = await register({ email, username, password });
            if (response?.success) {
                setSuccess('Registration successful!');
                setError('');
            } else {
                setError('Registration failed. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
            setSuccess('');
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
                <h1 className='text-white text-3xl font-bold mb-4 text-center'>Register</h1>
                {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
                {success && <p className='text-green-500 text-center mb-4'>{success}</p>}
                <div className='mb-4'>
                    <label className='block text-gray-300 font-medium mb-1'>Email</label>
                    <div className='flex items-center border border-gray-700 p-3 rounded-lg bg-gray-800'>
                        <FaEnvelope className='text-gray-500 mr-2' />
                        <input 
                            type='email' 
                            className='w-full bg-transparent outline-none text-white placeholder-gray-500' 
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
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
                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300'>
                    Register
                </button>
                <p className='text-gray-400 text-center mt-6 text-sm'>
                    Already have an account? <a href='#' className='text-blue-500 hover:underline'>Login</a>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
