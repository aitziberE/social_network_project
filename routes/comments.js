const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')

const { authentication } = require('../middlewares/authentication')

router.post('/', authentication, CommentController.create)
router.get('/', CommentController.getAll)
router.get('/id/:_id', CommentController.getById)
router.delete('/:_id', authentication, CommentController.delete)
router.put('/:_id', authentication, CommentController.update)

module.exports = router