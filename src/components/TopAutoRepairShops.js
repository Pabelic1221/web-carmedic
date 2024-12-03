import React from 'react';
import { FaTools } from 'react-icons/fa';

const TopAutoRepairShops = () => {
    const shops = [
        { name: "Shop A", address: "123 Main St", rating: 4.5 },
        { name: "Shop B", address: "456 Elm St", rating: 4.0 },
        { name: "Shop C", address: "789 Oak St", rating: 4.8 },
        { name: "Shop D", address: "101 Pine St", rating: 4.2 },
        { name: "Shop E", address: "202 Maple St", rating: 4.1 },
        { name: "Shop F", address: "303 Birch St", rating: 4.6 },
        { name: "Shop G", address: "404 Cedar St", rating: 4.3 },
        { name: "Shop H", address: "505 Spruce St", rating: 4.7 },
        { name: "Shop I", address: "606 Willow St", rating: 4.9 },
        { name: "Shop J", address: "707 Aspen St", rating: 4.4 },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaTools className="mr-2 text-3xl text-green-500" />
                Top Auto Repair Shops
            </h1>
            <div className="overflow-x-auto h-96">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="p-2 text-left w-1/2">Shop</th>
                            <th className="p-2 w-1/5">Rating</th>
                            <th className="p-2 w-1/5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops.map((shop, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="p-2 text-left">
                                    <div className="font-semibold">{shop.name}</div>
                                    <div>{shop.address}</div>
                                </td>
                                <td className="p-2">{shop.rating} ★</td>
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