import React, { useState } from 'react';
// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic can be added later
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-left">Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-left">Current Password</label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="border p-2 w-full rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
                        >
                            <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-left">New Password</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="border p-2 w-full rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
                        >
                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-left">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="border p-2 w-full rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div className="text-left">
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
