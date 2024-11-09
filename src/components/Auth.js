import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, db } from './firebase'; // Adjust the import path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Import SweetAlert2
import sideImage from '../img/Auth/cover-image.png';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        email: '',
        secretPasskey: '',
    });
    const [resetFormData, setResetFormData] = useState({
        email: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasskey, setShowPasskey] = useState(false);

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

    const validateEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const validatePassword = (password) => /^.{8,15}$/.test(password); // 8 to 15 characters

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, password, email, firstName, lastName, phoneNumber, secretPasskey } = formData;

        if (password !== formData.confirmPassword) {
            showAlert("Passwords do not match!", "error");
            return;
        }

        if (!validateEmail(email)) {
            showAlert("Invalid email format!", "error");
            return;
        }

        if (!validatePassword(password)) {
            showAlert("Password must be 8-15 characters long!", "error");
            return;
        }

        if (secretPasskey !== predefinedPasskey) {
            showAlert("Invalid secret passkey!", "error");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username,
                firstName,
                lastName,
                phoneNumber,
                role: "admin", // Set role to "admin"
            });

            // Clear form fields
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                gender: '',
                phoneNumber: '',
                email: '',
                secretPasskey: '',
            });

            showAlert("Registration successful!", "success");

            // Switch back to login form
            setIsLogin(true); // Switch to login form
        } catch (error) {
            console.error("Error registering user:", error);
            showAlert(error.message, "error");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showAlert("Login successful!", "success");
            // Redirect user or perform other actions
        } catch (error) {
            console.error("Error logging in:", error);
            showAlert(error.message, "error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#f0f0f0', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
            <div className="flex bg-gray-100 rounded-lg shadow-2xl w-[950px] h-[500px]">
                <div className="hidden md:block md:w-1/2 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: `url(${sideImage})`, width: '550px', height: '500px' }}></div>
                <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-center mb-6">{isResetPassword ? 'Reset Password' : isLogin ? 'Login' : 'Register'}</h2>

                    {isResetPassword ? (
                        <form>
                            <input type="email" name="email" placeholder="Email" value={resetFormData.email} onChange={(e) => setResetFormData({ ...resetFormData, [e.target.name]: e.target.value })} required className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="submit" className="w-full mt-4 p-2 text-white rounded hover:bg-blue-600 transition duration-200 text-xl font-semibold" style={{ backgroundColor: '#0f3a87' }}>
                                Reset Password
                            </button>
                            <p className="mt-4 text-center cursor-pointer text-blue-500 hover:underline" style={{ color: '#0f3a87' }} onClick={() => setIsResetPassword(false)}>
                                Back to Login
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={isLogin ? handleLogin : handleRegister}>
                            {isLogin ? (
                                <>
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <div className="relative mb-4">
                                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none">
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <div className="relative">
                                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none">
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none">
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Phone Number (09xxxxxxxxx)"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        pattern="[0-9]{11}"
                                        maxLength="11"
                                        minLength="11"
                                        inputMode="numeric"
                                    />
                                    <div className="relative">
                                        <input
                                            type={showPasskey ? 'text' : 'password'}
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
                                        >
                                            {showPasskey ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full mt-4 p-2 text-white rounded hover:bg-blue-600 transition duration-200 text-xl font-semibold"
                                style={{ backgroundColor: '#0f3a87' }}
                            >
                                {isLogin ? 'Login' : 'Register'}
                            </button>

                            <p
                                className="mt-4 text-center cursor-pointer text-blue-500 hover:underline"
                                style={{ color: '#0f3a87' }}
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                }}
                            >
                                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                            </p>

                            {isResetPassword ? (
                                <p
                                    className="mt-4 text-center cursor-pointer text-blue-500 hover:underline"
                                    style={{ color: '#0f3a87' }}
                                    onClick={() => setIsResetPassword(false)}
                                >
                                    Back to Login
                                </p>
                            ) : (
                                isLogin && (
                                    <p
                                        className="mt-4 text-center cursor-pointer text-blue-500 hover:underline"
                                        style={{ color: '#0f3a87' }}
                                        onClick={() => setIsResetPassword(true)}
                                    >
                                        Forgot Password?
                                    </p>
                                )
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;