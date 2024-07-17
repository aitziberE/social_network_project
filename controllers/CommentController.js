require("dotenv").config()
const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')

const CommentController = {
    
    async create(req, res) {
      try {
        const comment = await Comment.create({ ...req.body, userId: req.user._id })
        await Post.findByIdAndUpdate(req.body.postId, { $push: { commentIds: comment._id } })
        await User.findByIdAndUpdate(req.user._id, { $push: { commentIds: comment._id } })
        res.status(201).send({ message: 'Comentario creado con éxito', comment })
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Hubo un problema al crear el comentario' })
      }
    },

    async getAll(req, res) {
      try {
        const comments = await Comment.find().populate('userId').populate('postId')
        res.send(comments)
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Hubo un problema al obtener los comentarios' })
      }
    },

    async getById(req, res) {
      try {
        const comment = await Comment.findById(req.params._id).populate('userId').populate('postId')
        if (!comment) {
          return res.status(404).send({ message: 'Comentario no encontrado' })
        }
        res.send(comment)
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema al obtener el comentario' })
      }
    },

    async delete(req, res) {
      try {
        const comment = await Comment.findByIdAndDelete(req.params._id);
        if (!comment) {
          return res.status(404).send({ message: 'Comentario no encontrado' });
        }
        await Post.findByIdAndUpdate(comment.postId, { $pull: { commentIds: comment._id } })
        await User.findByIdAndUpdate(comment.userId, { $pull: { commentIds: comment._id } })
        res.send({ message: 'Comentario eliminado', comment })
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema al eliminar el comentario' })
      }
    },

    async update(req, res) {
      try {
        const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, { new: true })
        res.send({ message: 'Comentario actualizado con éxito', comment })
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema al actualizar el comentario' })
      }
    }
  }
  module.exports = CommentController  