import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import Home from './components/Home'
import Profile from './components/Profile'
import ProfileDetails from './components/ProfileDetails'
import ProfileSettings from './components/ProfileSettings'
import BlogPost from './components/BlogPost'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Basic Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes with Nested Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }>
                {/* Nested Routes within Profile */}
                <Route index element={<Navigate to="details" replace />} />
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>

              {/* Dynamic Routing for Blog Posts */}
              <Route path="/blog/:id" element={<BlogPost />} />

              {/* Catch-all route for 404 */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

export default App
