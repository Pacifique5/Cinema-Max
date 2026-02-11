# CinemaMax Backend API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Table of Contents
1. [Health & Info](#health--info)
2. [Authentication](#authentication-endpoints)
3. [Movies](#movies-endpoints)
4. [Users](#users-endpoints)
5. [Admin](#admin-endpoints)

---

## Health & Info

### GET /health
Check if the backend is running.

**Response:**
```json
{
  "status": "OK",
  "message": "CinemaMax Backend is running!",
  "timestamp": "2026-02-11T18:19:51.519Z",
  "version": "1.0.0",
  "environment": "development"
}
```

### GET /api
Get API information and available endpoints.

**Response:**
```json
{
  "name": "CinemaMax API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "movies": "/api/movies",
    "users": "/api/users"
  }
}
```

---

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "username": "johndoe"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "1",
    "username": "johndoe",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "user",
    "created_at": "2026-02-11T18:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/signin
Sign in to an existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Signed in successfully",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/admin/login
Admin login for admin panels.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Admin login successful",
  "user": {
    "id": "1",
    "username": "admin",
    "email": "admin@cinemamax.com",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/signout
Sign out and invalidate admin session.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Signed out successfully"
}
```

### GET /api/auth/user
Get current user information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": {
    "id": "1",
    "username": "johndoe",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "user",
    "is_active": true,
    "created_at": "2026-02-11T18:00:00.000Z"
  }
}
```

### GET /api/auth/admin/verify
Verify admin token and session.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": {
    "id": "1",
    "username": "admin",
    "email": "admin@cinemamax.com",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin"
  }
}
```

---

## Movies Endpoints

### GET /api/movies
Get all movies with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "movies": [
    {
      "id": "1",
      "title": "The Godfather",
      "overview": "The aging patriarch of an organized crime dynasty...",
      "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      "release_date": "1972-03-14",
      "vote_average": 8.7,
      "vote_count": 15000,
      "genres": "Drama, Crime",
      "runtime": 175,
      "director": "Francis Ford Coppola",
      "movie_cast": "Marlon Brando, Al Pacino, James Caan",
      "favorite_count": "150",
      "average_rating": "8.5",
      "review_count": "50"
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 5
}
```

### GET /api/movies/popular
Get popular movies.

**Query Parameters:**
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "results": [ ... ],
  "page": 1,
  "total_pages": 10,
  "total_results": 200
}
```

### GET /api/movies/trending
Get trending movies.

**Query Parameters:**
- `time_window` (optional): "day" or "week" (default: "week")

**Response:**
```json
{
  "results": [ ... ],
  "page": 1,
  "total_pages": 10,
  "total_results": 200
}
```

### GET /api/movies/:id
Get movie details by ID.

**Response:**
```json
{
  "id": "1",
  "title": "The Godfather",
  "overview": "...",
  "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
  "release_date": "1972-03-14",
  "vote_average": 8.7,
  "vote_count": 15000,
  "genres": "Drama, Crime",
  "runtime": 175,
  "director": "Francis Ford Coppola",
  "movie_cast": "Marlon Brando, Al Pacino, James Caan",
  "favorite_count": "150",
  "average_rating": "8.5",
  "review_count": "50",
  "reviews": [
    {
      "id": "1",
      "user_id": "2",
      "username": "moviefan",
      "first_name": "Jane",
      "last_name": "Smith",
      "rating": 9,
      "comment": "Masterpiece!",
      "created_at": "2026-02-10T12:00:00.000Z"
    }
  ]
}
```

### GET /api/movies/search/:query
Search movies by title, overview, or genres.

**Query Parameters:**
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "results": [ ... ],
  "page": 1,
  "total_pages": 5,
  "total_results": 100
}
```

### GET /api/movies/genres/list
Get list of all movie genres.

**Response:**
```json
{
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    ...
  ]
}
```

### GET /api/movies/genre/:genreId
Get movies by genre ID.

**Query Parameters:**
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "results": [ ... ],
  "page": 1,
  "total_pages": 10,
  "total_results": 200
}
```

---

## Users Endpoints

All user endpoints require authentication.

### GET /api/users/profile
Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "1",
  "username": "johndoe",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user"
}
```

### PUT /api/users/profile
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "newemail@example.com"
}
```

**Response:**
```json
{
  "id": "1",
  "username": "johndoe",
  "email": "newemail@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user",
  "updated_at": "2026-02-11T18:30:00.000Z"
}
```

### GET /api/users/favorites
Get user's favorite movies.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "movie_id": "1",
    "created_at": "2026-02-10T12:00:00.000Z",
    "title": "The Godfather",
    "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "vote_average": 8.7
  }
]
```

### POST /api/users/favorites/:movieId
Add movie to favorites.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Added to favorites",
  "data": {
    "id": "1",
    "user_id": "1",
    "movie_id": "1",
    "created_at": "2026-02-11T18:30:00.000Z"
  }
}
```

### DELETE /api/users/favorites/:movieId
Remove movie from favorites.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Removed from favorites"
}
```

### GET /api/users/reviews
Get user's reviews.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": "1",
    "user_id": "1",
    "movie_id": "1",
    "rating": 9,
    "comment": "Amazing movie!",
    "created_at": "2026-02-10T12:00:00.000Z",
    "title": "The Godfather",
    "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  }
]
```

### POST /api/users/reviews/:movieId
Add a review for a movie.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "rating": 9,
  "comment": "Amazing movie!"
}
```

