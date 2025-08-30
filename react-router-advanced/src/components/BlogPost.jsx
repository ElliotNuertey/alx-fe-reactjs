import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate fetching blog post data based on the ID parameter
    useEffect(() => {
        const fetchPost = () => {
            setLoading(true);

            // Simulate API call delay
            setTimeout(() => {
                // Mock blog post data based on ID
                const mockPosts = {
                    '1': {
                        id: 1,
                        title: 'Getting Started with React Router',
                        content: 'React Router is a powerful library for handling routing in React applications. It allows you to create single-page applications with multiple views.',
                        author: 'Jane Developer',
                        publishDate: '2024-01-15',
                        tags: ['React', 'Routing', 'Web Development']
                    },
                    '2': {
                        id: 2,
                        title: 'Advanced React Patterns',
                        content: 'Learn about advanced React patterns including render props, higher-order components, and custom hooks for better code reusability.',
                        author: 'John Coder',
                        publishDate: '2024-01-20',
                        tags: ['React', 'Patterns', 'Best Practices']
                    },
                    '3': {
                        id: 3,
                        title: 'State Management with Context API',
                        content: 'The Context API provides a way to share data between components without having to pass props down manually at every level.',
                        author: 'Alice Engineer',
                        publishDate: '2024-01-25',
                        tags: ['React', 'Context API', 'State Management']
                    }
                };

                setPost(mockPosts[id] || null);
                setLoading(false);
            }, 500);
        };

        fetchPost();
    }, [id]);

    const containerStyle = {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
    };

    const headerStyle = {
        borderBottom: '2px solid #007bff',
        paddingBottom: '1rem',
        marginBottom: '2rem'
    };

    const metaStyle = {
        color: '#666',
        fontSize: '0.9rem',
        marginBottom: '1rem'
    };

    const contentStyle = {
        lineHeight: '1.6',
        fontSize: '1.1rem',
        marginBottom: '2rem'
    };

    const tagStyle = {
        display: 'inline-block',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.8rem',
        marginRight: '0.5rem',
        marginBottom: '0.5rem'
    };

    const buttonStyle = {
        backgroundColor: '#6c757d',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '1rem'
    };

    const navButtonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '0.5rem'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <h2>Loading blog post...</h2>
                <p>Fetching content for post ID: <strong>{id}</strong></p>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={containerStyle}>
                <h2>Blog Post Not Found</h2>
                <p>No blog post found with ID: <strong>{id}</strong></p>
                <div style={{ marginBottom: '2rem' }}>
                    <h4>Dynamic Routing Demonstration:</h4>
                    <ul>
                        <li>✅ URL parameter extracted using useParams hook</li>
                        <li>✅ Component renders different content based on route parameter</li>
                        <li>✅ Current route: /blog/{id}</li>
                        <li>✅ Requested ID: {id}</li>
                    </ul>
                </div>
                <button style={buttonStyle} onClick={() => navigate('/')}>
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{ marginBottom: '2rem' }}>
                <h3>Dynamic Routing Features:</h3>
                <ul>
                    <li>✅ URL parameter: <strong>{id}</strong> extracted with useParams</li>
                    <li>✅ Component renders content based on route parameter</li>
                    <li>✅ Simulated data fetching based on dynamic ID</li>
                    <li>✅ Navigation with useNavigate hook</li>
                </ul>
            </div>

            <article>
                <header style={headerStyle}>
                    <h1>{post.title}</h1>
                    <div style={metaStyle}>
                        By {post.author} | Published on {post.publishDate}
                    </div>
                </header>

                <div style={contentStyle}>
                    <p>{post.content}</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h4>Tags:</h4>
                    {post.tags.map((tag, index) => (
                        <span key={index} style={tagStyle}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div>
                    <button style={buttonStyle} onClick={() => navigate(-1)}>
                        ← Go Back
                    </button>
                    <button style={navButtonStyle} onClick={() => navigate('/blog/1')}>
                        Post 1
                    </button>
                    <button style={navButtonStyle} onClick={() => navigate('/blog/2')}>
                        Post 2
                    </button>
                    <button style={navButtonStyle} onClick={() => navigate('/blog/3')}>
                        Post 3
                    </button>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
