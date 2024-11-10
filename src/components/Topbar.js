import React from 'react';


const Topbar = ({ isAuthenticated, userInfo }) => {
    return (
        <div className="bg-white text-black p-4 flex justify-between items-center shadow h-20">
            <h1 className="text-xl font-bold">Welcome, {userInfo.firstName} {userInfo.lastName}</h1>
        </div>
    );
};

export default Topbar;