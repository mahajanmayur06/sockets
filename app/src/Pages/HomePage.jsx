import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const HomePage = () => {
    const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
    const navigate = useNavigate();
    if (localStorage.getItem('userData')) {
        navigate('/chat')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Welcome to Chat App</h1>
                    <p className="text-sm text-gray-500 mt-2">Please login or register to continue.</p>
                </div>

                    {/* Tabs for Login and Register */}
                <div className="flex border-b mb-6">
                    <button
                        className={`flex-1 py-2 transition-all duration-300 ${
                        activeTab === "login"
                            ? "border-b-4 border-blue-500 font-bold text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 transition-all duration-300 ${
                        activeTab === "register"
                            ? "border-b-4 border-green-500 font-bold text-green-600"
                            : "text-gray-500 hover:text-green-600"
                        }`}
                        onClick={() => setActiveTab("register")}
                    >
                        Register
                    </button>
                </div>

                {/* Conditionally render Login or Register Component */}
                {activeTab === "login" && <Login />}
                {activeTab === "register" && <Register />}
            </div>
        </div>
    );
};

export default HomePage;
