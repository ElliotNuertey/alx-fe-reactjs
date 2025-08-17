import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddRecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        steps: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        // Check if title is empty
        if (!formData.title.trim()) {
            newErrors.title = 'Recipe title is required';
        }

        // Check if ingredients is empty
        if (!formData.ingredients.trim()) {
            newErrors.ingredients = 'Ingredients are required';
        } else {
            // Check if ingredients list has at least 2 items
            const ingredientsList = formData.ingredients
                .split('\n')
                .filter(ingredient => ingredient.trim() !== '');

            if (ingredientsList.length < 2) {
                newErrors.ingredients = 'Please include at least 2 ingredients (one per line)';
            }
        }

        // Check if preparation steps is empty
        if (!formData.steps.trim()) {
            newErrors.steps = 'Preparation steps are required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission (since we don't have a backend)
        setTimeout(() => {
            alert('Recipe submitted successfully!');

            // Reset form
            setFormData({
                title: '',
                ingredients: '',
                steps: ''
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-200"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Homepage
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Add New Recipe
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Share your favorite recipe with the community
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Recipe Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Recipe Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.title
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300'
                                    }`}
                                placeholder="Enter a descriptive title for your recipe"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label
                                htmlFor="ingredients"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Ingredients *
                            </label>
                            <textarea
                                id="ingredients"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleInputChange}
                                rows={6}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${errors.ingredients
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300'
                                    }`}
                                placeholder="List each ingredient on a new line, e.g:&#10;2 cups flour&#10;1 tsp salt&#10;3 eggs"
                            />
                            {errors.ingredients && (
                                <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Enter each ingredient on a separate line. Include quantities and measurements.
                            </p>
                        </div>

                        {/* Preparation Steps */}
                        <div>
                            <label
                                htmlFor="steps"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Preparation Steps *
                            </label>
                            <textarea
                                id="steps"
                                name="steps"
                                value={formData.steps}
                                onChange={handleInputChange}
                                rows={8}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${errors.steps
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300'
                                    }`}
                                placeholder="Describe the cooking process step by step:&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients in a bowl&#10;3. Add wet ingredients and stir until combined&#10;4. Bake for 25-30 minutes"
                            />
                            {errors.steps && (
                                <p className="mt-1 text-sm text-red-600">{errors.steps}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Provide clear, detailed instructions for preparing your recipe.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-blue-700'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Recipe'
                                )}
                            </button>
                        </div>

                        {/* Required Fields Note */}
                        <div className="text-sm text-gray-500 pt-2">
                            * Required fields
                        </div>
                    </form>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-blue-900 mb-3">
                        💡 Tips for a Great Recipe
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                            Use clear, descriptive titles that tell people what they're making
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                            Include exact measurements and quantities in your ingredients list
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                            Write step-by-step instructions that are easy to follow
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                            Mention cooking times and temperatures where applicable
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddRecipeForm;
