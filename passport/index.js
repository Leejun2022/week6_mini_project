const passport = require("passport");
// 로컬서버로 로그인할때
const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때

const User = require("../models/user");

//로그인 시에만 실행
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  //매 요청시 실행
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  kakao();
};
