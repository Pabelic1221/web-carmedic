import React from 'react';
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

// Register the components you will be using
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyUsers = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Monthly Users',
                data: [30, 70, 100, 50, 80, 120],
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
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
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