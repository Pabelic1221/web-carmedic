import React from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const RecentRegister = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaRegNewspaper className="mr-2 text-3xl text-orange-500" />
                Recent Registrations
            </h1>
            <p className="text-2xl font-bold text-center">78</p>
        </div>
    );
};

export default RecentRegister;