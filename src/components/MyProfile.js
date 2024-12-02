import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Ensure you import auth and db
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Import SweetAlert2
import imagePlaceholder from '../img/logo/placeholder-image.png';

const MyProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        role: '',
    });

    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser  = auth.currentUser ; // Get the current user
            if (currentUser ) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    setProfileData(userDoc.data()); // Set profile data from Firestore
                } else {
                    console.error("User  document does not exist");
                }
            }
        };

        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setEditing(prev => !prev);
    };

    const handleProductImageChange = (e) => {
        const image = e.target.files[0];
        if (!image) return; // Ensure an image is selected
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfilePicturePreview(event.target.result);
        };
        reader.readAsDataURL(image);
    };

    const handleSaveChanges = async () => {
        const currentUser  = auth.currentUser ;
        if (currentUser ) {
            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                await updateDoc(userDocRef, profileData); // Update user data in Firestore
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setEditing(false); // Exit editing mode after saving
            } catch (error) {
                console.error("Error updating profile:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update profile. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    return (
        <div className="flex flex-col bg-white p-4 rounded-md h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Profile</h2>
                <button
                    onClick={handleEditToggle}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-800 transition duration-200"
                >
                    {editing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center">
                    {profilePicturePreview ? (
                        <img
                            src={profilePicturePreview}
                            alt="Profile"
                            className="w-72 h-72 rounded object-cover border-2 border-black shadow-lg"
                        />
                    ) : (
                        <img
                            src={imagePlaceholder}
                            alt="Profile"
                            className="w-72 h-72 rounded object-cover"
                        />
                    )}
                    <label className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-800 transition duration-200">
                        Upload Profile Picture
                        <input
                            type="file"
                            onChange={handleProductImageChange}
                            accept=".jpg, .jpeg, .png"
                            className="hidden"
                        />
                    </label>
                </div>
                <div className="col-span-2 text-left">
                    <div className="mb-4">
                        <label className="block text-md font-medium">First Name</label>
                        <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-gray-500 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium">Last Name</label>
                        <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-gray-500 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium">Email</label>
                        <input
                            type="email"
                            value={profileData.email}
                            className="w-full p-2 rounded-md text-white border bg-gray-500"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium">Phone Number</label>
                        <input
                            type="text"
                            value={profileData.phoneNumber}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-gray-500 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium">Gender</label>
                        <input
                            type="text"
                            value={profileData.gender}
                            onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-gray-500 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-md font-medium">Role</label>
                        <input
                            type="text"
                            value={profileData.role.toUpperCase()} // Convert role to uppercase
                            onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-gray-500 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>

                    {editing && (
                        <button
                            onClick={handleSaveChanges}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-800 transition duration-200"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;