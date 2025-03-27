const cache = require('../config/cache');

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    try {
      // Only cache GET requests
      if (req.method !== 'GET') {
        return next();
      }

      const key = req.originalUrl || req.url;
      const cachedResponse = cache.get(key);

      if (cachedResponse) {
        console.log(`Cache hit for ${key}`);
        return res.json(cachedResponse);
      }

      // Store the original json method
      const originalJson = res.json;

      // Override res.json method to cache the response
      res.json = function (body) {
        // Store the response in cache
        cache.set(key, body, duration);
        console.log(`Cache set for ${key}`);
        
        // Call the original json method
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

module.exports = cacheMiddleware;
