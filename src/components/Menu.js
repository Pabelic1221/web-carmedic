import React, { useState, useEffect } from 'react';
import MyProfile from './MyProfile';
import Logs from './Logs';

const Menu = ({ setIsAuthenticated, handleLogout }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Simulate getting the user role from local storage
        const role = 'admin'; // Set to 'admin' for testing
        setUserRole(role);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex h-full overflow-hidden p-4">
            <div className="w-1/3 mr-4 bg-blue-900 text-white h-full flex flex-col rounded shadow-lg">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Menu</h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => handleTabChange('profile')}
                                className={`w-full text-left p-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                            >
                                My Profile
                            </button>
                        </li>
                        {userRole === 'admin' && ( // Only show for admin role
                            <>
                                <li>
                                    <button
                                        onClick={() => handleTabChange('management')}
                                        className={`w-full text-left p-2 rounded-md ${activeTab === 'management' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                                    >
                                        User Management
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleTabChange('logs')}
                                        className={`w-full text-left p-2 rounded-md ${activeTab === 'logs' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                                    >
                                        Logs
                                    </button>
                                </li>
                            </>
                        )}
                        <li>
                            <button
                                onClick={() => handleTabChange('changePassword')}
                                className={`w-full text-left p-2 rounded-md ${activeTab === 'changePassword' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                            >
                                Change Password
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full h-full flex flex-col overflow-y-auto">
                <>
                    {activeTab === 'profile' && <MyProfile setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />}
                    {activeTab === 'logs' && <Logs />}

                </>
            </div>
        </div>
    );
};

export default Menu;