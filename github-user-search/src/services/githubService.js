import axios from 'axios';

const BASE_URL = 'https://api.github.com';
// GitHub Search Users API endpoint
const SEARCH_USERS_URL = 'https://api.github.com/search/users?q';

// Create axios instance with default configuration
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Add request interceptor to include API key if available
api.interceptors.request.use(
    (config) => {
        const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
        if (apiKey) {
            config.headers.Authorization = `token ${apiKey}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            console.warn('GitHub API rate limit exceeded. Consider adding an API key.');
        }
        return Promise.reject(error);
    }
);

/**
 * Search for GitHub users
 * GitHub API endpoint: https://api.github.com/search/users?q={query}
 * @param {string} username - The username to search for
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} perPage - Number of results per page (default: 30)
 * @returns {Promise} Promise containing user search results
 */
export const searchUsers = async (username, page = 1, perPage = 30) => {
    try {
        // Full URL: https://api.github.com/search/users?q={username}&page={page}&per_page={perPage}
        const response = await api.get('/search/users', {
            params: {
                q: username,
                page,
                per_page: perPage,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

/**
 * Advanced search for GitHub users with multiple criteria
 * GitHub API endpoint: https://api.github.com/search/users?q={query}
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.username - Username or name to search for
 * @param {string} searchParams.location - Location to filter by
 * @param {number} searchParams.minRepos - Minimum number of repositories
 * @param {number} searchParams.page - Page number for pagination (default: 1)
 * @param {number} searchParams.perPage - Number of results per page (default: 30)
 * @returns {Promise} Promise containing advanced search results
 */
export const advancedSearchUsers = async (searchParams) => {
    try {
        const { username, location, minRepos, page = 1, perPage = 30 } = searchParams;

        // Build the search query
        let query = '';

        if (username && username.trim()) {
            query += username.trim();
        }

        if (location && location.trim()) {
            query += ` location:${location.trim()}`;
        }

        if (minRepos && minRepos > 0) {
            query += ` repos:>=${minRepos}`;
        }

        // If no query is built, search for general users
        if (!query.trim()) {
            query = 'type:user';
        }

        const response = await api.get('/search/users', {
            params: {
                q: query,
                page,
                per_page: perPage,
                sort: 'repositories',
                order: 'desc',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error in advanced search:', error);
        throw error;
    }
};

/**
 * Fetch user data from GitHub API using username
 * @param {string} username - The username to fetch data for
 * @returns {Promise} Promise containing user data
 */
export const fetchUserData = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

/**
 * Get detailed information about a specific user
 * @param {string} username - The username to get details for
 * @returns {Promise} Promise containing user details
 */
export const getUserDetails = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

/**
 * Get user's repositories
 * @param {string} username - The username to get repositories for
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} perPage - Number of results per page (default: 30)
 * @returns {Promise} Promise containing user's repositories
 */
export const getUserRepos = async (username, page = 1, perPage = 30) => {
    try {
        const response = await api.get(`/users/${username}/repos`, {
            params: {
                page,
                per_page: perPage,
                sort: 'updated',
                direction: 'desc',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        throw error;
    }
};

export default api;
