import React, { useState, useEffect } from 'react';
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
        // Simulate fetching user data
        const initialProfileData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '12345678901',
            gender: 'Male',
            role: 'User ',
        };

        setProfileData(initialProfileData);
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

    return (
        <div className="flex flex-col bg-blue-900 text-white p-4 rounded-md h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Profile</h2>
                <button
                    onClick={handleEditToggle}
                    className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition duration-200"
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
                    <label className="mt-4 bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition duration-200">
                        Upload Profile Picture
                        <input
                            type="file"
                            onChange={handleProductImageChange}
                            accept=".jpg, .jpeg, .png"
                            className="hidden"
                        />
                    </label>
                </div>
                <div className="col-span-2">
                    <div className="mb-4">
                        <label className="block text-md font-medium">First Name</label>
                        <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-blue-700 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium">Last Name</label>
                        <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-blue-700 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium">Email</label>
                        <input
                            type="email"
                            value={profileData.email}
                            className="w-full p-2 rounded-md text-white border border-transparent bg-blue-700"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium">Gender</label>
                        <input
                            type="text"
                            value={profileData.gender}
                            className="w-full p-2 rounded-md text-white border border-transparent bg-blue-700"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium">Phone Number</label>
                        <input
                            type="text"
                            value={profileData.phoneNumber}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            className={`w-full p-2 rounded-md text-white border bg-blue-700 ${editing ? 'border-green-500' : 'border-transparent'}`}
                            readOnly={!editing}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium">Role</label>
                        <input
                            type="text"
                            value={profileData.role ? profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1) : 'N/A'}
                            className="w-full p-2 rounded-md text-white border border-transparent bg-blue-700"
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {editing && (
                <button
                    onClick={() => alert('Save functionality removed')}
                    className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default MyProfile;