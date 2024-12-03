// src/components/Users.js

import React from 'react';

const Users = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    return (
        <div className="p-4 flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.id} className="p-4 border rounded shadow hover:bg-gray-100">
                        <h2 className="text-xl">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;