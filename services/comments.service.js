const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);
    return allComment;
  };

  createComment = async (postId, commentId, nickname) => {
    const createCommentData = await this.commentRepository.createComment(
      postId,
      commentId,
      nickname
    );
    return {
      comment: createCommentData.comment,
      nickname: createCommentData.nickname,
      createdAt: createCommentData.createdAt,
    };
  };

  updateComment = async (commentId, nickname) => {
    const updateCommentData = await this.commentRepository.updateComment(
      commentId,
      nickname
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
