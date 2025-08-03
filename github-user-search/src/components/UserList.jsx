import UserCard from './UserCard';

const UserList = ({ users, loading, error, onUserClick }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Searching for users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <h3>Oops! Something went wrong</h3>
                    <p>{error.message || 'Failed to fetch users. Please try again.'}</p>
                    {error.response?.status === 403 && (
                        <p className="rate-limit-message">
                            Rate limit exceeded. Consider adding a GitHub API token for higher limits.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="no-results">
                <p>No users found. Try searching for a different username.</p>
            </div>
        );
    }

    return (
        <div className="user-list">
            <div className="results-header">
                <h2>Search Results ({users.length} users found)</h2>
            </div>
            <div className="user-grid">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onClick={onUserClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserList;
