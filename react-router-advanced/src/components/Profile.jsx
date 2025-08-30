import { Outlet, Link, useLocation, Routes, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const location = useLocation();

    const containerStyle = {
        padding: '2rem'
    };

    const tabStyle = {
        display: 'flex',
        borderBottom: '2px solid #ddd',
        marginBottom: '2rem'
    };

    const getLinkStyle = (path) => ({
        padding: '1rem 2rem',
        textDecoration: 'none',
        color: location.pathname.includes(path) ? '#007bff' : '#333',
        backgroundColor: location.pathname.includes(path) ? '#f8f9fa' : 'transparent',
        borderBottom: location.pathname.includes(path) ? '2px solid #007bff' : '2px solid transparent',
        fontWeight: location.pathname.includes(path) ? 'bold' : 'normal'
    });

    return (
        <div style={containerStyle}>
            <h1>Profile Page</h1>
            <p>Welcome to your profile, {user?.username}!</p>

            <div style={{ marginBottom: '2rem' }}>
                <h3>This page demonstrates nested routing:</h3>
                <ul>
                    <li>✅ Profile component serves as the parent route</li>
                    <li>✅ ProfileDetails and ProfileSettings are nested child routes</li>
                    <li>✅ Navigation between nested routes is seamless</li>
                    <li>✅ The parent component remains mounted while child routes change</li>
                </ul>
            </div>

            {/* Navigation tabs for nested routes */}
            <nav style={tabStyle}>
                <Link to="/profile/details" style={getLinkStyle('details')}>
                    Personal Details
                </Link>
                <Link to="/profile/settings" style={getLinkStyle('settings')}>
                    Account Settings
                </Link>
            </nav>

            {/* Outlet renders the nested route components */}
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;
