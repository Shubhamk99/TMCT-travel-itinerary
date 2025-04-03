const Joi = require('joi');

// Get ininerary validation schema
const getItinerariesQuery = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).optional(),
  destination: Joi.string().optional(),
  sort: Joi.string().valid('createdAt', 'updatedAt').optional()
})

module.exports = {
  getItinerariesQuery
}