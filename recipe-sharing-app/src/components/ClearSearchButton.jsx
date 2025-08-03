import useRecipeStore from './recipeStore';

const ClearSearchButton = () => {
    const { searchTerm, setSearchTerm } = useRecipeStore(state => ({
        searchTerm: state.searchTerm,
        setSearchTerm: state.setSearchTerm
    }));

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Only show the button if there's a search term
    if (!searchTerm) return null;

    return (
        <button
            onClick={handleClearSearch}
            style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
            Clear Search
        </button>
    );
};

export default ClearSearchButton;
