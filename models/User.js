const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const UserSchema = new mongoose.Schema(
 {
  firstName: {
   type: String,
   required: [true, 'Por favor rellena tu nombre'],
   },
  lastName: {
   type: String,
   required: [true, 'Por favor rellena tu apellido'],
  },
  age: {
    type: Number,
    required: [true, 'Por favor rellena tu edad'],
    validate: {
      validator: function (value) {
        return value >= 18;
      },
      message: 'Debes tener 18 años o más',
    }
  },
   username: {
   type: String,
   unique: true,
   required: [true, 'Por favor rellena tu nombre de usuario'],
   },
   email: {
   type: String,
   match: [/.+\@.+\..+/, 'Este correo no es válido'],
   unique: true,
   required: [true, 'Por favor rellena tu correo'],
   },
   password: {
   type: String,
   required: [true, 'Por favor rellena tu contraseña'],
   },
   tokens: [],
   likedPosts: [{ type: ObjectId, ref: 'Post' }],
   postIds: [{ type: ObjectId, ref: 'Post' }],
   commentIds:[{ type: ObjectId, ref: 'Comment'}]
 },
 { timestamps: true }
)

UserSchema.methods.toJSON = function () {
  const user = this._doc
  delete user.tokens
  delete user.password
  return user
 }
 
const User = mongoose.model('User', UserSchema)
module.exports = User