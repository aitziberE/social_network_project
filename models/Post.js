const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema(
    {
//    img: ,
        description: String,
        date: { type: Date, default: Date.now },
        likes: { type: Number, default: 0 },
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