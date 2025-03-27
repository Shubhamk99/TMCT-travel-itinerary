# Travel Itinerary API

A robust RESTful API for managing travel itineraries with advanced features like sharing, caching, and GraphQL support. Built with Node.js and Express.js, this API provides a complete solution for travel planning and sharing.

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Shubhamk99/TMCT-travel-itinerary.git
cd TMCT-travel-itinerary
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
# Development with nodemon
npm run dev

# Production
npm start
```

## API Documentation

### Swagger Documentation

- URL: http://localhost:3001/api-docs
- Complete API reference

### GraphQL Playground

- URL: http://localhost:3001/graphql
- Interactive query builder
- Schema exploration
- Real-time testing

## Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Caching**: Node-cache for performance optimization
- **Documentation**: Swagger
- **Email**: Nodemailer for notifications
- **GraphQL**: Express GraphQL for alternative API
- **Security**: Express Rate Limit for API protection

## Core Features

### 1. Authentication

- User registration (`POST /api/auth/register`)
- User login with JWT (`POST /api/auth/login`)

### 2. Itinerary Management

- Create itinerary (`POST /api/itineraries`)
- Get all itineraries (`GET /api/itineraries`) (Pagination, Sorting, Filtering)
- Get specific itinerary (`GET /api/itineraries/:id`)
- Update itinerary (`PUT /api/itineraries/:id`)
- Delete itinerary (`DELETE /api/itineraries/:id`)

### 3. Sharing Feature

- Shareable Links
  - Generate unique share ID (`POST /api/itineraries/:id/share`)
  - Public access endpoint with secure data filtering (`GET /api/itineraries/share/:shareableId`)

### 4. Performance Optimizations

- Database Indexing
- Node-cache Implementation
  - 5-minute cache duration
  - Automatic cache invalidation
  - Cache hit ratio monitoring
  - Memory usage optimization

### 5. Bonus Features

- Email Notifications
- GraphQL API
  - Full CRUD operations
  - Efficient queries
  - Real-time updates
- Rate Limiting
  - 100 requests per 15 minutes
  - Custom error responses
  - IP-based tracking

## Security Features

- JWT authentication
- Rate limiting protection
- Password hashing (bcrypt)
- Request validation
- XSS protection
- Security headers
- Input sanitization
- Error handling
