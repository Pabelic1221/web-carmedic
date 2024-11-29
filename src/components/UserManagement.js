import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
    // Sample user data
    const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', address: '123 Main St', email: 'john@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', address: '456 Elm St', email: 'jane@example.com' },
        { id: 3, firstName: 'Sam', lastName: 'Wilson', address: '789 Oak St', email: 'sam@example.com' },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold mb-4 text-left">User Management</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Messages</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 text-left">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FaEye />
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button className="text-green-500 hover:text-green-700 mx-2">
                                    <FaEdit />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
