const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

const { authentication } = require('../middlewares/authentication')

router.post('/', authentication, PostController.create)
router.put('/id/:_id', authentication, PostController.update)
router.delete('/id/:_id', authentication, PostController.delete)
router.get('/all', PostController.getAll)
router.get('/id/:_id', PostController.getById)

// router.post('/', PostController.create)
// router.get('/', PostController.getAll)
// router.get('/name/:name', PostController.getPostsByName)
// router.delete('/:_id', PostController.delete)
// router.put('/:_id', PostController.update)

//aplicar autenticación de login al crear posts
// router.get('/', ProductController.getAll)
// router.get('/id/:_id', ProductController.getById)
// router.get('/name/:name', ProductController.getProductsByName)
// router.post('/', authentication, ProductController.create)
// router.delete('/:_id', authentication, ProductController.delete)
// router.put('/:_id', authentication, ProductController.update)

// const { authentication, isAdmin } = require('../middlewares/authentication')

// router.get('/', ProductController.getAll)
// router.get('/id/:_id', ProductController.getById)
// router.get('/name/:name', ProductController.getProductsByName)
// router.post('/', authentication, isAdmin, ProductController.create)
// router.delete('/:_id', authentication, isAdmin, ProductController.delete)
// router.put('/:_id', authentication, isAdmin, ProductController.update)



module.exports = router