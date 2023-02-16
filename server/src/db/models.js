import mongoose from 'mongoose';


/** Post with text content */
const PostText = mongoose.model(
  'post-text',
  new mongoose.Schema({
    username: String,
    text: String
  })
);

/** Post with image content */
const PostImage = mongoose.model(
  'post-image',
  new mongoose.Schema({
    username: String,
    imageUrl: String
  })
);
/**list of games with appid and name */
const allGames = mongoose.model(
  'all-games', 
  new mongoose.Schema({
    appid: Number,
    name: String
  })
);

// const 

export default {
  PostText,
  PostImage
};

