import mongoose from 'mongoose';
import View from './view.js';


const CLEAN_PROJECTION = { _id: false, __v: false };

const GameDetails = mongoose.model(
  'game-details',
  new mongoose.Schema({
    sourceId: {
      type: Number,
      required: [true, 'sourceId is requird'],
      unique: true
    },
    sourceName: String,
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
  })
);

const GameRating = mongoose.model(
  'game-rating',
  new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'UserProfile', required: true },
    game: { type: mongoose.Schema.ObjectId, ref: 'GameDetails', required: true },
    thumbsUp: Boolean
  }).index({ user: 1, game: 1 }, { unique: true })
);

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
      playedGames: [Number],
      platforms: [String],
      keywords: [String],
      wishlist: [Number],
      receiveMsgs: Boolean,
      enableFriendRecs: Boolean,
      enableGameRecs: Boolean,
    },
  })
);

export default {
  CLEAN_PROJECTION,
  GameDetails,
  GameRating,
  ViewGameDetailsShort,
  UserProfile,
};

