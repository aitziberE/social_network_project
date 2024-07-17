require("dotenv").config()
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
        res.status(500).send({ message: 'Ha habido un problema al crear el post' })
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
      res.status(500).send({ message: 'Ha habido un problema al actualizar el post' })
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
          message: 'Ha surgido un problema al tratar de eliminar el post',
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
      const post = await Post.findById(req.params._id).populate('commentIds')
      if (!post) {
        return res.status(404).send({ message: 'Post no encontrado' })
      }
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Hubo un problema al obtener el post' })
    }
  },

  async getByDescription(req, res) {
    try {
      const description = new RegExp(req.params.description, 'i')
      const posts = await Post.find({ description })
        .populate('userId')
        .populate('commentIds')
  
      if (!posts.length) {
        return res.status(404).send({ message: 'Post no encontrado' })
      }
      res.send(posts)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Hubo un problema al obtener el post' })
    }
  },

  async like(req, res) {
    try {
      const post = await Post.findById(req.params._id)
      if (post.likes.includes(req.user._id)) {
        return res.status(400).send({ message: 'Ya has dado like a este post' })
      }
      await Post.findByIdAndUpdate(
        req.params._id,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      )
      await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { likedPosts: req.params._id } },
        { new: true }
      )
      res.send({ message: 'Like agregado con éxito', post })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Hubo un problema con tu solicitud" })
    }    
  },    

  async unlike(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      if (!post.likes.includes(req.user._id)) {
        return res.status(400).send({ message: 'No has dado like a este post' })
      }
      await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      )
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likedPosts: req.params._id } },
        { new: true }
      )
      res.send({ message: 'Like eliminado con éxito', post })
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema con tu solicitud" })
    }
  }
}

module.exports = PostController