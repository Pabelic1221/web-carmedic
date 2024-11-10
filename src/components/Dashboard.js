import React from 'react';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Active Sessions</h3>
                <p className="text-2xl font-bold">456</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">New Signups</h3>
                <p className="text-2xl font-bold">78</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Total Revenue</h3>
                <p className="text-2xl font-bold">$12,345</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Pending Orders</h3>
                <p className="text-2xl font-bold">34</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold">Support Tickets</h3>
                <p className="text-2xl font-bold">12</p>
            </div>
        </div>
    );
};

export default Dashboard;