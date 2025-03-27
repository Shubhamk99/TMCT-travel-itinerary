const NodeCache = require('node-cache');

// Initialize cache with a default TTL of 10 minutes and check period of 600 seconds
const cache = new NodeCache({
  stdTTL: 600, // Time to live in seconds
  checkperiod: 600, // Cleanup dead objects every 10 minutes
  useClones: false // For better performance
});

module.exports = cache;
