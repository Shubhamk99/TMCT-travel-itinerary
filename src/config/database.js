const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', process.env.MONGODB_URI);

    const options = {
      autoCreate: true
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB connected successfully');
    
    // Get the database instance
    const db = mongoose.connection.db;
    console.log(`Connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    process.exit(1);
  }
};

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = { connectDB };
