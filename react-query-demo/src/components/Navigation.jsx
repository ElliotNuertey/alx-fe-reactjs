import { useState } from 'react';
import PostsComponent from './PostsComponent';

const Navigation = () => {
    const [currentView, setCurrentView] = useState('posts');

    const navigationStyle = {
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #ddd',
        marginBottom: '20px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '0 10px',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        cursor: 'pointer',
        borderRadius: '5px'
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: 'white'
    };

    return (
        <div>
            <nav style={navigationStyle}>
                <h2 style={{ margin: '0 0 15px 0' }}>React Query Demo - Navigation Test</h2>
                <button
                    style={currentView === 'posts' ? activeButtonStyle : buttonStyle}
                    onClick={() => setCurrentView('posts')}
                >
                    📝 Posts Component
                </button>
                <button
                    style={currentView === 'about' ? activeButtonStyle : buttonStyle}
                    onClick={() => setCurrentView('about')}
                >
                    ℹ️ About Page
                </button>
                <button
                    style={currentView === 'info' ? activeButtonStyle : buttonStyle}
                    onClick={() => setCurrentView('info')}
                >
                    🔧 Cache Info
                </button>
            </nav>

            {currentView === 'posts' && <PostsComponent />}

            {currentView === 'about' && (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>About This Demo</h1>
                    <p>This application demonstrates React Query's caching capabilities.</p>
                    <p>Navigate to the Posts component, then switch to this page and back to see caching in action!</p>
                </div>
            )}

            {currentView === 'info' && (
                <div style={{ padding: '20px' }}>
                    <h1>React Query Cache Information</h1>
                    <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', lineHeight: '1.6' }}>
                        <h3>🧪 How to Test Caching:</h3>
                        <ol>
                            <li><strong>Visit Posts:</strong> Click "Posts Component" to load data from API</li>
                            <li><strong>Navigate Away:</strong> Click "About Page" to unmount PostsComponent</li>
                            <li><strong>Return to Posts:</strong> Click "Posts Component" again</li>
                            <li><strong>Observe:</strong> Data loads instantly from cache (no loading spinner)</li>
                            <li><strong>Check Network:</strong> Open DevTools → Network tab to see API calls</li>
                        </ol>

                        <h3>⚙️ Cache Configuration:</h3>
                        <ul>
                            <li><strong>Stale Time:</strong> 5 minutes (data considered fresh)</li>
                            <li><strong>Cache Time:</strong> 10 minutes (data kept in memory)</li>
                            <li><strong>Automatic Refetch:</strong> On window focus and component mount</li>
                        </ul>

                        <h3>🛠️ DevTools:</h3>
                        <p>React Query DevTools are available in the bottom-right corner for cache inspection.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigation;
