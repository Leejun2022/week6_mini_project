const { Comments } = require("../models");

class CommentRepository {
  findAllComment = async (postId) => {
    const comments = await Comments.findAll(
      { where: { postId } },
      { order: [["createdAt", "DESC"]] }
    );
    //
    return comments;
  };

  findOneComment = async (commentId) => {
    const comments = await Comments.findByPk(commentId);
    return comments;
  };

  createComment = async (postId, comment, nickname) => {
    const createCommentData = await Comments.create({
      postId,
      comment,
      nickname,
    });

    return createCommentData;
  };

  updateComment = async (commentId, comment, nickname) => {
    const updateCommentData = await Comments.update(
      { comment: comment },
      { where: { commentId, nickname } }
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, nickname) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, nickname },
    });
    return deleteCommentData;
  };
}

module.exports = CommentRepository;
