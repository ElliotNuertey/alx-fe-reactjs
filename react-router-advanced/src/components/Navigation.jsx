import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navigation = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navStyle = {
        backgroundColor: '#333',
        padding: '1rem',
        marginBottom: '2rem'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 1rem',
        padding: '0.5rem'
    };

    const buttonStyle = {
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        marginLeft: '1rem'
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Home</Link>

            {isAuthenticated ? (
                <>
                    <Link to="/profile" style={linkStyle}>Profile</Link>
                    <Link to="/blog/1" style={linkStyle}>Blog Post 1</Link>
                    <Link to="/blog/2" style={linkStyle}>Blog Post 2</Link>
                    <Link to="/blog/3" style={linkStyle}>Blog Post 3</Link>
                    <span style={{ color: 'white', marginLeft: '1rem' }}>
                        Welcome, {user?.username}!
                    </span>
                    <button onClick={handleLogout} style={buttonStyle}>
                        Logout
                    </button>
                </>
            ) : (
                <Link to="/login" style={linkStyle}>Login</Link>
            )}
        </nav>
    );
};

export default Navigation;
