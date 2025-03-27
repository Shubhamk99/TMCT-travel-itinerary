require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { graphqlHTTP } = require('express-graphql');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const itineraryRoutes = require('./routes/itinerary.routes');
const errorHandler = require('./middleware/errorHandler');
const schema = require('./graphql/schema');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all routes
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Travel Itinerary API is running' });
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Itinerary API',
      version: '1.0.0',
      description: 'API for managing travel itineraries'
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    path.resolve(__dirname, 'docs/auth/*.js'),
    path.resolve(__dirname, 'docs/itinerary/*.js')
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// GraphQL endpoint
app.use('/graphql', auth, graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

// REST Routes
app.use('/api/auth', authRoutes);
app.use('/api/itineraries', itineraryRoutes);

// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('MongoDB connection successful');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`REST API Documentation: http://localhost:${port}/api-docs`);
      console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