**Response:**
```json
{
  "message": "Review added",
  "data": {
    "id": "1",
    "user_id": "1",
    "movie_id": "1",
    "rating": 9,
    "comment": "Amazing movie!",
    "created_at": "2026-02-11T18:30:00.000Z"
  }
}
```

### PUT /api/users/reviews/:movieId
Update a review.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "rating": 10,
  "comment": "Masterpiece!"
}
```

**Response:**
```json
{
  "message": "Review updated",
  "data": { ... }
}
```

### DELETE /api/users/reviews/:movieId
Delete a review.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Review deleted"
}
```

---

## Admin Endpoints

All admin endpoints require admin authentication (role: admin or moderator).

### GET /api/admin/stats
Get system statistics.

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "total_users": 1000,
  "active_users": 850,
  "total_movies": 500,
  "total_favorites": 5000,
  "total_reviews": 2000,
  "new_users_today": 10,
  "new_users_this_week": 75,
  "new_users_this_month": 300
}
```

### GET /api/admin/users
Get all users with pagination.

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search by name, email, or username

**Response:**
```json
{
  "users": [
    {
      "id": "1",
      "username": "johndoe",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "user",
      "is_active": true,
      "created_at": "2026-02-10T12:00:00.000Z",
      "total_favorites": 10,
      "total_reviews": 5
    }
  ],
  "total": 1000,
  "page": 1,
  "totalPages": 50
}
```

### PUT /api/admin/users/:userId
Update user information.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "newemail@example.com",
  "is_active": true,
  "role": "user"
}
```

**Note:** Only super admin (role: admin) can change user roles.

**Response:**
```json
{
  "id": "1",
  "username": "johndoe",
  "email": "newemail@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2026-02-10T12:00:00.000Z",
  "updated_at": "2026-02-11T18:30:00.000Z"
}
```

### DELETE /api/admin/users/:userId
Delete a user and all their data.

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### GET /api/admin/movies/stats
Get movies with statistics.

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "movies": [
    {
      "id": "1",
      "title": "The Godfather",
      "overview": "...",
      "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      "release_date": "1972-03-14",
      "vote_average": 8.7,
      "status": "published",
      "total_favorites": 150,
      "total_reviews": 50,
      "average_rating": "8.5"
    }
  ],
  "total": 500,
  "page": 1,
  "totalPages": 25
}
```

### POST /api/admin/movies
Add a new movie to the database.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "title": "New Movie",
  "overview": "Movie description...",
  "release_date": "2026-01-01",
  "runtime": 120,
  "vote_average": 7.5,
  "vote_count": 100,
  "poster_path": "/poster.jpg",
  "backdrop_path": "/backdrop.jpg",
  "genres": "Action, Drama",
  "director": "Director Name",
  "movie_cast": "Actor 1, Actor 2",
  "status": "published"
}
```

**Response:**
```json
{
  "id": "501",
  "title": "New Movie",
  ...
}
```

### PUT /api/admin/movies/:movieId
Update movie information.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "overview": "Updated description...",
  "status": "published"
}
```

**Response:**
```json
{
  "id": "1",
  "title": "Updated Title",
  ...
}
```

### DELETE /api/admin/movies/:movieId
Delete a movie and all related data.

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

### GET /api/admin/activity
Get recent user activity.

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `limit` (optional): Number of activities to return (default: 50)

**Response:**
```json
[
  {
    "id": "signup-1",
    "user_id": "1",
    "user_name": "John Doe",
    "user_email": "user@example.com",
    "activity_type": "signup",
    "created_at": "2026-02-11T18:00:00.000Z"
  },
  {
    "id": "favorite-1",
    "user_id": "1",
    "user_name": "John Doe",
    "user_email": "user@example.com",
    "activity_type": "favorite",
    "movie_id": "1",
    "movie_title": "The Godfather",
    "created_at": "2026-02-11T18:30:00.000Z"
  }
]
```

### GET /api/admin/health
Check system health status.

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-11T18:30:00.000Z",
  "services": {
    "database": "healthy",
    "api": "healthy"
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Error message describing what went wrong"
}
```

### 401 Unauthorized
```json
{
  "error": "No authorization header" | "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required" | "Invalid or expired admin session"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Window**: 15 minutes (900,000ms)
- **Max Requests**: 100 per window

---

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: Bcrypt with 12 rounds
3. **CORS Protection**: Configurable allowed origins
4. **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
5. **Admin Sessions**: Separate session management for admin users
6. **Role-Based Access Control**: Different permissions for users, moderators, and admins

---

## Database Schema

### Users Table
- id, username, email, password_hash
- first_name, last_name, role (user/admin/moderator)
- is_active, created_at, updated_at

### Movies Table
- id, title, overview, poster_path, backdrop_path
- release_date, runtime, vote_average, vote_count
- genres, director, movie_cast, status
- created_at, updated_at, created_by

### Favorites Table
- id, user_id, movie_id, created_at

### Reviews Table
- id, user_id, movie_id, rating, comment
- created_at, updated_at

### Admin Sessions Table
- id, user_id, token, expires_at, created_at

---

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cinemamax
DB_USER=postgres
DB_PASSWORD=

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002

# Security
BCRYPT_ROUNDS=12
```

---

## Support

For issues or questions, please contact the development team or create an issue in the repository.

**Version**: 1.0.0  
**Last Updated**: February 11, 2026
