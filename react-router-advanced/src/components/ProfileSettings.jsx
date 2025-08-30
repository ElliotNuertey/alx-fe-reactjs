import { useState } from 'react';
import { useAuth } from './AuthContext';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [privacy, setPrivacy] = useState('public');
    const [theme, setTheme] = useState('light');

    const containerStyle = {
        padding: '1rem'
    };

    const settingGroupStyle = {
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '4px'
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        display: 'block'
    };

    const inputStyle = {
        margin: '0.25rem 0.5rem 0 0'
    };

    const selectStyle = {
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '200px'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem'
    };

    const handleSaveSettings = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div style={containerStyle}>
            <h2>Account Settings</h2>
            <p>This nested route allows you to configure your account preferences.</p>

            <div style={{ marginBottom: '1.5rem' }}>
                <h4>Nested Route Implementation:</h4>
                <ul>
                    <li>✅ Component rendered via Outlet in parent Profile component</li>
                    <li>✅ Shares parent layout and navigation</li>
                    <li>✅ URL structure: /profile/settings</li>
                    <li>✅ Independent state management within nested component</li>
                </ul>
            </div>

            <div style={settingGroupStyle}>
                <label style={labelStyle}>Notification Preferences</label>
                <div>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        style={inputStyle}
                    />
                    <span>Enable email notifications</span>
                </div>
            </div>

            <div style={settingGroupStyle}>
                <label style={labelStyle}>Privacy Settings</label>
                <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    style={selectStyle}
                >
                    <option value="public">Public Profile</option>
                    <option value="private">Private Profile</option>
                    <option value="friends">Friends Only</option>
                </select>
            </div>

            <div style={settingGroupStyle}>
                <label style={labelStyle}>Theme Preference</label>
                <div>
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={theme === 'light'}
                        onChange={(e) => setTheme(e.target.value)}
                        style={inputStyle}
                    />
                    <span style={{ marginRight: '1rem' }}>Light Mode</span>

                    <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={(e) => setTheme(e.target.value)}
                        style={inputStyle}
                    />
                    <span>Dark Mode</span>
                </div>
            </div>

            <div style={settingGroupStyle}>
                <label style={labelStyle}>Current User</label>
                <p>Logged in as: <strong>{user?.username || 'admin'}</strong></p>
            </div>

            <button style={buttonStyle} onClick={handleSaveSettings}>
                Save Settings
            </button>
        </div>
    );
};

export default ProfileSettings;
