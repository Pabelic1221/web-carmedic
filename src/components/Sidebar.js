import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaHome, FaStore, FaUsers, FaComments, FaCubes } from 'react-icons/fa'; // Import the necessary icons
import './SidebarIndicator.css'; // Import the CSS file

const Sidebar = ({ setActivePage, currentPage, isAuthenticated, handleLogout }) => {
    // Define the list of pages with corresponding icons
    const pages = [
        { name: 'Menu', key: 'Menu', icon: <FaCubes size={25} className="text-white" /> },
        { name: 'Dashboard', key: 'Dashboard', icon: <FaHome size={25} className="text-white" /> },
        { name: 'Shops', key: 'Shops', icon: <FaStore size={25} className="text-white" /> },
        { name: 'Users', key: 'Users', icon: <FaUsers size={25} className="text-white" /> },
        { name: 'Feedbacks', key: 'Feedbacks', icon: <FaComments size={25} className="text-white" /> }
    ];

    const [indicatorPosition, setIndicatorPosition] = useState({ top: 0, height: 0 });

    useEffect(() => {
        const activeElement = document.querySelector(`li[data-key="${currentPage}"]`);
        if (activeElement) {
            const { offsetTop, offsetHeight } = activeElement;
            const indicatorHeight = 40; // Height of the indicator
            const topPosition = offsetTop + (offsetHeight - indicatorHeight) / 2; // Centering the indicator
            setIndicatorPosition({ top: topPosition, height: indicatorHeight });
        }
    }, [currentPage]);

    return (
        <div className="min-h-screen flex flex-col bg-black text-white transition-all duration-300 w-60">
            <h2 className="text-2xl font-bold text-center px-4 py-6">CarMedic</h2>
            <ul className="flex-grow relative">
                {isAuthenticated ? (
                    pages.map(page => (
                        <li
                            key={page.key}
                            data-key={page.key} // Add data attribute to identify the active tab
                            className={`relative px-4 py-6 text-xl transition duration-300 cursor-pointer ${currentPage === page.key ? 'bg-gray-700' : 'hover:bg-gray-900'}`}
                            onClick={() => setActivePage(page.key)} // Set the active page directly on li
                        >
                            <div className="flex items-center gap-x-4">
                                {page.icon} <span>{page.name}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="px-4 py-6 text-xl">Please log in to see the options.</li>
                )}
                <div
                    className="indicator"
                    style={{
                        top: indicatorPosition.top,
                        height: indicatorPosition.height,
                    }}
                />
            </ul>
            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center p-2 item bg-white text-black hover:bg-gray-300 transition duration-200 font-semibold text-xl m-4 gap-x-2 rounded"
                >
                    <FaSignOutAlt className="items-center" size={30} />
                    Logout
                </button>
            )}
        </div>
    );
};

export default Sidebar;