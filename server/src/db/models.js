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


export default {
  PostText,
  PostImage
};

