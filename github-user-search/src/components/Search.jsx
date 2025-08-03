import { useState } from 'react';
import { fetchUserData, advancedSearchUsers } from '../services/githubService';

const Search = () => {
    const [searchParams, setSearchParams] = useState({
        username: '',
        location: '',
        minRepos: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [singleUser, setSingleUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchType, setSearchType] = useState('single'); // 'single' or 'advanced'
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const handleInputChange = (e) => {
        const { name } = e.target;
        // Access e.target.value directly for project requirements
        const targetValue = e.target.value;
        setSearchParams(prev => ({
            ...prev,
            [name]: targetValue
        }));
    };

    const handleSingleUserSearch = async (username) => {
        setLoading(true);
        setError(false);
        setSingleUser(null);
        setSearchResults([]);

        try {
            const data = await fetchUserData(username);
            setSingleUser(data);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAdvancedSearch = async (page = 1) => {
        setLoading(true);
        setError(false);
        setSingleUser(null);

        try {
            const data = await advancedSearchUsers({
                ...searchParams,
                page,
                perPage: 30
            });

            if (page === 1) {
                setSearchResults(data.items || []);
            } else {
                setSearchResults(prev => [...prev, ...(data.items || [])]);
            }

            setTotalCount(data.total_count || 0);
            setHasMore(data.items && data.items.length === 30 && (page * 30) < data.total_count);
            setCurrentPage(page);
        } catch {
            setError(true);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchType === 'single') {
            if (searchParams.username.trim()) {
                handleSingleUserSearch(searchParams.username.trim());
            }
        } else {
            if (searchParams.username.trim() || searchParams.location.trim() || searchParams.minRepos) {
                setCurrentPage(1);
                handleAdvancedSearch(1);
            }
        }
    };

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            handleAdvancedSearch(currentPage + 1);
        }
    };

    const toggleSearchType = () => {
        setSearchType(prev => prev === 'single' ? 'advanced' : 'single');
        setSearchResults([]);
        setSingleUser(null);
        setError(false);
        setSearchParams({ username: '', location: '', minRepos: '' });
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            {/* Search Type Toggle */}
            <div className="flex justify-center mb-6">
                <div className="bg-white rounded-lg p-1 shadow-lg">
                    <button
                        type="button"
                        onClick={toggleSearchType}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${searchType === 'single'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Single User Search
                    </button>
                    <button
                        type="button"
                        onClick={toggleSearchType}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${searchType === 'advanced'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Advanced Search
                    </button>
                </div>
            </div>

            {/* Search Form */}
            <div className="search-form-container rounded-2xl p-6 shadow-2xl mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {searchType === 'single' ? (
                        // Single User Search
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    GitHub Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={searchParams.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter GitHub username..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={loading || !searchParams.username.trim()}
                                    className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Searching...
                                        </div>
                                    ) : (
                                        'Search'
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Advanced Search
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="username-advanced" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username/Name
                                    </label>
                                    <input
                                        type="text"
                                        id="username-advanced"
                                        name="username"
                                        value={searchParams.username}
                                        onChange={handleInputChange}
                                        placeholder="Search by username or name..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={searchParams.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g., San Francisco, London..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                                        Min. Repositories
                                    </label>
                                    <input
                                        type="number"
                                        id="minRepos"
                                        name="minRepos"
                                        value={searchParams.minRepos}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 10"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading || (!searchParams.username.trim() && !searchParams.location.trim() && !searchParams.minRepos)}
                                    className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Searching...
                                        </div>
                                    ) : (
                                        'Advanced Search'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Results Section */}
            <div className="results-section">
                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white text-lg">Loading...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
                            <p className="font-medium">Looks like we cant find the user</p>
                            <p className="text-sm mt-1">Please try a different search term.</p>
                        </div>
                    </div>
                )}

                {/* Single User Result */}
                {singleUser && !loading && !error && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="bg-white rounded-2xl p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0 text-center md:text-left">
                                    <img
                                        src={singleUser.avatar_url}
                                        alt={`${singleUser.login}'s avatar`}
                                        className="w-32 h-32 rounded-full border-4 border-gray-200 mx-auto md:mx-0"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {singleUser.name || singleUser.login}
                                    </h2>
                                    <p className="text-gray-600 mb-3">@{singleUser.login}</p>
                                    {singleUser.bio && (
                                        <p className="text-gray-700 mb-4 italic leading-relaxed">{singleUser.bio}</p>
                                    )}
                                    {singleUser.location && (
                                        <p className="text-gray-600 mb-4 flex items-center">
                                            <span className="mr-2">📍</span>
                                            {singleUser.location}
                                        </p>
                                    )}
                                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200 mb-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{singleUser.public_repos}</div>
                                            <div className="text-sm text-gray-600">Repositories</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{singleUser.followers}</div>
                                            <div className="text-sm text-gray-600">Followers</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{singleUser.following}</div>
                                            <div className="text-sm text-gray-600">Following</div>
                                        </div>
                                    </div>
                                    <a
                                        href={singleUser.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        View GitHub Profile →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Advanced Search Results */}
                {searchResults.length > 0 && !loading && !error && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Search Results</h2>
                            <p className="text-white opacity-90">Found {totalCount.toLocaleString()} users</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {searchResults.map((user) => (
                                <div key={user.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 animate-slide-up">
                                    <div className="text-center">
                                        <img
                                            src={user.avatar_url}
                                            alt={`${user.login}'s avatar`}
                                            className="w-20 h-20 rounded-full border-2 border-gray-200 mx-auto mb-4"
                                        />
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">{user.login}</h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {user.type} • Score: {Math.round(user.score * 100) / 100}
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            {user.location && (
                                                <p className="text-gray-600 text-sm flex items-center justify-center">
                                                    <span className="mr-1">📍</span>
                                                    {user.location}
                                                </p>
                                            )}
                                        </div>

                                        <a
                                            href={user.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                                        >
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMore && (
                            <div className="text-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="px-8 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                                >
                                    {loading ? 'Loading...' : 'Load More Users'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
