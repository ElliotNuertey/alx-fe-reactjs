import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'
import UserContext from './components/UserContext'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserContext.Provider value={userData}>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography"/>
      <UserProfile name="Chris" age="23" bio="Musician"/>

     </UserContext.Provider>

    </>
  )
}

export default App
