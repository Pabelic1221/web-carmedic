// src/components/Shops.js

import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaBoxes } from "react-icons/fa"; // Import FaBoxes

const Shops = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredShops, setFilteredShops] = useState([]);
    const dropdownRef = useRef();

    const shops = [
        { id: 1, name: "Shop A", address: "Address A", owner: "Owner A", rating: 4.5 },
        { id: 2, name: "Shop B", address: "Address B", owner: "Owner B", rating: 4.0 },
        { id: 3, name: "Shop C", address: "Address C", owner: "Owner C", rating: 4.8 },
        { id: 4, name: "Shop D", address: "Address D", owner: "Owner D", rating: 3.9 },
        { id: 5, name: "Shop E", address: "Address E", owner: "Owner E", rating: 5.0 },
        { id: 6, name: "Shop F", address: "Address F", owner: "Owner F", rating: 2.5 },
        { id: 7, name: "Shop G", address: "Address G", owner: "Owner G", rating: 3.8 },
        { id: 8, name: "Shop H", address: "Address H", owner: "Owner H", rating: 4.2 },
        { id: 9, name: "Shop I", address: "Address I", owner: "Owner I", rating: 4.1 },
        { id: 10, name: "Shop J", address: "Address J", owner: "Owner J", rating: 3.7 },
        { id: 11, name: "Shop K", address: "Address K", owner: "Owner K", rating: 4.3 },
        { id: 12, name: "Shop L", address: "Address L", owner: "Owner L", rating: 4.6 },
        { id: 13, name: "Shop M", address: "Address M", owner: "Owner M", rating: 3.5 },
        { id: 14, name: "Shop N", address: "Address N", owner: "Owner N", rating: 4.9 },
        { id: 15, name: "Shop O", address: "Address O", owner: "Owner O", rating: 2.0 },
        { id: 16, name: "Shop P", address: "Address P", owner: "Owner P", rating: 3.3 },
        { id: 17, name: "Shop Q", address: "Address Q", owner: "Owner Q", rating: 5.0 },
        { id: 18, name: "Shop R", address: "Address R", owner: "Owner R", rating: 4.4 },
        { id: 19, name: "Shop S", address: "Address S", owner: "Owner S", rating: 3.6 },
        { id: 20, name: "Shop T", address: "Address T", owner: "Owner T", rating: 4.7 },
    ];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            setFilteredShops(
                shops.filter((shop) =>
                    shop.name.toLowerCase().includes(value.toLowerCase())
                )
            );
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    };

    const handleDropdownClick = (shopName) => {
        setSearchTerm(shopName);
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="p-4 h-full flex flex-col">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaBoxes className="mr-2 text-3xl text-red-500" />
                Shops List
            </h1>
            <div className="mb-4 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search shops..."
                    className="w-full p-2 border rounded shadow"
                />
                {dropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute bg-white border rounded shadow mt-2 w-full z-20"
                    >
                        {filteredShops.map((shop) => (
                            <div
                                key={shop.id}
                                onClick={() => handleDropdownClick(shop.name)}
                                className="p-2 text-left hover:bg-gray-100 cursor-pointer"
                            >
                                {shop.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-left">
                    <thead className="bg-white text-lg sticky top-0 z-10">
                        <tr>
                            <th className="border-b p-2 w-1/6">ID</th>
                            <th className="border-b p-2 w-1/3">Shop Name</th>
                            <th className="border-b p-2 w-1/5">Owner Name</th>
                            <th className="border-b p-2 w-1/6 text-center">Rating</th>
                            <th className="border-b p-2 w-1/6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops
                            .filter((shop) =>
                                shop.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((shop) => (
                                <tr key={shop.id} className="hover:bg-gray-50 text">
                                    <td className="border p-2">{shop.id}</td>
                                    <td className="border p-2">
                                        {shop.name}
                                        <div className="text-gray-500 text-sm">{shop.address}</div>
                                    </td>
                                    <td className="border p-2">{shop.owner}</td>
                                    <td className="border p-2 text-center">{shop.rating.toFixed(1)}⭐</td>
                                    <td className="border p-2 text-center">
                                        <div className="flex justify-center space-x-4">
                                            <button className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
                                                <FaEdit size={20} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 flex items-center justify-center">
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Shops;