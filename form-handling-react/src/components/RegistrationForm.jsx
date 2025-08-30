import { useState } from 'react';

const RegistrationForm = () => {
    // Individual state management for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for form errors
    const [errors, setErrors] = useState({});

    // State for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the appropriate state based on field name
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters long';
        }

        // Email validation - basic check first
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }

        // Password validation - basic check first
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Mock API call - simulate user registration
            const mockApiCall = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // Simulate successful registration
                        if (Math.random() > 0.1) { // 90% success rate
                            resolve({
                                success: true,
                                message: 'User registered successfully!',
                                user: {
                                    id: Date.now(),
                                    username: username,
                                    email: email
                                }
                            });
                        } else {
                            // Simulate API error
                            reject(new Error('Registration failed. Please try again.'));
                        }
                    }, 1500); // 1.5 second delay to simulate network request
                });
            };

            const response = await mockApiCall();

            if (response.success) {
                setSubmitMessage(`Success: ${response.message}`);
                // Reset form on successful submission
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setSubmitMessage(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="registration-form-container">
            <div className="form-wrapper">
                <h2>User Registration (Controlled Components)</h2>
                <p className="form-description">
                    Create your account by filling out the form below. All fields are required.
                </p>

                <form onSubmit={handleSubmit} className="registration-form">
                    {/* Username Field */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            placeholder="Enter your username"
                        />
                        {errors.username && (
                            <span className="error-message">{errors.username}</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-button"
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>

                    {/* Submit Message */}
                    {submitMessage && (
                        <div className={`submit-message ${submitMessage.startsWith('Success') ? 'success' : 'error'}`}>
                            {submitMessage}
                        </div>
                    )}
                </form>

                {/* Form State Debug Info (for development) */}
                <div className="debug-info">
                    <h4>Current Form Data:</h4>
                    <pre>{JSON.stringify({ username, email, password }, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
