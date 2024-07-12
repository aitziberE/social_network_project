const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
  async register(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10)
      const user = await User.create({ ...req.body, password: password })
        res.status(201).send({ message: 'Usuario registrado con éxito', user })
    } catch (error) {
      error.origin = 'usuario'
      next(error)
      res.status(500).send({ message: 'Ha habido un problema con el registro' })
    }
  },

 async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      })
      const token = jwt.sign({ _id: user._id }, jwt_secret)
      if (user.tokens.length > 4) user.tokens.shift()
        user.tokens.push(token)
      await user.save()
      res.send({ message: 'Bienvenid@ ' + user.name, token })
    } catch (error) {
      console.error(error)
    }
  },
  
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      })
      res.send({ message: 'Desconectado con éxito' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        message: 'Hubo un problema al intentar desconectar al usuario',
      })
    }
  },  
  
  async getConnectedUser(req,res){
    try {
      const user = await User.findOne({ tokens: req.headers.authorization }).select()
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.status(200).send({ message: 'Sesión iniciada como ' + user })

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hubo un problema al obtener la información del usuario' });
    }
  },
  
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const users = await User.find()
        .limit(limit)
        .skip((page - 1) * limit)
      res.send(users)
    } catch (error) {
      console.error(error)
    }
  },

/*   async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
      res.send(user)
    } catch (error) {
      console.error(error)
    }
  }, */
 
 
/*   async getUsersByName(req, res) {
    try {
      const name = new RegExp(req.params.name, 'i')
      const users = await User.find({ name })
      res.send(users)
    } catch (error) {
      console.log(error)
    }
  }, */

 /*  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params._id,
        req.body,
       // El atributo new: true hará que nos devuelva el objeto modificado. Si no lo pasamos, devolverá el objeto antes de ser modificado. 
        { new: true }
      )
      res.send({ message: 'user successfully updated', user })
    } catch (error) {
      console.error(error)
    }
  }, */
 
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id)
      res.send({ user, message: 'User deleted' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'there was a problem trying to remove the user',
        })
    }
  }

}

module.exports = UserController