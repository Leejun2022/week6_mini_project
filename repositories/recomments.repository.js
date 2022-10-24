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

  createRecomment = async (commentId, comment, nickname) => {
    const createRecommentData = await Recomments.create({
      commentId,
      comment,
      nickname,
    });

    return createRecommentData;
  };
  updateRecomment = async (recommentId, comment, nickname) => {
    const updateRecommentData = await Recomments.update(
      { comment: comment },
      { where: { recommentId, nickname } }
    );
    return updateRecommentData;
  };

  deleteReomment = async (recommentId, nickname) => {
    const deleteRecommentData = await Recomments.destroy({
      where: { recommentId, nickname },
    });
    return deleteRecommentData;
  };
}
module.exports = RecommentRepository;
