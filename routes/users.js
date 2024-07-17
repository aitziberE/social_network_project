const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

const { authentication, isAdmin } = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.put('/:_id', authentication, isAdmin, UserController.update)
router.delete('/:_id', authentication, isAdmin, UserController.delete)
router.post('/login', UserController.login)
router.post('/logout', authentication, UserController.logout)
router.get('/me', authentication, UserController.getConnectedUser)
router.get('/all', authentication, isAdmin, UserController.getAll)
router.get('/id/:_id', authentication, isAdmin, UserController.getById)

module.exports = router