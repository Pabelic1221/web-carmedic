import React, { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { db } from './firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

const UsersRegistered = () => {
    const [totalUsers, setTotalUsers] = useState(0); // State to hold the total number of registered users

    // Fetch total registered users from Firestore
    const fetchTotalUsers = async () => {
        try {
            const usersCollection = collection(db, "users"); // Assuming your collection is named "users"
            const userSnapshot = await getDocs(usersCollection);
            setTotalUsers(userSnapshot.docs.length); // Set the total number of users
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    };

    useEffect(() => {
        fetchTotalUsers(); // Call fetchTotalUsers when the component mounts
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaUserFriends className="mr-2 text-3xl text-blue-500" />
                Users Registered
            </h1>
            <p className="text-2xl font-bold text-center">{totalUsers}</p> {/* Display the total number of users */}
        </div>
    );
};

export default UsersRegistered;