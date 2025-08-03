import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
    const { recommendations, favorites, addFavorite, generateRecommendations } = useRecipeStore();

    // Generate recommendations when component mounts or favorites change
    useEffect(() => {
        generateRecommendations();
    }, [favorites, generateRecommendations]);

    const handleAddToFavorites = (recipeId) => {
        addFavorite(recipeId);
    };

    const isInFavorites = (recipeId) => {
        return favorites.includes(recipeId);
    };

    if (recommendations.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Recommended for You</h2>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    {favorites.length === 0
                        ? "Add some recipes to your favorites to get personalized recommendations!"
                        : "No new recommendations available right now. Try adding more favorites!"
                    }
                </p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{
                    color: '#333',
                    fontSize: '28px',
                    marginBottom: '10px'
                }}>
                    Recommended for You
                </h2>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Based on your favorite recipes, we think you'll love these!
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {recommendations.map(recipe => (
                    <div
                        key={recipe.id}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            padding: '20px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        {/* Recommendation Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '15px',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            padding: '5px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            Recommended
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', marginTop: '10px' }}>
                            <h3 style={{
                                color: '#333',
                                margin: '0',
                                fontSize: '20px',
                                flex: 1
                            }}>
                                {recipe.title}
                            </h3>

                            {!isInFavorites(recipe.id) && (
                                <button
                                    onClick={() => handleAddToFavorites(recipe.id)}
                                    style={{
                                        background: 'none',
                                        border: '2px solid #ff6b6b',
                                        borderRadius: '20px',
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#ff6b6b';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#ff6b6b';
                                    }}
                                    title="Add to favorites"
                                >
                                    + Favorite
                                </button>
                            )}
                        </div>

                        <p style={{
                            color: '#666',
                            marginBottom: '20px',
                            lineHeight: '1.5'
                        }}>
                            {recipe.description}
                        </p>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link
                                to={`/recipe/${recipe.id}`}
                                style={{
                                    padding: '10px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                    flex: 1,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                View Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Refresh Recommendations Button */}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button
                    onClick={generateRecommendations}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#218838';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#28a745';
                    }}
                >
                    🔄 Refresh Recommendations
                </button>
            </div>
        </div>
    );
};

export default RecommendationsList;
