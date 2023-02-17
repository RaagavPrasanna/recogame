import mongoose from 'mongoose';

/**list of games with appid and name */
const AllGames = mongoose.model(
  'all-games', 
  new mongoose.Schema({
    appid: Number,
    name: String
  })
);

const GameDetail = mongoose.model(
  'game-detail', 
  new mongoose.Schema({
    steamId: Number,
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
  GameDetail
};

