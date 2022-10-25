const express = require("express");
const router = express.Router();
// 나중에 확인하고 미들웨어 추가하기

const RecommentController = require("../controllers/recomments.controller");
const recommentController = new RecommentController();

router.get("/:commentId", recommentController.getRecomment); //해당 게시물 대댓글 전체조회
router.post("/:commentId", recommentController.createRecomment); //대댓글 생성
router.put("/:commentId/:recommentId", recommentController.updateRecomment); //대댓글수정
router.delete("/:commentId/:recommentId", recommentController.deleteRecomment); //대댓글삭제

module.exports = router;

// 1번. mergeParams : true로 comment내부에 URL공유
// 2번. Comments 데이터베이스를 Recomments랑 함께 쓰느냐
// 3번. Recomments 데이터베이스를 따로 만드냐
// 4번. 만약에 따로 만든다면 어떻게 Comment랑 같이 보이게 만들꺼고
// 5번. 안된다면 Comments 데이터베이스를 공유할텐데, 그럼 comments가 제대로 생성될까
// 6번. 데이터 테이블만들때 recomment부분에서 입력하게되면 나머지 부분들을 알아서 채워지게 만들면 되려나
// 7번. 그렇다면 생각해야하는게 대댓글마다 댓글이 따로 생성될 수도 있다는것
// 8번. 그럼 Comment 데이터베이스에 넣어서 함께 쓰는게 나을꺼같은데
// Recomments부분을 allownull : true로 설정해서 만들면 되지 않을까
