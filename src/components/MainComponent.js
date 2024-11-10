import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import Shops from './Shops';
import Users from './Users';
import Feedbacks from './Feedbacks';
import Loader from './Loader';
import Auth from './Auth';
import { db } from './firebase';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import './Styles.css';

const MainComponent = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', role: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserInfo(userDoc.data());
                    setIsAuthenticated(true);
                } else {
                    // User document does not exist
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
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Logging out...',
            html: 'Please wait while we log you out.',
            didOpen: () => {
                Swal.showLoading();
            },
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        setTimeout(() => {
            signOut(auth).then(() => {
                localStorage.removeItem('userToken');
                setIsAuthenticated(false);
                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been logged out successfully.',
                    icon: 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }).catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error logging you out. Please try again.',
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: true,
                });
            });
        }, 1500);
    };

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Auth setIsAuthenticated={setIsAuthenticated} />; // Render Auth component if not authenticated
    }



    const renderPage = () => {
        switch (activePage) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Shops':
                return <Shops />;
            case 'Users':
                return <Users />;
            case 'Feedbacks':
                return <Feedbacks />;
            default:
                return <Dashboard />;
        }
    };

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
                <div className="content-fade overflow-y-auto p-4 custom-scrollbar">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

export default MainComponent;