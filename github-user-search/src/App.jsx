import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <header className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          GitHub User Search
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Discover GitHub users with powerful search capabilities. Search by username, location, or repository count.
        </p>
      </header>

      <main className="pb-12">
        <Search />
      </main>

      <footer className="text-center py-8 px-4 bg-black bg-opacity-20">
        <p className="text-white opacity-80">
          Built with React & GitHub API • Enhanced with Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
