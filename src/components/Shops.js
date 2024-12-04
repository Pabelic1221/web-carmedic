// src/components/Shops.js

import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaBoxes } from "react-icons/fa"; // Import FaBoxes
import { db } from "./firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

const Shops = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredShops, setFilteredShops] = useState([]);
    const [shops, setShops] = useState([]); // State to hold shops data
    const dropdownRef = useRef();

    // Fetch shops from Firestore
    useEffect(() => {
        const fetchShops = async () => {
            const shopsCollection = collection(db, "shops"); // Assuming your collection is named "shops"
            const shopSnapshot = await getDocs(shopsCollection);
            const shopList = shopSnapshot.docs.map(doc => ({ 
                shopID: doc.id, // Use shopID from Firestore
                ...doc.data() 
            }));
            setShops(shopList);
        };

        fetchShops();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value; // Capture the input value
        setSearchTerm(value);
        if (value) {
            setFilteredShops(
                shops.filter((shop) =>
                    shop.shopName && shop.shopName.toLowerCase().includes(value.toLowerCase()) // Check if shop.shopName is defined
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
                                key={shop.shopID} // Use shopID as the key
                                onClick={() => handleDropdownClick(shop.shopName)} // Use shopName for dropdown click
                                className="p-2 text-left hover:bg-gray-100 cursor-pointer"
                            >
                                {shop.shopName}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-left">
                    <thead className="bg-white text-lg sticky top-0 z-10">
                        <tr>
                            <th className="border-b p-2 w-1/6">Shop ID</th> {/* Updated header */}
                            <th className="border-b p-2 w-1/3">Shop Name</th>
                            <th className="border-b p-2 w-1/5">Owner</th> {/* Updated to Address */}
                            <th className="border-b p-2 w-1/6 text-center">Rating</th>
                            <th className="border-b p-2 w-1/6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops
                            .filter((shop) =>
                                shop.shopName && shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) // Use searchTerm for filtering
                            )
                            .map((shop, index) => (
                                <tr key={shop.shopID} className="hover:bg-gray-50 text">
                                    <td className="border p-2">{shop.shopID}</td> {/* Display shopID */}
                                    <td className="border p-2">
                                        {shop.shopName} {/* Display shopName */}
                                        <div className="text-gray-500">{shop.address}</div> {/* Display Address */}
                                    </td>
                                    <td className="border p-2 text-center">Owner {index + 1}</td>
                                    <td className="border p-2 text-center">Rating {index + 1}</td> {/* Placeholder for Rating */}
                                    <td className="border p-2 text-center">
                                        <button className="text-blue-500 hover:underline">
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-500 hover:underline ml-2">
                                            <FaTrash />
                                        </button>
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