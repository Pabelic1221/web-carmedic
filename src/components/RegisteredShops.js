import React from 'react';
import { FaStore } from 'react-icons/fa';

const RegisteredShops = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaStore className="mr-2 text-3xl text-green-500" />
                Registered Shops
            </h1>
            <p className="text-2xl font-bold text-center">1,234</p>
        </div>
    );
};

export default RegisteredShops;