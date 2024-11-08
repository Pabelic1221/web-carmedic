import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons from react-icons
import sideImage from '../img/Auth/cover-image.png';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isOwnerRegistration, setIsOwnerRegistration] = useState(false);
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
        username: '',
        newPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasskey, setShowPasskey] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const togglePasskeyVisibility = () => {
        setShowPasskey(!showPasskey);
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen"
            style={{
                backgroundColor: '#f0f0f0', // Set a solid background color
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
            }}
        >
            <div className="flex bg-gray-100 rounded-lg shadow-2xl w-[950px] h-[500px]">
                <div
                    className="hidden md:block md:w-1/2 bg-cover bg-center rounded-l-lg"
                    style={{
                        backgroundImage: `url(${sideImage})`,
                        width: '550px',
                        height: '500px',
                    }}
                ></div>
                <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        {isResetPassword ? 'Reset Password' : isLogin ? 'Login' : isOwnerRegistration ? 'Register as Owner' : 'Register'}
                    </h2>
                    {isResetPassword ? (
                        <form>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={resetFormData.username}
                                onChange={(e) => setResetFormData({ ...resetFormData, [e.target.name]: e.target.value })}
                                required
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="relative mb-4">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={resetFormData.newPassword}
                                    onChange={(e) => setResetFormData({ ...resetFormData, [e.target.name]: e.target.value })}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-4 p-2 text-white rounded hover:bg-blue-600 transition duration-200 text-xl font-semibold"
                                style={{ backgroundColor: '#0f3a87' }}
                            >
                                Reset Password
                            </button>
                            <p
                                className="mt-4 text-center cursor-pointer text-blue-500 hover:underline"
                                style={{ color: '#0f3a87' }}
                                onClick={() => setIsResetPassword(false)}
                            >
                                Back to Login
                            </p>
                        </form>
                    ) : (
                        <form>
                            {isLogin ? (
                                <>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
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
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="relative">
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
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <select
                                        name="gender"
                                        value={formData.gender} // Corrected this line
                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
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
                                    {isOwnerRegistration && (
                                        <div className="relative col-span-2">
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
                                    )}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full mt-4 p-2 text-white rounded hover:bg-blue-600 transition duration-200 text-xl font-semibold"
                                style={{ backgroundColor: '#0f3a87' }}
                            >
                                {isLogin ? 'Login' : isOwnerRegistration ? 'Register as Owner' : 'Register'}
                            </button>

                            <p
                                className="mt-4 text-center cursor-pointer text-blue-500 hover:underline"
                                style={{ color: '#0f3a87' }}
                                onClick={() => {
                                    if (isLogin) {
                                        setIsLogin(false);
                                        setIsOwnerRegistration(false);
                                    } else if (isOwnerRegistration) {
                                        setIsOwnerRegistration(false);
                                    } else {
                                        setIsOwnerRegistration(true);
                                    }
                                }}
                            >
                                {isLogin
                                    ? "Don't have an account? Register"
                                    : isOwnerRegistration
                                        ? 'Back to Registration'
                                        : 'Register as Owner'}
                            </p>

                            <p
                                className="mt-4 text-center cursor-pointer text-blue-500 hover:underline"
                                style={{ color: '#0f3a87' }}
                                onClick={() => {
                                    if (!isLogin) {
                                        setIsLogin(true);
                                        setIsOwnerRegistration(false);
                                    }
                                }}
                            >
                                {!isLogin && !isOwnerRegistration ? 'Already have an account? Login' : null}
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
        </div >
    );
};

export default Auth;