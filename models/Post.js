const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema(
    {
        description: String,
        date: { type: Date, default: Date.now },
        likes: [{ type: ObjectId, ref: 'User' }],
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        commentIds: [{ type: ObjectId, ref: 'Comment' }],
    }, 
    { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)
module.exports = Post