import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Error = () => {
    const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

    // const goHome = () => {
    //     navigate('/'); // Navigate to the home page (or any route you specify)
    // };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-semibold text-red-600">Something Went Wrong!</h1>
                <p className="text-gray-500 mt-4">We couldn't find the page you're looking for.</p>
                <button
                    // onClick={goHome}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    <Link to={'/'}>GO HOME</Link>
                </button>
            </div>
        </div>
    );
};

export default Error;
