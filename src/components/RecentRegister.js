import React, { useEffect, useState } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';
import { db } from './firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

const RecentRegister = () => {
    const [recentCount, setRecentCount] = useState(0);

    // Fetch count of users registered today from Firestore
    const fetchRecentRegistrations = async () => {
        try {
            const usersCollection = collection(db, "users");
            const userSnapshot = await getDocs(usersCollection);
            const today = moment().startOf('day');

            // Filter users registered today
            const recentUsers = userSnapshot.docs.filter(doc => {
                const userData = doc.data();
                const registrationDate = moment(userData.registrationDate); 
                return registrationDate.isSame(today, 'day'); 
            });

            setRecentCount(recentUsers.length);
        } catch (error) {
            console.error("Error fetching recent registrations:", error);
        }
    };

    useEffect(() => {
        fetchRecentRegistrations(); 
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaRegNewspaper className="mr-2 text-3xl text-orange-500" />
                Recent Registrations
            </h1>
            <p className="text-2xl font-bold text-center">{recentCount}</p> {/* Display the count of recent registrations */}
        </div>
    );
};

export default RecentRegister;