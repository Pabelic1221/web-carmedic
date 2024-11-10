// src/components/Shops.js

import React from 'react';

const Shops = () => {
    const shops = [
        { id: 1, name: 'Shop A', location: 'Location A' },
        { id: 2, name: 'Shop B', location: 'Location B' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shops List</h1>
            <ul className="space-y-2">
                {shops.map(shop => (
                    <li key={shop.id} className="p-4 border rounded shadow hover:bg-gray-100">
                        <h2 className="text-xl">{shop.name}</h2>
                        <p className="text-gray-600">{shop.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Shops;