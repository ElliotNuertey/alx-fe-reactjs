import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
    const { recipes, favorites, removeFavorite } = useRecipeStore();

    // Get favorite recipes by mapping favorite IDs to actual recipe objects
    const favoriteRecipes = favorites.map(id =>
        recipes.find(recipe => recipe.id === id)
    ).filter(Boolean); // Filter out any undefined recipes

    const handleRemoveFavorite = (recipeId) => {
        removeFavorite(recipeId);
    };

    if (favoriteRecipes.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>My Favorites</h2>
                <p style={{ color: '#666', fontSize: '18px' }}>
                    You haven't added any favorites yet. Start exploring recipes and add some to your favorites!
                </p>
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontSize: '16px'
                    }}
                >
                    Browse Recipes
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{
                color: '#333',
                marginBottom: '30px',
                textAlign: 'center',
                fontSize: '28px'
            }}>
                My Favorites ({favoriteRecipes.length})
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {favoriteRecipes.map(recipe => (
                    <div
                        key={recipe.id}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            padding: '20px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s'
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <h3 style={{
                                color: '#333',
                                margin: '0',
                                fontSize: '20px',
                                flex: 1
                            }}>
                                {recipe.title}
                            </h3>
                            <button
                                onClick={() => handleRemoveFavorite(recipe.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    color: '#ff6b6b',
                                    padding: '5px',
                                    borderRadius: '3px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#ffe0e0';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                }}
                                title="Remove from favorites"
                            >
                                ❤️
                            </button>
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
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                    flex: 1,
                                    textAlign: 'center'
                                }}
                            >
                                View Recipe
                            </Link>

                            <Link
                                to={`/edit/${recipe.id}`}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                    flex: 1,
                                    textAlign: 'center'
                                }}
                            >
                                Edit Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
