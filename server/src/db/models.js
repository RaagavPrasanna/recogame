import mongoose from 'mongoose';

/**list of games with appid and name */
const AllGames = mongoose.model(
  'all-games',
  new mongoose.Schema({
    appid: {
      type: Number,
      required: true,
      unique: true
    },
    name: String,
  })
);

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

export default {
  AllGames,
  GameDetails
};

