const CommentService = require("../services/comments.service");

class CommentController {
  commentContorller = new CommentService();

  // 댓글 조회 API
  getComment = async (req, res) => {
    const { postId } = req.params;
    const comments = await this.commentContorller.findAllComment(postId);

    res.status(200).json({ data: comments });
  };

  // 댓글 생성 API
  createComment = async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const { nickname } = res.locals.user;
    const createCommentData = await this.commentContorller.createComment(
      postId,
      comment,
      nickname
    );
    res.status(200).json({ data: createCommentData });
  };

  // 댓글 수정 API
  updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    const updateComment = await this.commentContorller.updateComment(
      commentId,
      comment
    );
    res.status(200).json({ message: "댓글을 수정했습니다." });
  };

  //댓글 삭제 API
  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { nickname } = res.locals.user;
    const deleteComment = await this.commentContorller.deleteComment(
      commentId,
      nickname
    );
    res.status(200).json({ message: "댓글을 삭제했습니다." });
  };
}

module.exports = CommentController;
