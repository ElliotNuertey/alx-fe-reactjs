const UserCard = ({ user, onClick }) => {
    const {
        login,
        avatar_url,
        html_url,
        type,
        name,
        public_repos,
        followers,
        following,
        location,
        bio,
    } = user;

    return (
        <div className="user-card" onClick={() => onClick && onClick(user)}>
            <div className="user-avatar">
                <img src={avatar_url} alt={`${login}'s avatar`} />
            </div>

            <div className="user-info">
                <h3 className="user-login">{login}</h3>
                {name && <p className="user-name">{name}</p>}
                {location && <p className="user-location">📍 {location}</p>}
                {bio && <p className="user-bio">{bio}</p>}

                <div className="user-stats">
                    {public_repos !== undefined && (
                        <span className="stat">
                            <strong>{public_repos}</strong> repos
                        </span>
                    )}
                    {followers !== undefined && (
                        <span className="stat">
                            <strong>{followers}</strong> followers
                        </span>
                    )}
                    {following !== undefined && (
                        <span className="stat">
                            <strong>{following}</strong> following
                        </span>
                    )}
                </div>

                <div className="user-actions">
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        View on GitHub
                    </a>
                    {type && <span className="user-type">{type}</span>}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
