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
        <div className="mx-4 md:mx-20 lg:mx-40 my-6 md:my-10 lg:my-12 pt-3 pb-5 glass-section border border-[#2f4627] rounded-lg shadow-lg">
            <div className="p-4 text-xl md:text-2xl underline font-serif text-[#2f4627] text-center font-bold">
                Login/SignUp To Get Your Details.
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 py-8 gap-6 md:gap-10 lg:gap-12">
                <img
                    className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg object-cover"
                    alt="loginlogo"
                    src="./loginlogo.jpg"
                />

                <div className="w-full flex flex-col items-center lg:w-1/2 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-400 p-6 md:px-16">
                    <label htmlFor="username" className="block text-sm self-start font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4627]"
                    />

                    <label htmlFor="password" className="block text-sm self-start font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4627]"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-[70%] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don&apos;t have an account?
                        <a href="/register" className="text-blue-600 hover:underline ml-1">Register here</a>
                    </p>
                </div>
            </div>
        </div>


    )
}

export default Login