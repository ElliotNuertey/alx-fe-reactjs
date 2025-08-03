import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import DataInitializer from './components/DataInitializer'

function App() {
  return (
    <Router>
      <DataInitializer />
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '30px',
          borderBottom: '2px solid #007bff',
          paddingBottom: '20px'
        }}>
          <h1 style={{
            color: '#333',
            fontSize: '2.5rem',
            margin: '0'
          }}>
            Recipe Sharing App
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            margin: '10px 0 20px 0'
          }}>
            Share and discover amazing recipes!
          </p>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}>
            <Link
              to="/"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              🏠 Home
            </Link>
            <Link
              to="/favorites"
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              ❤️ Favorites
            </Link>
            <Link
              to="/recommendations"
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              ⭐ Recommended
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recommendations" element={<RecommendationsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
