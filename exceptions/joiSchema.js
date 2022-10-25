const joi = require("joi");

const userIdRegEx = /^[A-Za-z0-9]{3,20}$/;
const nicknameRegEx = /^[A-Za-z0-9]{3,20}$/;
const passwordRegEx = /^[A-Za-z0-9]{3,20}$/;

exports.userSchema = joi.object({
  userId: joi.string().pattern(userIdRegEx).required(),
  password: joi.string().pattern(passwordRegEx).required(),
  nickname: joi.string().pattern(nicknameRegEx).required(),
  confirm: joi.string(),
});
exports.nicknameSchema = joi.object({
  nickname: joi.string().pattern(nicknameRegEx).required(),
});
