const itineraryService = require('../services/itinerary.service');
const { successResponse, errorResponse } = require('../utils/responseWrapper');

class ItineraryController {
  async createItinerary(req, res) {
    try {
      const itinerary = await itineraryService.createItinerary(
        req.user._id,
        {
          ...req.body,
          startDate: new Date(req.body.startDate),
          endDate: new Date(req.body.endDate)
        }
      );
      res.status(201).json({
        success: true,
        data: itinerary
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

// Changes are made for testing
  async getItineraries(req, res) {
    try {
      const { page = 1, limit = 10, destination, sort } = req.query;
      const filters = {
        destination,
        sort
      };
      
      const result = await itineraryService.getItineraries(
        'req.user._id',
        parseInt(page),
        parseInt(limit),
        filters
      );

      return successResponse(res, result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async getItineraryById(req, res) {
    try {
      const itinerary = await itineraryService.getItineraryById(
        req.user._id,
        req.params.id
      );
      res.json({
        success: true,
        data: itinerary
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateItinerary(req, res) {
    try {
      const itinerary = await itineraryService.updateItinerary(
        req.user._id,
        req.params.id,
        {
          ...req.body,
          startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
          endDate: req.body.endDate ? new Date(req.body.endDate) : undefined
        }
      );
      res.json({
        success: true,
        data: itinerary
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteItinerary(req, res) {
    try {
      await itineraryService.deleteItinerary(req.user._id, req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async generateShareableLink(req, res) {
    try {
      const shareableLink = await itineraryService.generateShareableLink(
        req.user._id,
        req.params.id
      );
      res.json({
        success: true,
        message: 'Shareable link generated successfully',
        data: { shareableLink }
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getSharedItinerary(req, res) {
    try {
      const itinerary = await itineraryService.getSharedItinerary(
        req.params.shareableId
      );
      res.json({
        success: true,
        message: 'Shared itinerary retrieved successfully',
        data: itinerary
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ItineraryController();
