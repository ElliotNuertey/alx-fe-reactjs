import { create } from 'zustand'

const useRecipeStore = create((set) => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [],
    recommendations: [],

    addRecipe: (newRecipe) => set(state => {
        const updatedRecipes = [...state.recipes, newRecipe];
        return {
            recipes: updatedRecipes,
            filteredRecipes: updatedRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
        };
    }),

    deleteRecipe: (id) => set(state => {
        const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
        return {
            recipes: updatedRecipes,
            filteredRecipes: updatedRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
        };
    }),

    updateRecipe: (updatedRecipe) => set(state => {
        const updatedRecipes = state.recipes.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );
        return {
            recipes: updatedRecipes,
            filteredRecipes: updatedRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
        };
    }),

    setRecipes: (recipes) => set(state => ({
        recipes,
        filteredRecipes: recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
    })),

    setSearchTerm: (term) => set(state => ({
        searchTerm: term,
        filteredRecipes: state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase()) ||
            recipe.description.toLowerCase().includes(term.toLowerCase())
        )
    })),

    filterRecipes: () => set(state => ({
        filteredRecipes: state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
    })),

    // Favorites management
    addFavorite: (recipeId) => set(state => ({
        favorites: [...state.favorites, recipeId]
    })),

    removeFavorite: (recipeId) => set(state => ({
        favorites: state.favorites.filter(id => id !== recipeId)
    })),

    // Recommendations generation
    generateRecommendations: () => set(state => {
        // Mock implementation based on favorites and similar recipes
        const recommended = state.recipes.filter(recipe => {
            // Don't recommend recipes that are already favorites
            if (state.favorites.includes(recipe.id)) return false;

            // Simple recommendation logic: recipes with similar ingredients or cooking time
            if (state.favorites.length === 0) {
                // If no favorites, recommend random popular recipes
                return Math.random() > 0.7;
            }

            // Get favorite recipes
            const favoriteRecipes = state.recipes.filter(r => state.favorites.includes(r.id));

            // Recommend recipes that share common words in title or description
            return favoriteRecipes.some(favRecipe => {
                const favWords = (favRecipe.title + ' ' + favRecipe.description).toLowerCase().split(' ');
                const recipeWords = (recipe.title + ' ' + recipe.description).toLowerCase().split(' ');
                return favWords.some(word => word.length > 3 && recipeWords.includes(word));
            });
        }).slice(0, 5); // Limit to 5 recommendations

        return { recommendations: recommended };
    })
}));

export default useRecipeStore;
