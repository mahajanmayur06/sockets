import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        navigate('/chat');
    };

    const login = async () => {
        if (!email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3500/user/login`, {
                params: { email, password }, // Sends query parameters
            });

            // Store user data in localStorage without the password
            if (res.data) {
                console.log(res.data);
                const user = res.data;
                localStorage.setItem("userData", JSON.stringify(user));

                setMessage("Login successful!");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
            console.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl text-center text-gray-800">Login</h2>
            {message && <p className="text-green-500 text-center">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
