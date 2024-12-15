import React, { useEffect, useState } from 'react';
import { FaStore } from 'react-icons/fa';
import { db } from './firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

const RegisteredShops = () => {
    const [totalShops, setTotalShops] = useState(0); // State to hold the total number of registered shops

    // Fetch total registered shops from Firestore
    const fetchTotalShops = async () => {
        try {
            const shopsCollection = collection(db, "shops"); // Assuming your collection is named "shops"
            const shopSnapshot = await getDocs(shopsCollection);
            setTotalShops(shopSnapshot.docs.length); // Set the total number of shops
        } catch (error) {
            console.error("Error fetching total shops:", error);
        }
    };

    useEffect(() => {
        fetchTotalShops(); // Call fetchTotalShops when the component mounts
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaStore className="mr-2 text-3xl text-green-500" />
                Registered Shops
            </h1>
            <p className="text-2xl font-bold text-center">{totalShops}</p> {/* Display the total number of shops */}
        </div>
    );
};

export default RegisteredShops;