const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const authMiddleware = require('../middlewares/auth-middleware')

const ImagesController = require('../controllers/images.controller');
const imagesController = new ImagesController();

router.post('/:postId', authMiddleware, upload.array('image', 5), imagesController.uploadImage);
router.delete('/:postId', authMiddleware, imagesController.deleteImage );


module.exports = router;