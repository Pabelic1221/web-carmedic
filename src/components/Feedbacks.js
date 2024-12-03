// src/components/Feedbacks.js

import React from 'react';

const Feedbacks = () => {
    const feedbacks = [
        { id: 1, user: 'John Doe', comment: 'Great service!' },
        { id: 2, user: 'Jane Smith', comment: 'Very satisfied with my purchase.' },
    ];

    return (
        <div className="p-4 flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
            <ul className="space-y-2">
                {feedbacks.map(feedback => (
                    <li key={feedback.id} className="p-4 border rounded shadow hover:bg-gray-100">
                        <h2 className="text-xl">{feedback.user}</h2>
                        <p className="text-gray-600">{feedback.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feedbacks;