import React, { useEffect, useState } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2'; // Assuming you are using Chart.js for the graph
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { db } from './firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import moment from 'moment'; // Import moment.js for date handling

// Register the components you will be using
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyUsers = () => {
    const [monthlyData, setMonthlyData] = useState([]); // State to hold monthly user data

    // Fetch monthly user data from Firestore
    const fetchMonthlyUsers = async () => {
        try {
            const usersCollection = collection(db, "users"); // Assuming your collection is named "users"
            const userSnapshot = await getDocs(usersCollection);
            const users = userSnapshot.docs.map(doc => doc.data());

            // Create an array to hold user counts for each month
            const userCounts = Array(12).fill(0); // Initialize counts for each month (January to December)

            // Count users registered in each month
            users.forEach(user => {
                const registrationDate = moment(user.registrationDate); // Assuming you have a registrationDate field
                const month = registrationDate.month(); // Get the month (0-11)
                userCounts[month] += 1; // Increment the count for the corresponding month
            });

            setMonthlyData(userCounts); // Update the state with the monthly user counts
        } catch (error) {
            console.error("Error fetching monthly users:", error);
        }
    };

    useEffect(() => {
        fetchMonthlyUsers(); // Call fetchMonthlyUsers when the component mounts
    }, []);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly Users',
                data: monthlyData, // Use the fetched monthly user counts
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,0.4)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to fill the height
        plugins: {
            legend: {
                position: 'bottom', // Position the legend at the bottom
            },
        },
        layout: {
            padding: {
                bottom: 20, // Add padding at the bottom for the legend
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col flex-grow">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                <FaChartLine className="mr-2 text-3xl text-teal-500" />
                Monthly Users
            </h1>
            <div style={{ height: '400px' }}> {/* Set a specific height for the chart container */}
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MonthlyUsers;