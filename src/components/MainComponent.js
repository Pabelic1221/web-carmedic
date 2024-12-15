import React, { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import Shops from './Shops';
import Feedbacks from './Feedbacks';
import Loader from './Loader';
import Auth from './Auth';
import { db } from './firebase';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import './Styles.css';
import Menu from './Menu';

const MainComponent = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', role: '' });
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogout = useCallback(
        (showSuccess = true) => {
            signOut(auth).then(() => {
                localStorage.removeItem('userToken');
                setIsAuthenticated(false);

                if (showSuccess && isAdmin) {
                    Swal.fire({
                        title: 'Logged out!',
                        text: 'You have been logged out successfully.',
                        icon: 'success',
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            }).catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error logging you out. Please try again.',
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: true,
                });
            });
        },
        [isAdmin] // Dependency for useCallback
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserInfo(userData);

                    if (userData.role === 'admin') {
                        setIsAuthenticated(true);
                        setIsAdmin(true);
                    } else {
                        setIsAuthenticated(true);
                        setIsAdmin(false);

                        Swal.fire({
                            title: 'Not Authorized',
                            text: 'You do not have permission to access this application. Logging you out...',
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                        });
                        setTimeout(() => {
                            handleLogout();
                        }, 1500);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setUserInfo({ firstName: '', lastName: '', role: '' });
                setIsAuthenticated(false);
            }

            setTimeout(() => {
                setLoading(false);
            }, 1500);
        });

        return () => unsubscribe();
    }, [handleLogout]);

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Auth setIsAuthenticated={setIsAuthenticated} />;
    }

    const renderPage = () => {
        switch (activePage) {
            case 'Menu':
                return <Menu />;
            case 'Dashboard':
                return <Dashboard />;
            case 'Shops':
                return <Shops />;
            case 'Feedbacks':
                return <Feedbacks />;
            default:
                return <Dashboard />;
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-600">NOT AUTHORIZED</h1>
                    <p className="text-gray-700 mt-4">You do not have permission to access this application.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <Sidebar
                className="sidebar-animate fixed top-0 left-0 w-64 h-screen overflow-y-auto bg-white border-r"
                setActivePage={setActivePage}
                currentPage={activePage}
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />
            <div className="flex flex-col flex-grow h-screen bg-gray-100">
                <Topbar
                    className="topbar-animate fixed top-0 w-full h-16 bg-white border-b"
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    userInfo={userInfo}
                />
                <div className="content-fade h-full overflow-y-auto custom-scrollbar">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
