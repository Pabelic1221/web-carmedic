import React from 'react';
import RegisteredShops from './RegisteredShops';
import UsersRegistered from './UsersRegistered';
import RecentRegister from './RecentRegister';
import TopAutoRepairShops from './TopAutoRepairShops';
import MonthlyUsers from './MonthlyUsers';

const Dashboard = () => {
    return (
        <div className="flex flex-col h-full p-4 space-y-4">
            {/* Top section with 3 components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                <div className="md:col-span-1 h-full">
                    <RegisteredShops />
                </div>
                <div className="md:col-span-1 h-full">
                    <UsersRegistered />
                </div>
                <div className="md:col-span-1 h-full">
                    <RecentRegister />
                </div>
            </div>

            {/* Bottom section with 2 components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1 h-full">
                    <TopAutoRepairShops />
                </div>
                <div className="md:col-span-1 h-full">
                    <MonthlyUsers />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;