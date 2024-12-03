import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

const UsersRegistered = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaUserFriends className="mr-2 text-3xl text-blue-500" />
                Users Registered
            </h1>
            <p className="text-2xl font-bold text-center">456</p>
        </div>
    );
};

export default UsersRegistered;