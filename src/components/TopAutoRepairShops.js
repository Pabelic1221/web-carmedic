import React, { useEffect, useState } from 'react';
import { FaTools } from 'react-icons/fa';
import { db } from './firebase'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';

const TopAutoRepairShops = () => {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const shopsCollection = collection(db, "shops"); // Assuming your collection is named "shops"
                const shopSnapshot = await getDocs(shopsCollection);
                const shopList = shopSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort the shops by rating in descending order
                const sortedShops = shopList.sort((a, b) => b.rating - a.rating);
                setShops(sortedShops);
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };

        fetchShops();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaTools className="mr-2 text-3xl text-green-500" />
                Top Auto Repair Shops
            </h1>
            <div className="overflow-y-auto h-96">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="p-2 text-left w-1/2">Shop Name</th>
                            <th className="p-2 w-1/5">Rating</th>
                            <th className="p-2 w-1/5">Rating Count</th>
                            <th className="p-2 w-1/5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops.map((shop) => (
                            <tr key={shop.id} className="border-b hover:bg-gray-100">
                                <td className="p-2 text-left">
                                    <div className="font-semibold">{shop.shopName}</div>
                                </td>
                                <td className="p-2">{shop.rating} ★</td>
                                <td className="p-2">{shop.ratingCount} Ratings</td>
                                <td className="p-2">
                                    <button className="bg-blue-500 text-white py-1 px-3 rounded">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopAutoRepairShops;