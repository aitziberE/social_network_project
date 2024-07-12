const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

const PostController = {
    async create(req, res) {
        try {
          const post = await Post.create({
            ...req.body,
            userId: req.user._id,
          })
          res.status(201).send(post)
        } catch (error) {
          console.error(error)
        }
    },

    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { ...req.body, userId: req.user._id },
            { new: true }
          )
          res.send({ message: 'post successfully updated', post })
        } catch (error) {
          console.error(error)
        }
      },
     
     
}
module.exports = PostController