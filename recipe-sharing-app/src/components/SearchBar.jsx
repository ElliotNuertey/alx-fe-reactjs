import { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import ClearSearchButton from './ClearSearchButton';

const SearchBar = () => {
    const { searchTerm, setSearchTerm, filterRecipes } = useRecipeStore(state => ({
        searchTerm: state.searchTerm,
        setSearchTerm: state.setSearchTerm,
        filterRecipes: state.filterRecipes
    }));

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    // Trigger filtering whenever the component mounts or search term changes
    useEffect(() => {
        filterRecipes();
    }, [filterRecipes]);

    return (
        <div style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
        }}>
            <h3 style={{
                margin: '0 0 10px 0',
                color: '#495057',
                fontSize: '1.1rem'
            }}>
                Search Recipes
            </h3>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search recipes by title or description..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                        width: '100%',
                        padding: '12px 40px 12px 12px',
                        border: '2px solid #ced4da',
                        borderRadius: '6px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                        boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                />
                <span style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6c757d',
                    fontSize: '18px',
                    pointerEvents: 'none'
                }}>
                    🔍
                </span>
            </div>
            {searchTerm && (
                <div>
                    <p style={{
                        margin: '8px 0 0 0',
                        fontSize: '14px',
                        color: '#6c757d'
                    }}>
                        Searching for: "<strong>{searchTerm}</strong>"
                    </p>
                    <ClearSearchButton />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
