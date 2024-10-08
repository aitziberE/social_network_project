const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const CommentSchema = new mongoose.Schema(
  {
    content: String,
    date: { type: Date, default: Date.now },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
 }, 
 { timestamps: true }
)

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment