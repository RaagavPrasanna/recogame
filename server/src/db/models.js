import mongoose from 'mongoose';
import View from './view.js';


const GameDetails = mongoose.model(
  'game-details',
  new mongoose.Schema({
    steamId: {
      type: Number,
      required: [true, 'steamId is requird'],
      unique: true
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
  })
);


const SchemaGameDetailsBasic = new mongoose.Schema({
  name: String,
  developers: [String],
  shortDescription: String,
  imageHeader: String
});


const ViewAllGames = new View(
  'view-game-all',
  SchemaGameDetailsBasic,
  'game-details',
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

const ViewGameDetailsBasic = new View(
  'view-game-details-basic',
  SchemaGameDetailsBasic,
  'game-details',
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


export default {
  GameDetails,
  ViewAllGames,
  ViewGameDetailsBasic
};

