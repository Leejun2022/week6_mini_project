var express = require("express");
var router = express.Router();
const multer = require("multer");
//const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
//const { application } = require("express");
// const authMiddleware = require("../middlewares/auth-middleware");
// const PostService = require("../services/posts.service");

require("dotenv").config();

//postService = new PostService();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

let upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

router.post("/upload", upload.array("file_object"), async (req, res, next) => {
    //const findPost = await this.postService.findPostById(postId);
    try {
      const base64data = new Buffer(req.files[0].buffer, "binary");

      const fileName = Math.floor(Math.random() * 100000000).toString();

      //const { userKey } = res.locals.user;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: base64data,
        ACL: "public-read",
        ContentType: "image/png",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log("err : ", err);
          res.send({ success: false });
        } else {
          console.log("data : ", data.Location);
          res.json({ success: true, result: data });
        }
      });

      //const image = data.Location;

      //await Images.create({ userKey, image });
    } catch (ERR) {
      console.log("ERR : ", ERR);
      res.send({ success: false });
    }
  }
);

module.exports = router;
