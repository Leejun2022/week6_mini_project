const RecommentRepository = require("../repositories/recomments.repository");

class RecommentService {
  recommentservice = new RecommentRepository();

  findAllRecomment = async (commentId) => {
    const allRecomment = await this.recommentservice.findAllRecomment(
      commentId
    );
    return allRecomment;
  };

  createRecomment = async (commentId, comment, nickname) => {
    const createRecommentData = await this.recommentservice.createRecomment(
      commentId,
      comment,
      nickname
    );
    return {
      comment: createRecommentData.comment,
      nickname: createRecommentData.nickname,
      createdAt: createRecommentData.createdAt,
    };
  };

  updateRecomment = async (recommentId, nickname) => {
    const updateRecommentData = await this.recommentservice.updateRecomment(
      recommentId,
      nickname
    );
    return updateRecommentData;
  };

  deleteRecomment = async (recommentId, nickname) => {
    const deleteRecommentData = await this.recommentservice.deleteReomment(
      recommentId,
      nickname
    );
    return deleteRecommentData;
  };
}

module.exports = RecommentService;
