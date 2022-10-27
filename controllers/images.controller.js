const PostsService = require("../services/posts.service");
const aws = require("aws-sdk");
require("dotenv").config();

class ImagesController {
  postsService = new PostsService();

  uploadImage = async (req, res, next) => {
    try {
      console.log(req.file);
      const imageUrl = req.file.location;
      if (!imageUrl) {
        es.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };

  uploadImages = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      console.log(postId);

      const images = req.files;
      const imageUrls = images.map((img) => img.location);

      if (!images) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }

      //이미지url을 DB에 저장할 필요가 없어 보입니다.
      await this.postsService.uploadImages(imageUrls, userId, postId);

      res.status(200).send(imageUrls);
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (req, res, next) => {
    try{
    const { name } = req.body;
    console.log(name)

    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
    };

    s3.deleteObject(params, function (err, data) {
      if (err) {console.log(err, err.stack)}
      else {
        res.status(200).json({message : '이미지가 지워졌네요.'});
      } 
      /*
      data = {
      }
      */
    });

  }catch(error){
    next(error)
  }

  };
}

module.exports = ImagesController;