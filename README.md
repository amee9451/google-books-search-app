# Google Books Search App

A full-stack application that allows users to search for books using the [Google Books API](https://developers.google.com/books/docs/v1/using). The application features a paginated UI, response time tracking, and API caching.
- **Frontend:** React + TypeScript + Tailwind CSS + React Query
- **Backend:** Node.js + Express + Redis (for caching)
- **API:** Google Books API



## Features

- Book search with pagination (5/10/20/30/40/ per page)
- Backend API caching Redis
- Type-safe API responses using TypeScript
- Styled with Tailwind CSS
- Code formatting with Prettier and ESLint
- Add pagination controls (Previous, Next)
- API data fetching with React Query (stale-while-revalidate)
- Mobile responsiveness
- Partial implementation of unit and integration tests
- Accessibility (a11y) supported



## Folder Structure

```
Google-Books-Search-App/
├── backend/src                 # Node.js API server
│   ├── controllers/         # Route controllers
│   ├── routes/              # API route definitions
│   ├── services/            # External API and caching logic
│   ├── utils/               # Helper utilities
│   ├── middlewares/         # Custom middleware (e.g., cache)
│   └── index.ts             # Server entry point
│
├── frontend/src             # React + TypeScript frontend
│   ├── components/          # UI components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API utilities (e.g., apiRequest)
│   ├── constants/           # Project feature static const 
│   ├── types/               # Shared type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # React entry point
│   └── tailwind.config.js   # Tailwind CSS configuration
|
| kind of similar for both the folders
|
|── .env                     # Store env variable
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .eslintignore            # Files to ignore by ESLint
├── .prettierignore          # Files to ignore by Prettier
├── package.json             # Root package file
├── tsconfig.json            # TypeScript configuration
└── README.md
```
## Error Handling & Rate Limiting
- Centralized error handling for unmatched endpoints and server errors.
- Rate limiting via middleware to prevent API overuse.


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/amee9451/google-books-search-app.git
cd google-books-search-app
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables

#### Backend (`backend/.env`)

```
PORT=5001
GOOGLE_BOOKS_API_KEY=''
GOOGLE_BOOKS_API_URL=''
REDIS_HOST=''
REDIS_PORT=0
REDIS_TTL=0
```

#### Frontend (`frontend/.env`)

```
API_DOMAIN=http://localhost:3300
```

### 4. Run the Application

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm start
```

## API Endpoint

```
API_DOMAIN=http://localhost:5001
```

### `GET /api/books/search?q=searchTerm&limit=10&page=1`

**Query Parameters:**

- `q`: The search term (required)
- `limit`: Number of results per page (optional, default is 10)
- `page`: page number (optional, default is 1)

**Response:**

```json
{
  "books": [...],
  "stats": {
    "totalItems": 100,
    "responseTimeMs": 120
  },
  "totalItems":1000000
}
```

## Linting & Formatting

To lint and fix code issues:

```bash
npm run lint
npm run lint:fix
```

To format all files with Prettier:

```bash
npm run format
```


## Future Improvements

- Implement unit and integration tests
- Add loading skeletons
- Improve accessibility (a11y)
- Implement infinite scroll or window virtualization
- Displays real-time stats and error handling in UI.
