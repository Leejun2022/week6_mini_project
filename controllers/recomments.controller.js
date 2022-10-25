const RecommentService = require("../services/recomments.service");

class RecommentController {
  recommentController = new RecommentService();

  // 대댓글 조회 API
  getRecomment = async (req, res) => {
    const { commentId } = req.params;
    const recomments = await this.recommentController.findAllRecomment(
      commentId
    );
    res.status(200).json({ data: recomments });
  };

  // 대댓글 생성 API
  createRecomment = async (req, res) => {
    const { commentId } = req.params;
    const { recomment } = req.body;
    const { nickname, userKey } = res.locals.user;
    const createRecommentData = await this.recommentController.createRecomment(
      commentId,
      recomment,
      userKey,
      nickname
    );
    res.status(200).json({ data: createRecommentData });
  };

  // 대댓글 수정 API
  updateRecomment = async (req, res) => {
    const { recommentId } = req.params;
    const { recomment } = req.body;
    const { nickname, userKey } = res.locals.user;

    const updateRecomment = await this.recommentController.updateRecomment(
      recommentId,
      recomment,
      nickname,
      userKey
    );
    res.status(200).json({ message: "댓글을 수정했습니다." });
  };

  //대댓글 삭제 API
  deleteRecomment = async (req, res) => {
    const { recommentId } = req.params;
    const { nickname, userKey } = res.locals.user;
    const deleteRecomment = await this.recommentController.deleteRecomment(
      recommentId,
      nickname,
      userKey
    );
    res.status(200).json({ message: "댓글을 삭제했습니다." });
  };
}

module.exports = RecommentController;
