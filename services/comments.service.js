const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);
    return allComment;
  };

  createComment = async (postId, comment, nickname) => {
    const createCommentData = await this.commentRepository.createComment(
      postId,
      comment,
      nickname
    );
    return {
      comment: createCommentData.comment,
      nickname: createCommentData.nickname,
      createdAt: createCommentData.createdAt,
    };
  };

  updateComment = async (commentId, comment) => {
    const updateCommentData = await this.commentRepository.updateComment(
      commentId,
      comment
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, nickname) => {
    const deleteCommentData = await this.commentRepository.deleteComment(
      commentId,
      nickname
    );
    return deleteCommentData;
  };
}

module.exports = CommentService;
