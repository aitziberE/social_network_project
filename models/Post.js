const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema(
    {
//    img: ,
        description: String,
        date: Date(),
        like: Number,
        userId: {
            type: ObjectId,
            ref: 'User',
        },
        commentIds: [{ type: ObjectId, ref: 'Comment' }],
    }, 
    { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)
module.exports = Post