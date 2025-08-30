import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome to React Router Advanced Demo</h1>
            <p>This application demonstrates advanced React Router features:</p>

            <div style={{ margin: '2rem 0' }}>
                <h2>Features Demonstrated:</h2>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>✅ <strong>Basic Routing</strong> - Navigation between different pages</li>
                    <li>✅ <strong>Nested Routes</strong> - Profile component with sub-routes</li>
                    <li>✅ <strong>Dynamic Routing</strong> - Blog posts with variable URLs</li>
                    <li>✅ <strong>Protected Routes</strong> - Authentication-required pages</li>
                    <li>✅ <strong>Authentication Context</strong> - Global auth state management</li>
                    <li>✅ <strong>Route Guards</strong> - Redirect unauthenticated users</li>
                </ul>
            </div>

            <div style={{ margin: '2rem 0' }}>
                <h2>Quick Navigation:</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/login" style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}>
                        Login Page
                    </Link>
                    <Link to="/profile" style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}>
                        Profile (Protected)
                    </Link>
                    <Link to="/blog/1" style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}>
                        Blog Post 1
                    </Link>
                    <Link to="/blog/advanced-routing" style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}>
                        Blog Post (Dynamic)
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <h3>Testing Instructions:</h3>
                <ol style={{ lineHeight: '1.6' }}>
                    <li>Try accessing the Profile page without logging in (should redirect to login)</li>
                    <li>Login with username: <strong>user</strong> and password: <strong>password</strong></li>
                    <li>Navigate to Profile and explore the nested routes (Details/Settings)</li>
                    <li>Test dynamic routing by visiting different blog post URLs</li>
                    <li>Verify that protected routes work correctly after authentication</li>
                </ol>
            </div>
        </div>
    );
};

export default Home;
