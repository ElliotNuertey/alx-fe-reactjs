import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
    const { recipes, filteredRecipes, searchTerm, favorites, addFavorite, removeFavorite } = useRecipeStore(state => ({
        recipes: state.recipes,
        filteredRecipes: state.filteredRecipes,
        searchTerm: state.searchTerm,
        favorites: state.favorites,
        addFavorite: state.addFavorite,
        removeFavorite: state.removeFavorite
    }));

    // Use filtered recipes if there's a search term, otherwise show all recipes
    const displayRecipes = searchTerm ? filteredRecipes : recipes;

    const isInFavorites = (recipeId) => {
        return favorites.includes(recipeId);
    };

    const handleToggleFavorite = (recipeId) => {
        if (isInFavorites(recipeId)) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h2 style={{ margin: 0 }}>
                    {searchTerm ? `Search Results (${displayRecipes.length})` : 'Recipe List'}
                </h2>
                {searchTerm && displayRecipes.length > 0 && (
                    <span style={{
                        fontSize: '14px',
                        color: '#28a745',
                        fontWeight: 'bold'
                    }}>
                        Found {displayRecipes.length} recipe{displayRecipes.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {displayRecipes.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    {searchTerm ? (
                        <>
                            <p style={{ color: '#6c757d', fontSize: '18px', margin: '0 0 10px 0' }}>
                                🔍 No recipes found for "{searchTerm}"
                            </p>
                            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
                                Try a different search term or add a new recipe!
                            </p>
                        </>
                    ) : (
                        <>
                            <p style={{ color: '#6c757d', fontSize: '18px', margin: '0 0 10px 0' }}>
                                📝 No recipes yet!
                            </p>
                            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
                                Add your first recipe to get started.
                            </p>
                        </>
                    )}
                </div>
            ) : (
                displayRecipes.map(recipe => (
                    <div key={recipe.id} style={{
                        border: '1px solid #ddd',
                        margin: '10px 0',
                        padding: '15px',
                        borderRadius: '5px',
                        backgroundColor: '#f9f9f9',
                        position: 'relative'
                    }}>
                        {/* Favorite indicator */}
                        {isInFavorites(recipe.id) && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                color: '#ff6b6b',
                                fontSize: '20px'
                            }}>
                                ❤️
                            </div>
                        )}

                        <h3 style={{ color: '#333', marginBottom: '10px', paddingRight: '40px' }}>
                            {recipe.title}
                        </h3>
                        <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '15px' }}>
                            {recipe.description.length > 100
                                ? `${recipe.description.substring(0, 100)}...`
                                : recipe.description}
                        </p>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Link
                                to={`/recipe/${recipe.id}`}
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                            >
                                View Details
                            </Link>

                            <button
                                onClick={() => handleToggleFavorite(recipe.id)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: isInFavorites(recipe.id) ? '#ff6b6b' : 'transparent',
                                    color: isInFavorites(recipe.id) ? 'white' : '#ff6b6b',
                                    border: '2px solid #ff6b6b',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (!isInFavorites(recipe.id)) {
                                        e.target.style.backgroundColor = '#ff6b6b';
                                        e.target.style.color = 'white';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isInFavorites(recipe.id)) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#ff6b6b';
                                    }
                                }}
                            >
                                {isInFavorites(recipe.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecipeList;
