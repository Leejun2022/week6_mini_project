const RecommentRepository = require("../repositories/recomments.repository");

class RecommentService {
  recommentservice = new RecommentRepository();

  findAllRecomment = async (commentId) => {
    const allRecomment = await this.recommentservice.findAllRecomment(
      commentId
    );
    return allRecomment;
  };

  createRecomment = async (commentId, recomment, userKey, nickname) => {
    const createRecommentData = await this.recommentservice.createRecomment(
      commentId,
      recomment,
      userKey,
      nickname
    );
    return {
      recomment: createRecommentData.recomment,
      nickname: createRecommentData.nickname,
      createdAt: createRecommentData.createdAt,
    };
  };

  updateRecomment = async (recommentId, recomment, nickname, userKey) => {
    const updateRecommentData = await this.recommentservice.updateRecomment(
      recommentId,
      recomment,
      nickname,
      userKey
    );
    return updateRecommentData;
  };

  deleteRecomment = async (recommentId, nickname, userKey) => {
    const deleteRecommentData = await this.recommentservice.deleteReomment(
      recommentId,
      nickname,
      userKey
    );
    return deleteRecommentData;
  };
}

module.exports = RecommentService;
