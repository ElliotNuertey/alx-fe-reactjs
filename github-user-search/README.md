# GitHub User Search Application

A React-based application for searching GitHub users and viewing their profiles using the GitHub API.

## Features

- 🔍 Search for GitHub users by username
- 👤 View user profiles with detailed information
- 📊 Display user statistics (repositories, followers, following)
- 📱 Responsive design for mobile and desktop
- ⚡ Fast search with error handling
- 🔗 Direct links to GitHub profiles

## Project Structure

```
github-user-search/
├── src/
│   ├── components/          # React components
│   │   ├── Search.jsx       # Search input component
│   │   ├── UserCard.jsx     # Individual user card
│   │   └── UserList.jsx     # User search results
│   ├── services/            # API services
│   │   └── githubService.js # GitHub API integration
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables (optional)
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup (Optional)

Create a `.env` file in the root directory for higher GitHub API rate limits:

```env
VITE_APP_GITHUB_API_KEY=your_github_personal_access_token
```

**To get a GitHub token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `public_repo` scope
3. Copy the token to your `.env` file

**Rate Limits:**
- Without token: 60 requests per hour
- With token: 5,000 requests per hour

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Usage

1. Enter a GitHub username in the search box
2. Click "Search" or press Enter
3. Browse the search results
4. Click on user cards to view more details
5. Use "View on GitHub" links to visit profiles

## API Integration

The application uses the GitHub REST API v3:

- **Search Endpoint**: `/search/users` - Search for users
- **User Details**: `/users/{username}` - Get detailed user information  
- **User Repositories**: `/users/{username}/repos` - Get user repositories

## Technologies Used

- **React 19.1.0** - UI framework
- **Axios 1.11.0** - HTTP client for API calls
- **Vite 7.0.4** - Build tool and development server
- **GitHub API v3** - Data source

## Error Handling

- Network errors and API failures are handled gracefully
- Rate limit warnings for unauthenticated requests
- User-friendly error messages
- Loading states during API calls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
