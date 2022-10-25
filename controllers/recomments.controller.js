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
    const { comment } = req.body;
    const { nickname } = res.locals.user;
    const createRecommentData = await this.recommentController.createRecomment(
      commentId,
      comment,
      nickname
    );
    res.status(200).json({ data: createRecommentData });
  };

  // 대댓글 수정 API
  updateRecomment = async (req, res) => {
    const { recommentId } = req.params;
    const { comment } = req.body;

    const updateRecomment = await this.recommentController.updateRecomment(
      recommentId,
      comment
    );
    res.status(200).json({ message: "댓글을 수정했습니다." });
  };

  //대댓글 삭제 API
  deleteRecomment = async (req, res) => {
    const { recommentId } = req.params;
    const { nickname } = res.locals.user;
    const deleteRecomment = await this.recommentController.deleteRecomment(
      recommentId,
      nickname
    );
    res.status(200).json({ message: "댓글을 삭제했습니다." });
  };
}

module.exports = RecommentController;
