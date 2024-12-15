import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaBoxes } from "react-icons/fa";
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const Shops = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredShops, setFilteredShops] = useState([]);
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef();
    const modalRef = useRef();

    // Fetch shops and reviews from Firestore
    const fetchShopsAndReviews = async () => {
        try {
            const shopsCollection = collection(db, "shops");
            const shopSnapshot = await getDocs(shopsCollection);
            const shopList = shopSnapshot.docs.map(doc => ({
                shopID: doc.id,
                ...doc.data()
            }));

            const reviewsCollection = collection(db, "reviews");
            const reviewSnapshot = await getDocs(reviewsCollection);
            const reviewList = reviewSnapshot.docs.map(doc => ({
                ...doc.data()
            }));

            // Calculate average rating for each shop
            const shopsWithRatings = shopList.map(shop => {
                const shopReviews = reviewList.filter(review => review.shopId === shop.shopID);
                const totalRating = shopReviews.reduce((acc, review) => acc + review.rating, 0);
                const ratingCount = shopReviews.length;
                const averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0; // Calculate average rating

                return {
                    ...shop,
                    rating: averageRating,
                    ratingCount: ratingCount
                };
            });

            setShops(shopsWithRatings);
        } catch (error) {
            console.error("Error fetching shops or reviews:", error);
        }
    };

    useEffect(() => {
        fetchShopsAndReviews(); // Call fetchShopsAndReviews when the component mounts
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

    const handleEditClick = (shop) => {
        setSelectedShop(shop);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedShop) => {
        const shopRef = doc(db, "shops", updatedShop.shopID); // Reference to the shop document
        await updateDoc(shopRef, {
            shopName: updatedShop.shopName,
            address: updatedShop.address,
            owner: updatedShop.owner // Save the owner field
        });
        console.log("Updated Shop:", updatedShop);
        setIsModalOpen(false);

        // Show SweetAlert2 toast notification
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Shop updated successfully!',
            showConfirmButton: false,
            timer: 1500,
            backdrop: false, // No background dim
            timerProgressBar: true // Optional: show a progress bar
        });

        // Refresh the shop list after saving
        fetchShopsAndReviews();
    };

    const handleDelete = async (shopID) => {
        const shopRef = doc(db, "shops", shopID); // Reference to the shop document

        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteDoc(shopRef); // Delete the shop
            Swal.fire(
                'Deleted!',
                'Your shop has been deleted.',
                'success'
            );

            // Refresh the shop list after deletion
            fetchShopsAndReviews();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
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
            <div className="overflow-y-auto flex-grow">
                <table className="min-w-full text-left">
                    <thead className="bg-white text-lg sticky top-0 z-10">
                        <tr>
                            <th className="border-b p-2 w-1/6 text-center">Shop ID</th>
                            <th className="border-b p-2 w-1/3 text-center">Shop Name</th>
                            <th className="border-b p-2 w-1/5 text-center">Owner</th>
                            <th className="border-b p-2 w-1/6 text-center">Rating</th>
                            <th className="border-b p-2 w-1/6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shops
                            .filter((shop) =>
                                shop.shopName && shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((shop) => (
                                <tr key={shop.shopID} className="hover:bg-gray-50 text">
                                    <td className="border p-2">{shop.shopID}</td>
                                    <td className="border p-2">
                                        {shop.shopName}
                                        <div className="text-gray-500">{shop.address}</div>
                                    </td>
                                    <td className="border p-2 text-center">{shop.owner || "N/A"}</td>
                                    <td className="border p-2 text-center">★ {shop.rating || "N/A"}  <span style={{ color: 'gray' }}>({shop.ratingCount})</span></td>
                                    <td className="border p-2 text-center">
                                        <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(shop)}>
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-500 hover:underline ml-2" onClick={() => handleDelete(shop.shopID)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedShop && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={modalRef} className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaEdit className="mr-2 text-blue-500" /> {/* Add the icon here */}
                            Edit Shop
                        </h2>
                        <div className="mb-4">
                            <label className="block mb-1 text-left font-bold text-lg">Shop Name</label>
                            <input
                                type="text"
                                defaultValue={selectedShop.shopName}
                                onChange={(e) => setSelectedShop({ ...selectedShop, shopName: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-left font-bold text-lg">Address</label>
                            < input
                                type="text"
                                defaultValue={selectedShop.address}
                                onChange={(e) => setSelectedShop({ ...selectedShop, address: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div >
                        <div className="mb-4">
                            <label className="block mb-1 text-left font-bold text-lg">Owner</label>
                            <input
                                type="text"
                                defaultValue={selectedShop.owner || ""}
                                onChange={(e) => setSelectedShop({ ...selectedShop, owner: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 text-gray-500 hover:text-gray-700 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSave(selectedShop)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                            >
                                Save
                            </button>
                        </div>
                    </div >
                </div >
            )}
        </div >
    );
};

export default Shops;