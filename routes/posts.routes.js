const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const authMiddleware = require('../middlewares/auth-middleware')

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

router.get('/image/:postId', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
router.post('/', authMiddleware, postsController.createPost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);
router.post('/image/:postId', authMiddleware, upload.array('image',5), imagesController.uploadImages);

module.exports = router;
