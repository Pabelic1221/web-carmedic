// src/components/Users.js

import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection); 
                const userList = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList); 
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Call the fetch function
    }, []); // Empty dependency array to run once on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.id} className="p-4 border rounded shadow hover:bg-gray-100">
                        <h2 className="text-xl">{user.firstName} {user.lastName}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;