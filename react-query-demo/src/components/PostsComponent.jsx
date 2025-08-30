import { useQuery } from '@tanstack/react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const PostsComponent = () => {
    // Use React Query's useQuery hook to fetch and manage data
    const {
        data: posts,
        isLoading,
        isError,
        error,
        refetch,
        isRefetching
    } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
        refetchOnWindowFocus: true, // Refetch when window gains focus
        keepPreviousData: true, // Keep previous data while fetching new data
    });

    // Handle loading state
    if (isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Loading posts...</h2>
                <div style={{ fontSize: '24px' }}>⏳</div>
            </div>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                <h2>Error loading posts</h2>
                <p>Error: {error.message}</p>
                <button onClick={() => refetch()} style={{ padding: '10px 20px', marginTop: '10px' }}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Posts from JSONPlaceholder API</h1>
                <button
                    onClick={() => refetch()}
                    disabled={isRefetching}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isRefetching ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isRefetching ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isRefetching ? 'Refreshing...' : 'Refresh Posts'}
                </button>
            </div>

            <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                <p><strong>Total Posts:</strong> {posts?.length || 0}</p>
                <p><strong>React Query Features:</strong></p>
                <ul style={{ marginLeft: '20px' }}>
                    <li>✅ Automatic caching</li>
                    <li>✅ Loading states</li>
                    <li>✅ Error handling</li>
                    <li>✅ Background refetching</li>
                    <li>✅ Data freshness management</li>
                </ul>
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
                {posts?.map((post) => (
                    <div
                        key={post.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                            {post.id}. {post.title}
                        </h3>
                        <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>
                            {post.body}
                        </p>
                        <small style={{ color: '#999', marginTop: '10px', display: 'block' }}>
                            User ID: {post.userId}
                        </small>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e6f3ff', borderRadius: '5px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>🧪 Testing Instructions:</h3>
                <ol style={{ marginLeft: '20px', lineHeight: '1.6' }}>
                    <li>Navigate away from this component and come back to observe caching behavior</li>
                    <li>Click "Refresh Posts" to trigger a manual refetch</li>
                    <li>Open Browser Dev Tools → Network tab to see API call patterns</li>
                    <li>Use React Developer Tools to inspect the React Query cache</li>
                </ol>
            </div>
        </div>
    );
};

export default PostsComponent;
