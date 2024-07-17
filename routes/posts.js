const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

const { authentication, isAdmin, isAuthor } = require('../middlewares/authentication')

router.post('/', authentication, PostController.create)
router.put('/id/:_id', authentication, PostController.update)
router.delete('/id/:_id', authentication, isAdmin, isAuthor, PostController.delete)
router.get('/all', PostController.getAll)
router.get('/id/:_id', authentication, isAdmin, PostController.getById)
router.get('/description/:description', PostController.getByDescription)
router.put('/like/:_id', authentication, PostController.like)
router.put('/unlike/:_id', authentication, PostController.unlike);

module.exports = router