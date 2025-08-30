import { useAuth } from './AuthContext';

const ProfileDetails = () => {
    const { user } = useAuth();

    const containerStyle = {
        padding: '1rem'
    };

    const fieldStyle = {
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '4px'
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#333',
        marginRight: '0.5rem'
    };

    const valueStyle = {
        color: '#666'
    };

    return (
        <div style={containerStyle}>
            <h2>Personal Details</h2>
            <p>This is a nested route component displaying your personal information.</p>

            <div style={{ marginBottom: '1.5rem' }}>
                <h4>Nested Route Features Demonstrated:</h4>
                <ul>
                    <li>✅ Component rendered inside parent Profile component via Outlet</li>
                    <li>✅ Maintains shared navigation and layout from parent</li>
                    <li>✅ URL structure: /profile/details</li>
                    <li>✅ Seamless navigation between nested routes</li>
                </ul>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Username:</span>
                <span style={valueStyle}>{user?.username || 'admin'}</span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Email:</span>
                <span style={valueStyle}>{user?.email || 'admin@example.com'}</span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Member Since:</span>
                <span style={valueStyle}>January 2024</span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Account Type:</span>
                <span style={valueStyle}>Premium User</span>
            </div>

            <div style={fieldStyle}>
                <span style={labelStyle}>Profile Status:</span>
                <span style={valueStyle}>Active</span>
            </div>
        </div>
    );
};

export default ProfileDetails;
