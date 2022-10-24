// const express = require("express");
// const router = express.Router();
// const passport = require("passport");

// //* 카카오로 로그인하기 라우터 ***********************
// //? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
// router.get("/kakao", passport.authenticate("kakao"));

// //? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
// router.get(
//   "/kakao/callback",
//   //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
//   passport.authenticate("kakao", {
//     failureRedirect: "/", // kakaoStrategy에서 실패한다면 실행
//   }),
//   // kakaoStrategy에서 성공한다면 콜백 실행
//   (req, res) => {
//     res.redirect("/");
//   }
// );
// module.exports = router;
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models");

// 카카오로그인
const kakaoCallback = (req, res, next) => {
  try {
    passport.authenticate(
      "kakao",
      { failureRedirect: "/users/login" }, // 실패하면 '/user/login''로 돌아감.
      async (err, user, info) => {
        if (err) return next(err);

        const { userKey, nickname } = user;

        const accessToken = jwt.sign(
          { userKey: user.userKey },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign(
          { userKey: user.userKey },
          process.env.SECRET_KEY,
          { expiresIn: "21d" }
        );

        await User.update(
          { refreshToken },
          { where: { userKey: user.userKey } }
        );

        result = { userKey, accessToken, refreshToken, nickname };
        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);
        res.status(201).json({
          user: result,
          msg: "카카오 로그인에 성공하였습니다.",
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

// 로그인페이지로 이동
router.get("/kakao", passport.authenticate("kakao"));
// 카카오에서 설정한 redicrect url을 통해 요청 재전달
router.get("/kakao/callback", kakaoCallback);

module.exports = router;
