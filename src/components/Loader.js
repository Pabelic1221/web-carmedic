import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <HashLoader color="#36d7b7" size={60} />
        </div>
    );
};

export default Loader;