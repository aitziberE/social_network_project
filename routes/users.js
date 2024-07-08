const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/', UserController.register)
router.post('/', UserController.login)
router.put('/', UserController.logout)
router.get('/me', UserController.getConnectedUser)
// router.get('/me', UserController.getConnectedUser)
router.get('/all', UserController.getAll)

// router.post('/', UserController.create)
// router.get('/', UserController.getAll)
// router.get('/id/:_id', UserController.getById)
// router.get('/name/:name', UserController.getUsersByName)
// router.delete('/:_id', UserController.delete)
// router.put('/:_id', UserController.update)

module.exports = router