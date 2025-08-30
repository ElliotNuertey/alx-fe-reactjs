import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);

        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid credentials. Use username: "user" and password: "password"');
        }
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem',
        margin: '0.5rem 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem'
    };

    const buttonStyle = {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer'
    };

    return (
        <div style={formStyle}>
            <h2>Login</h2>
            <p>Please login to access protected routes.</p>

            {error && (
                <div style={{
                    color: 'red',
                    backgroundColor: '#ffebee',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <button type="submit" style={buttonStyle}>
                    Login
                </button>
            </form>

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
                <h4>Demo Credentials:</h4>
                <p><strong>Username:</strong> user</p>
                <p><strong>Password:</strong> password</p>
            </div>
        </div>
    );
};

export default Login;
