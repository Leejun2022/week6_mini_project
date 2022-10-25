const { Recomments } = require("../models");

class RecommentRepository {
  findAllRecomment = async (commentId) => {
    const recomments = await Recomments.findAll(
      { where: { commentId } },
      { order: [["createdAt", "DESC"]] }
    );
    return recomments;
  };

  findOneRecomment = async (recommentId) => {
    const recomments = await Recomments.findByPk(recommentId);
    return recomments;
  };

  createRecomment = async (commentId, recomment, userKey, nickname) => {
    const createRecommentData = await Recomments.create({
      commentId,
      recomment,
      userKey,
      nickname,
    });

    return createRecommentData;
  };
  updateRecomment = async (recommentId, recomment, nickname, userKey) => {
    const updateRecommentData = await Recomments.update(
      { comment: recomment },
      { where: { recommentId, nickname, userKey } }
    );
    return updateRecommentData;
  };

  deleteReomment = async (recommentId, nickname, userKey) => {
    const deleteRecommentData = await Recomments.destroy({
      where: { recommentId, nickname, userKey },
    });
    return deleteRecommentData;
  };
}
module.exports = RecommentRepository;
