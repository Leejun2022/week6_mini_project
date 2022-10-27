const express = require("express");
const router = express.Router();
//const authMiddleware = require(""); //jwt미들웨어 추후 수정요함
const authMiddleware = require('../middlewares/auth-middleware')

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

router.get("/:postId", commentsController.getComment); // 해당 게시물 댓글 전체조회
router.post("/:postId", authMiddleware, commentsController.createComment); // 댓글생성
router.put("/:commentId", authMiddleware, commentsController.updateComment); //댓글수정
router.delete("/:commentId", authMiddleware, commentsController.deleteComment); //댓글삭제

module.exports = router;
