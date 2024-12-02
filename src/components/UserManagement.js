import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { db } from './firebase'; // Adjust the import path as needed
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const UserManagement = () => {
    const [users, setUsers] = useState([]); // State for storing users
    const [formData, setFormData] = useState({ firstName: '', lastName: '', address: '', email: '' }); // Form data
    const [isEditing, setIsEditing] = useState(false); // State to check if editing
    const [currentUserId, setCurrentUserId] = useState(null); // Current user ID for editing
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [userIdToDelete, setUserIdToDelete] = useState(null); // User ID to delete

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from Firestore
    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, 'users'); // Firestore collection
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersList); // Update users state
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Function to create a new user
    const handleCreateUser  = async () => {
        try {
            await addDoc(collection(db, 'users'), formData);
            setFormData({ firstName: '', lastName: '', address: '', email: '' }); // Clear form
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Function to edit a user
    const handleEditUser  = (user) => {
        setFormData({ firstName: user.firstName, lastName: user.lastName, address: user.address, email: user.email });
        setIsEditing(true);
        setCurrentUserId(user.id);
    };

    // Function to update a user
    const handleUpdateUser  = async () => {
        try {
            const userDoc = doc(db, 'users', currentUserId);
            await updateDoc(userDoc, formData);
            setFormData({ firstName: '', lastName: '', address: '', email: '' }); // Clear form
            setIsEditing(false);
            setCurrentUserId(null);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Function to delete a user
    const handleDeleteUser  = async () => {
        try {
            const userDoc = doc(db, 'users', userIdToDelete);
            await deleteDoc(userDoc);
            setShowModal(false); // Close modal
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            handleUpdateUser ();
        } else {
            handleCreateUser ();
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold mb-4 text-left">User  Management</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData , address: e.target.value })}
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border p-2 rounded mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {isEditing ? 'Update User' : 'Add User'}
                </button>
            </form>
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
                                <button className="text-green-500 hover:text-green-700 mx-2" onClick={() => handleEditUser (user)}>
                                    <FaEdit />
                                </button>
                                <button className="text-red-500 hover:text-red-700" onClick={() => { setUserIdToDelete(user.id); setShowModal(true); }}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="text-lg">Are you sure you want to delete this user?</p>
                        <div className="mt-4">
                            <button onClick={handleDeleteUser } 
                                className="bg-red-500 text-white p-2 rounded mr-2">Yes</button>
                            <button onClick={() => setShowModal(false)} 
                                className="bg-gray-300 text-black p-2 rounded">No</button>
                     </div>
                    </div>
               </div>
            )}          
        </div>
    );
};

export default UserManagement;