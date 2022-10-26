var express = require("express");
var router = express.Router();
const multer = require("multer");
//const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { application } = require("express");

require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

let upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

router.post("/upload", upload.array("file_object"), function (req, res, next) {
  try {
    const base64data = new Buffer(req.files[0].buffer, "binary");
    
    const fileName = Math.floor(Math.random() * 100000000).toString();
    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName, // 프론트에서 받아올 수 있지 않을까요??;
      Body: base64data,
      ACL: "public-read",
      ContentType: "image/png",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("err : ", err);
        res.send({ success: false });
      } else {
        console.log("data : ", data);
        res.json({ success: true, result: data });
      }
    });
  } catch (ERR) {
    console.log("ERR : ", ERR);
    res.send({ success: false });
  }
});

module.exports = router;
