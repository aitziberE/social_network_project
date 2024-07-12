const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

const PostController = {
  async create(req, res) {
      try {
        const post = await Post.create({...req.body, userId: req.user._id})
        await User.findByIdAndUpdate(req.user._id, { $push: { postIds: post._id }})
        res.status(201).send({ message: 'Post creado con éxito', post })
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
      res.send({ message: 'Post actualizado con éxito', post })
    } catch (error) {
      console.error(error)
    }
  },

  async delete(req, res) {
   try {
      const post = await Post.findByIdAndDelete(req.params._id)
      if (!post) {
        return res.status(404).send({ message: 'Post no encontrado' });
      }
      res.send({ post, message: 'Post eliminado' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'ha surgido un problema al tratar de eliminar el post',
        })
    }
  },

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const posts = await Post.find()
        .populate({
          path: 'userId', 
          select: 'name', 
        })
        .populate({
          path: 'commentIds',
          populate: {
            path: 'userId',
          },
        })
        .limit(limit)
        .skip((page - 1) * limit)
      res.send(posts)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Hubo un problema al obtener los posts' });
    }  
  },

  async getById(req, res) {
    try {
      const post = await Post.findById(req.post._id).populate('commentIds')
      res.send(post)
    } catch (error) {
      console.error(error)
    }
  },

  async getByDescription(req, res) {
    try {
      const post = await Post.findOne(req.body.description)
        .populate('userId')
        .populate('commentIds')
  
      if (!post) {
        return res.status(404).send({ message: 'Post no encontrado' });
      }
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Hubo un problema al obtener el post' });
    }
  },

  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
      req.params._id, { $push: { likes: req.user._id } },{ new: true })
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likedPosts: req.params._id } },
        { new: true })
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "There was a problem with your request" })
      }    
  },    
}

module.exports = PostController