import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, db } from './firebase'; // Adjust the import path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Import SweetAlert2
import sideImage from '../img/Auth/cover-image.png';
import Loader from './Loader';

const Auth = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        username: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        secretPasskey: '',
    });
    const [resetFormData, setResetFormData] = useState({
        email: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasskey, setShowPasskey] = useState(false);
    const [fade, setFade] = useState(true);
    const [loading, setLoading] = useState(false);

    const predefinedPasskey = "HeETxG_cFKRKM9}hob@r%a3`FHP$&1"; // Set the passkey

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const togglePasskeyVisibility = () => setShowPasskey(!showPasskey);

    const showAlert = (title, icon) => {
        Swal.fire({
            position: 'top-end',
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 1500,
            backdrop: false,
        });
    };

    const showLoading = () => {
        Swal.fire({
            title: 'Processing...',
            html: 'Please wait while we process your request.',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false,
        });
    };

    const validateEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const validatePassword = (password) => /^.{8,15}$/.test(password); // 8 to 15 characters

    const handleRegister = async (e) => {
        e.preventDefault();
        showLoading(); // Show loading modal

        const { username, password, email, firstName, lastName, phoneNumber, secretPasskey } = formData;

        // Check if email or username is already in use in the "users" collection
        const emailRef = doc(db, "users", email);
        const usernameRef = doc(db, "users", username);

        try {
            const emailDoc = await getDoc(emailRef);
            const usernameDoc = await getDoc(usernameRef);

            if (emailDoc.exists()) {
                showAlert("Email is already in use!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            if (usernameDoc.exists()) {
                showAlert("Username is already in use!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            if (password !== formData.confirmPassword) {
                showAlert("Passwords do not match!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Invalid email format!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            if (!validatePassword(password)) {
                showAlert("Password must be 8-15 characters long!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            if (secretPasskey !== predefinedPasskey) {
                showAlert("Invalid secret passkey!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username,
                firstName,
                lastName,
                phoneNumber,
                email,
                role: "admin", // Set role to "admin"
            });

            // Clear form fields
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                secretPasskey: '',
            });

            showAlert("Registration successful! Please login.", "success");

            // Transition to the login form
            setTimeout(() => {
                Swal.close(); // Close the loading modal
                switchForm('login'); // Show the login form
            }, 1500);

        } catch (error) {
            console.error("Error registering user:", error);
            showAlert(error.message, "error");
        } finally {
            setTimeout(() => {
                Swal.close(); // Close loading modal after processing
            }, 1500);
        }
    };



    const handleLogin = async (e) => {
        e.preventDefault();
        showLoading(); // Show loading modal

        const { email, password } = formData;

        try {
            // Attempt to sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            const token = await auth.currentUser.getIdToken();
            localStorage.setItem('userToken', token);

            // Fetch user data to check the role
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Show login success only for admin users
                if (userData.role === "admin") {
                    showAlert("Login successful!", "success");
                }

                setIsAuthenticated(true); // Mark as authenticated
            } else {
                throw new Error("User data not found!");
            }

            // Set loading to true before updating the authentication state
            setLoading(true);
        } catch (error) {
            console.error("Error logging in:", error);
            showAlert(error.message, "error");
        } finally {
            setTimeout(() => {
                Swal.close(); // Close loading modal after processing
                setLoading(false); // Stop loading after processing
            }, 1500);
        }
    };


    // Render loading or authentication forms
    if (loading) {
        return <Loader />;
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        showLoading(); // Show loading modal

        try {
            if (!validateEmail(resetFormData.email)) {
                showAlert("Invalid email format!", "error");
                Swal.close(); // Close loading modal
                return;
            }

            // Attempt to send password reset email
            await sendPasswordResetEmail(auth, resetFormData.email);
            showAlert("Password reset email sent! Please check your inbox.", "success");

            // Transition to the login form with fade effect
            setResetFormData({ email: '' });
            switchForm('login');  // Trigger the login form transition

        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // Show a successful alert even if the email is not found
                showAlert("Password reset email sent! Please check your inbox.", "success");
                setResetFormData({ email: '' });
                switchForm('login');  // Trigger the login form transition
            } else if (error.code === 'auth/invalid-email') {
                showAlert("Invalid email format!", "error");
            } else {
                showAlert("Failed to send password reset email. Try again later.", "error");
                console.error("Error sending password reset email:", error);
            }
        } finally {
            setTimeout(() => {
                Swal.close(); // Close loading modal after processing
            }, 1500);
        }
    };

    const switchForm = (formType) => {
        setFade(false); // Start fade out
        setTimeout(() => {
            if (formType === 'login') {
                setIsLogin(true);
                setIsResetPassword(false);
            } else if (formType === 'register') {
                setIsLogin(false);
                setIsResetPassword(false);
            } else if (formType === 'reset') {
                setIsResetPassword(true);
                setIsLogin(false);
            }
            setFade(true); // Start fade in
        }, 300); // Match this duration with your fade-out duration
    };

    return (
        <div className="flex items-center justify-center h-full" style={{ backgroundColor: '#f0f0f0', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div className="flex bg-gray-100 rounded-lg shadow-2xl w-[950px] h-[500px]">
                <div className="hidden md:block md:w-1/2 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: `url(${sideImage})`, width: '550px', height: '500px' }}></div>
                <div className={`p-8 w-full md:w-1/2 flex flex-col justify-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl font-bold text-center mb-6">{isResetPassword ? 'Reset Password' : isLogin ? 'Login' : 'Register'}</h2>

                    {isResetPassword ? (
                        <form onSubmit={handleResetPassword}>
                            <input type="email" name="email" placeholder="Email" value={resetFormData.email} onChange={(e) => setResetFormData({ ...resetFormData, [e.target.name]: e.target.value })} required className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="submit" className="w-full mt-4 p-2 text-white rounded bg-black hover:bg-gray-800 transition-colors duration-200 text-xl font-semibold">
                                Reset Password
                            </button>
                            <p className="mt-4 text-center cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200" onClick={() => switchForm('login')}>
                                Back to Login
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={isLogin ? handleLogin : handleRegister}>
                            {isLogin ? (
                                <>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="relative mb-4">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <div className="relative col-span-1">
                                        <input
                                            type={showPasskey ? ' text' : 'password'}
                                            name="secretPasskey"
                                            placeholder="Secret Passkey"
                                            value={formData.secretPasskey}
                                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasskeyVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                            tabIndex="-1"
                                        >
                                            {showPasskey ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <div className="relative col-span-1">
                                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                            tabIndex="-1">
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <div className="relative col-span-1">
                                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none" tabIndex="-1">
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button type="submit" className="w-full mt-4 p-2 text-white rounded bg-black hover:bg-gray-800 transition-colors duration-200 text-xl font-semibold">
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                            {isLogin ? (
                                <>
                                    <p className="mt-4 text-center">
                                        Forgot Password?
                                        <span
                                            className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200 ml-2"
                                            onClick={() => switchForm('reset')}
                                        >
                                            Reset
                                        </span>
                                    </p>
                                    <p className="mt-4 text-center">
                                        Don't have an account?
                                        <span
                                            className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200 ml-2"
                                            onClick={() => switchForm('register')}
                                        >
                                            Create
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <p className="mt-4 text-center">
                                    Already have an account?
                                    <span
                                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200 ml-2"
                                        onClick={() => switchForm('login')}
                                    >
                                        Login
                                    </span>
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;