const Itinerary = require('../models/itinerary.model');
const { sendEmail } = require('../config/email');
const User = require('../models/user.model');
const crypto = require('crypto');

class ItineraryService {
  async createItinerary(userId, itineraryData) {
    try {
      const itinerary = new Itinerary({
        ...itineraryData,
        userId,
        shareableId: crypto.randomBytes(16).toString('hex')
      });
      
      const savedItinerary = await itinerary.save();
      
      // Send email notification
      const user = await User.findById(userId);
      await this.sendCreationEmail(user.email, savedItinerary);
      
      return savedItinerary;
    } catch (error) {
      throw new Error(`Error creating itinerary: ${error.message}`);
    }
  }

  async getItineraries(userId, page = 1, limit = 10, filters = {}) {
    try {
      const skip = (page - 1) * limit;
      const query = { userId };
      
      // Add destination filter if provided
      if (filters.destination) {
        query.destination = new RegExp(filters.destination, 'i');
      }

      // Build sort object
      let sort = { createdAt: -1 }; // default sort
      if (filters.sort) {
        sort = { [filters.sort]: 1 };
      }

      const [itineraries, total] = await Promise.all([
        Itinerary.find(query)
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit))
          .lean()
          .exec(),
        Itinerary.countDocuments(query)
      ]);
      
      return {
        itineraries: itineraries.map(itinerary => ({
          ...itinerary,
          startDate: itinerary.startDate.toISOString().split('T')[0],
          endDate: itinerary.endDate.toISOString().split('T')[0]
        })),
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalItems: total
      };
    } catch (error) {
      throw new Error(`Error fetching itineraries: ${error.message}`);
    }
  }

  async getItineraryById(userId, itineraryId) {
    try {
      const itinerary = await Itinerary.findOne({
        _id: itineraryId,
        userId
      }).lean().exec();
      
      if (!itinerary) {
        throw new Error('Itinerary not found');
      }
      
      return {
        ...itinerary,
        startDate: itinerary.startDate.toISOString().split('T')[0],
        endDate: itinerary.endDate.toISOString().split('T')[0]
      };
    } catch (error) {
      throw new Error(`Error fetching itinerary: ${error.message}`);
    }
  }

  async updateItinerary(userId, itineraryId, updateData) {
    try {
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId, userId },
        updateData,
        { new: true, runValidators: true }
      ).lean().exec();
      
      if (!itinerary) {
        throw new Error('Itinerary not found');
      }
      
      return {
        ...itinerary,
        startDate: itinerary.startDate.toISOString().split('T')[0],
        endDate: itinerary.endDate.toISOString().split('T')[0]
      };
    } catch (error) {
      throw new Error(`Error updating itinerary: ${error.message}`);
    }
  }

  async deleteItinerary(userId, itineraryId) {
    try {
      const result = await Itinerary.deleteOne({
        _id: itineraryId,
        userId
      });
      
      if (result.deletedCount === 0) {
        throw new Error('Itinerary not found');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error deleting itinerary: ${error.message}`);
    }
  }

  async generateShareableLink(userId, itineraryId) {
    try {
      const itinerary = await Itinerary.findOne({
        _id: itineraryId,
        userId
      });

      if (!itinerary) {
        throw new Error('Itinerary not found');
      }

      // Generate a new shareable ID if one doesn't exist
      if (!itinerary.shareableId) {
        itinerary.shareableId = crypto.randomBytes(16).toString('hex');
        await itinerary.save();
      }

      // Return the full URL
      const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
      return `${baseUrl}/api/itineraries/share/${itinerary.shareableId}`;
    } catch (error) {
      throw new Error(`Error generating shareable link: ${error.message}`);
    }
  }

  async getSharedItinerary(shareableId) {
    try {
      const itinerary = await Itinerary.findOne({ shareableId })
        .select('-userId')
        .lean()
        .exec();

      if (!itinerary) {
        throw new Error('Shared itinerary not found');
      }

      return {
        ...itinerary,
        startDate: itinerary.startDate.toISOString().split('T')[0],
        endDate: itinerary.endDate.toISOString().split('T')[0]
      };
    } catch (error) {
      throw new Error(`Error fetching shared itinerary: ${error.message}`);
    }
  }

  async sendCreationEmail(userEmail, itinerary) {
    try {
      await sendEmail({
        to: userEmail,
        subject: 'New Itinerary Created',
        text: `Your itinerary "${itinerary.title}" has been created successfully.`,
        html: `
          <h1>New Itinerary Created</h1>
          <p>Your itinerary <strong>${itinerary.title}</strong> has been created successfully.</p>
          <h2>Details:</h2>
          <ul>
            <li>Destination: ${itinerary.destination}</li>
            <li>Start Date: ${itinerary.startDate.toISOString().split('T')[0]}</li>
            <li>End Date: ${itinerary.endDate.toISOString().split('T')[0]}</li>
          </ul>
          <p>Number of activities: ${itinerary.activities.length}</p>
        `
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Don't throw error as email sending is not critical
    }
  }
}

module.exports = new ItineraryService();
