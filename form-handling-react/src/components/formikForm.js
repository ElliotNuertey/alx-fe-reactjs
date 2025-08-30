import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string().required('Username is required')
        .min(3, 'Username must be at least 3 characters long'),
    email: Yup.string().required('Email is required')
        .email('Invalid email address'),
    password: Yup.string().required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
});

const FormikForm = () => {
    // Initial form values
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
        setStatus(null); // Clear any previous status messages

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
                                    username: values.username,
                                    email: values.email
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
                setStatus({
                    type: 'success',
                    message: `Success: ${response.message}`
                });
                // Reset form on successful submission
                resetForm();
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: `Error: ${error.message}`
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="registration-form-container">
            <div className="form-wrapper">
                <h2>User Registration (Formik)</h2>
                <p className="form-description">
                    Create your account using Formik for enhanced form handling. All fields are required.
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status, values }) => (
                        <Form className="registration-form">
                            {/* Username Field */}
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="span"
                                    className="error-message"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="span"
                                    className="error-message"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className="error-message"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-button"
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>

                            {/* Status Message */}
                            {status && (
                                <div className={`submit-message ${status.type}`}>
                                    {status.message}
                                </div>
                            )}

                            {/* Form State Debug Info (for development) */}
                            <div className="debug-info">
                                <h4>Current Form Data (Formik):</h4>
                                <pre>{JSON.stringify(values, null, 2)}</pre>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default FormikForm;
