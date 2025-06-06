"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleLogin = async (e) => {
        e.preventDefault();
        window.alert("Logging in...");
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push(`/dashboard/${data.username}?id=${data.uid}`);
        } else {
            alert(data.message);
        }
    };



    return (

        <div className='mx-40 my-12 pt-3 pb-5 bg-gray-100 border border-[#2f4627] rounded-lg shadow-lg'>

            <div className="p-5 text-2xl underline font-serif text-[#2f4627] text-center font-bold">Login/SignUp To Get Your Details.</div>
            <div className='flex items-center justify-center py-10 gap-12'>

                <img className='w-[25%] rounded-lg' src='.\loginlogo.jpg'></img>
                <div className='border-l-2 p-10'>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" id="username" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required className="w-full px-4 py-2 border border-gray-300 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4627]" />
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="w-full px-4 py-2 border border-gray-300 mb-5  rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4627]" required />
                    <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
                    <p className="text-center text-sm text-gray-600 mb-2">
                        Don't have an account?
                        <a href="/register" className="text-blue-600 hover:underline"> Register here</a>
                    </p>
                </div>
            </div>
        </div>


    )
}

export default Login