import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { FaDownload, FaTrash } from 'react-icons/fa';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Logs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 15;

    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Simulate setting user role
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, []);

    const handleClearLogs = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Prompt for passkey confirmation
                Swal.fire({
                    title: 'Enter Passkey',
                    input: 'password',
                    inputPlaceholder: 'Enter passkey to confirm',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then((passkeyResult) => {
                    if (passkeyResult.isConfirmed && passkeyResult.value === 'WJnJ,`482g<UL\\1Vc>C%') {
                        // Passkey is correct, proceed with deletion
                        // Clear logs logic here
                        Swal.fire('Deleted!', 'Logs have been deleted.', 'success');
                    } else if (passkeyResult.isConfirmed) {
                        // Invalid passkey
                        Swal.fire({
                            icon: 'error',
                            title: 'Incorrect Passkey',
                            text: 'The passkey you entered is incorrect.',
                        });
                    }
                });
            }
        });
    };

    const handleExportLogs = () => {
        // Simulated log data
        const logs = [
            { username: 'user1', action: 'Login', timestamp: new Date() },
            { username: 'user2', action: 'Logout', timestamp: new Date() },
            // Add more simulated logs here
        ];

        const data = logs.map((log) => ({
            username: log.username,
            action: log.action,
            timestamp: moment(log.timestamp).format('MMMM D, YYYY h:mm:ss A'),
        }));

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Logs');

        // Define the columns
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 25 },
            { header: 'Action', key: 'action', width: 35 },
            { header: 'Timestamp', key: 'timestamp', width: 45 },
        ];

        // Add the data
        data.forEach(log => worksheet.addRow(log));

        // Apply styles to the header and increase its height
        worksheet.getRow(1).height = 30;
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFF0' },
            };
        });

        // Apply styles to data rows
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });

            // Alternate row color
            if (rowNumber % 2 === 0) {
                row.eachCell((cell) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFEEEEEE' },
                    };
                });
            }
        });

        // Save the workbook to file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'logs.xlsx');
        });
    };

    // Simulated logs for rendering
    const logs = [
        { username: 'user1', action: 'Login', timestamp: new Date() },
        { username: 'user2', action: 'Logout', timestamp: new Date() },
    ];

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
    const totalPages = Math.ceil(logs.length / logsPerPage);

    return (
        <div className="p-4 flex flex-col h-full bg-white rounded">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">Audit Logs</h2>
                <div className="flex justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 transition-colors duration-300 text-white font-bold p-2 rounded flex justify-center items-center"
                        title="Export Logs"
                        onClick={handleExportLogs}
                    >
                        <FaDownload className="mr-2" size={30} />
                        Export
                    </button>
                    {userRole !== 'admin' && (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded flex justify-center items-center ml-4"
                            title="Clear Logs"
                            onClick={handleClearLogs}
                        >
                            <FaTrash className="mr-2" size={30} />
                            Delete
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap mb-4 text-lg">
                <div className="w-full md:w-1/3 mb-2 md:mb-0">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search logs..."
                        className="w-full py-2 pl-3 text-gray-700 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                </div>
                <div className="w-full md:w-1/6 mb-2 md:mb-0 md:ml-4">
                    <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="w-full py-2 pl-3 text-gray-700 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        <option value="all">All</option>
                        <option value="username"> Username</option>
                        <option value="action">Action</option>
                    </select>
                </div>
                <div className="w-full md:w-1/3 mb-2 md:mb-0 md:ml-4">
                    <div className="flex justify-between">
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-1/2 py-2 pl-3 text-gray-700 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 mr-2"
                        />
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-1/2 py-2 pl-3 text-gray-700 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-auto flex-grow custom-scrollbar">
                <table className="min-w-full text-black">
                    <thead className="bg-[#022a5e] text-white text-lg sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2 w-1/5">Username</th>
                            <th className="px-4 py-2 w-1/3">Action</th>
                            <th className="px-4 py-2 w-1/3">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentLogs.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    <p className="text-lg text-gray-600">No logs available.</p>
                                </td>
                            </tr>
                        ) : (
                            currentLogs.map((log, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {log.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {moment(log.timestamp).format('MMMM D, YYYY h:mm:ss A')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-4 text-xl font-semibold">
                {totalPages > 0 && (
                    <>
                        <button
                            onClick={() => setCurrentPage(1)}
                            className={`mx-2 px-4 py-2 rounded transition duration-300 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'}`}
                        >
                            1
                        </button>
                        {currentPage > 3 && <span className="mx-2">...</span>}

                        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                            const pageNum = Math.max(2, currentPage - 2) + index;
                            if (pageNum > totalPages - 1) return null;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`mx-2 px-4 py-2 rounded transition duration-300 ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {currentPage < totalPages - 2 && <span className="mx-2">...</span>}

                        {totalPages > 1 && (
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className={`mx-2 px-4 py-2 rounded transition duration-300 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'}`}
                            >
                                {totalPages}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Logs;