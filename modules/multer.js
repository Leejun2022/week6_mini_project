const multer = require('multer');
const aws = require('aws-sdk');
require("dotenv").config();


const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
  let upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
  });