import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const DataInitializer = () => {
    const { recipes, setRecipes } = useRecipeStore();

    useEffect(() => {
        // Only initialize if there are no recipes yet
        if (recipes.length === 0) {
            const sampleRecipes = [
                {
                    id: 1,
                    title: "Classic Chocolate Chip Cookies",
                    description: "Delicious homemade chocolate chip cookies with crispy edges and chewy centers. Perfect for any occasion and loved by all ages. Made with real vanilla and premium chocolate chips."
                },
                {
                    id: 2,
                    title: "Creamy Chicken Alfredo Pasta",
                    description: "Rich and creamy chicken alfredo pasta with tender grilled chicken, fresh parmesan cheese, and perfectly cooked fettuccine noodles in a garlic cream sauce."
                },
                {
                    id: 3,
                    title: "Fresh Garden Salad",
                    description: "A healthy and refreshing garden salad with mixed greens, cherry tomatoes, cucumbers, carrots, and a light vinaigrette dressing. Perfect for lunch or as a side dish."
                },
                {
                    id: 4,
                    title: "Spicy Beef Tacos",
                    description: "Authentic Mexican-style beef tacos with seasoned ground beef, fresh lettuce, diced tomatoes, cheese, and spicy salsa in soft flour tortillas."
                },
                {
                    id: 5,
                    title: "Homemade Pizza Margherita",
                    description: "Traditional Italian pizza margherita with fresh mozzarella, basil leaves, and tomato sauce on a crispy homemade crust. Simple yet incredibly flavorful."
                },
                {
                    id: 6,
                    title: "Banana Chocolate Smoothie",
                    description: "Healthy and delicious smoothie made with ripe bananas, cocoa powder, almond milk, and a touch of honey. Perfect for breakfast or post-workout nutrition."
                },
                {
                    id: 7,
                    title: "Grilled Salmon with Lemon",
                    description: "Perfectly grilled salmon fillet with fresh lemon juice, herbs, and olive oil. A healthy and protein-rich dinner option that's ready in under 20 minutes."
                },
                {
                    id: 8,
                    title: "Vegetable Stir Fry",
                    description: "Colorful vegetable stir fry with broccoli, bell peppers, carrots, and snap peas in a savory soy-ginger sauce. Quick, healthy, and full of nutrients."
                }
            ];

            setRecipes(sampleRecipes);
        }
    }, [recipes.length, setRecipes]);

    return null; // This component doesn't render anything
};

export default DataInitializer;
