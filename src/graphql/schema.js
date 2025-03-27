const { makeExecutableSchema } = require('@graphql-tools/schema');
const Itinerary = require('../models/itinerary.model');
const User = require('../models/user.model');

const typeDefs = `
  type Activity {
    time: String!
    description: String!
    location: String!
  }

  type Itinerary {
    _id: ID!
    title: String!
    destination: String!
    startDate: String!
    endDate: String!
    activities: [Activity!]!
    userId: ID!
    user: User
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    email: String!
    itineraries: [Itinerary!]!
  }

  type Query {
    itineraries(page: Int, limit: Int): [Itinerary!]!
    itinerary(id: ID!): Itinerary
    myItineraries: [Itinerary!]!
  }

  input ActivityInput {
    time: String!
    description: String!
    location: String!
  }

  input CreateItineraryInput {
    title: String!
    destination: String!
    startDate: String!
    endDate: String!
    activities: [ActivityInput!]!
  }

  type Mutation {
    createItinerary(input: CreateItineraryInput!): Itinerary!
    updateItinerary(id: ID!, input: CreateItineraryInput!): Itinerary!
    deleteItinerary(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    itineraries: async (_, { page = 1, limit = 10 }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const skip = (page - 1) * limit;
      return await Itinerary.find({ userId: user._id }).skip(skip).limit(limit);
    },
    itinerary: async (_, { id }, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Itinerary.findOne({ _id: id, userId: user._id });
    },
    myItineraries: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Itinerary.find({ userId: user._id });
    }
  },
  Mutation: {
    createItinerary: async (_, { input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const itinerary = new Itinerary({
        ...input,
        userId: user._id
      });
      return await itinerary.save();
    },
    updateItinerary: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Itinerary.findOneAndUpdate(
        { _id: id, userId: user._id },
        input,
        { new: true }
      );
    },
    deleteItinerary: async (_, { id }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const result = await Itinerary.deleteOne({ _id: id, userId: user._id });
      return result.deletedCount === 1;
    }
  },
  Itinerary: {
    user: async (itinerary) => {
      return await User.findById(itinerary.userId);
    }
  },
  User: {
    itineraries: async (user) => {
      return await Itinerary.find({ userId: user._id });
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
