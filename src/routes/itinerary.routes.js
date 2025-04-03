const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cacheMiddleware = require('../middleware/cache');
const itineraryController = require('../controllers/itinerary.controller');
const validateRequest = require('../middleware/validateRequest');
const { getItinerariesQuery } = require('../validationSchemas/itinerary');

// Public routes
router.get('/share/:shareableId', cacheMiddleware(300), itineraryController.getSharedItinerary);

// Protected routes
router.post('/:id/share', auth, itineraryController.generateShareableLink);
router.post('/', auth, itineraryController.createItinerary);

// Removed auth for testing
router.get('/', cacheMiddleware(300), validateRequest({'query': getItinerariesQuery}), itineraryController.getItineraries);

router.get('/:id', auth, cacheMiddleware(300), itineraryController.getItineraryById);
router.put('/:id', auth, itineraryController.updateItinerary);
router.delete('/:id', auth, itineraryController.deleteItinerary);

module.exports = router;
