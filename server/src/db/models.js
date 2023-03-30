import mongoose from 'mongoose';
import View from './view.js';

// To get rid of fields in the returned object
const CLEAN_PROJECTION = { _id: false, __v: false };

// Model that represents a games full details in the db
const GameDetails = mongoose.model(
  'game-details',
  new mongoose.Schema({
    sourceId: {
      type: Number,
      required: [true, 'sourceId is required'],
    },
    sourceName: {
      type: String,
      required: [true, 'sourceName is required'],
    },
    name: String,
    developers: [String],
    publishers: [String],
    imageHeader: String,
    imageBackground: String,
    categories: [String],
    genres: [String],
    storeUrl: String,
    detailedDescription: String,
    shortDescription: String,
    supportedLanguages: [String],
    platforms: [String],
    metacritic: String,
    screenshots: [String],
    movies: [String],
    recommendations: Number,
    background: String,
    contentDescriptors: String
  }).index({ sourceId: 1, sourceName: 1 }, { unique: true })
);

// View that represents a games short details in the db
const ViewGameDetailsShort = new View(
  'view-game-details-short',
  'game-details',
  new mongoose.Schema({
    name: String,
    developers: [String],
    shortDescription: String,
    imageHeader: String
  }),
  [{
    $project: {
      id: '$_id',
      name: true,
      developers: true,
      shortDescription: true,
      imageHeader: true
    }
  }]
);

// View for just the name of the game
const ViewGameName = new View(
  'view-game-name',
  'game-details',
  new mongoose.Schema({
    name: String,
  }),
  [{
    $project: {
      id: '$_id',
      name: true
    }
  }]
);

// Model that represents a user's profile in the db
const UserProfile = mongoose.model(
  'user-profile',
  new mongoose.Schema({
    userId: {
      type: String,
      required: [true, 'userId is required'],
      unique: true
    },
    profileName: String,
    profilePicture: String,
    preferences: {
      playedGames: [String],
      platforms: [String],
      genres: [String],
      categories: [String],
      wishlist: [String],
      receiveMsgs: { type: Boolean, default: true },
      enableFriendRecs: { type: Boolean, default: true },
      enableGameRecs: { type: Boolean, default: true },
    },
    accountType: String
  })
);

// Model that represents a deprecated game in the db
const DeprecatedGames = mongoose.model(
  'deprecated-games',
  new mongoose.Schema({
    sourceId: {
      type: Number,
      required: [true, 'sourceId is required'],
      unique: true
    }
  })
);

export default {
  CLEAN_PROJECTION,
  GameDetails,
  ViewGameDetailsShort,
  ViewGameName,
  UserProfile,
  DeprecatedGames
};

