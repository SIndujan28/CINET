import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  text: {
    type: String,
    required: 'Name is required',
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: String,
      created: {
        type: Date,
        default: Date.now,
      },
      postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
