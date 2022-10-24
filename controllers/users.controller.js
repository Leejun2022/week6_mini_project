const UsersService = require("../services/users.service");
const { InvalidParamsError } = require("../exceptions/index.exception");

const joi = require("../exceptions/joiSchema");

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  userSignup = async (req, res, next) => {
    try {
      const result = joi.userSchema.validate(req.body);

      if (result.error) {
        throw new InvalidParamsError("형식에 맞게 입력해주세요");
      }

      const { userId, nickname, password, confirm } = result.value;

      const createUser = await this.usersService.createUser(
        userId,
        nickname,
        password,
        confirm
      );

      res.status(201).json({ msg: "회원가입에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
  userLogin = async (req, res, next) => {
    try {
      const { userId, password } = req.body;
      const user = await this.usersService.loginUser(userId, password);

      res.cookie("accessToken", user[1]);
      res.cookie("refreshToken", user[2]);
      res.status(200).json({
        userKey: user[0].userKey,
        accessToken: user[1],
        refreshToken: user[0].refreshToken,
        msg: "로그인에 성공하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
  //*회원정보 수정
  updatUser = async (req, res, next) => {
    try {
      //body로 받는 값 넣어줄건데 뭐로 하지 ?
      const { userKey } = res.locals.user;
      const result = joi.nicknameSchema.validate(req.body);

      if (result.error) {
        throw new InvalidParamsError("형식에 맞게 입력해주세요");
      }

      const { nickname } = result.value;

      const user = await this.usersService.updatUser(userKey, nickname);

      res.status(200).json({ msg: "수정에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
  //*회원탈퇴
  deleUser = async (req, res, next) => {
    try {
      const { userKey } = res.locals.user;
      const { password } = req.body;

      await this.usersService.deleUser(userKey, password);
      res.status(200).json({
        msg: "탈퇴에 성공하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;

// class UsersController {
//   constructor() {
//     this.usersService = new UsersService();
//   }
//   userSignup = async (req, res, next) => {
//     try {
//       const result = joi.userSchema.validate(req.body);

//       if (result.error) {
//         throw new InvalidParamsError("형식에 맞게 모두 입력해주세요");
//       }
//       const { nickname, password, confirm } = result.value;
//       console.log(nickname, password, confirm);
//       const createUser = await this.usersService.createUser(
//         nickname,
//         password,
//         confirm
//       );

//       res.status(201).json({
//         msg: "회원가입에 성공하였습니다.",
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
//   userLogin = async (req, res, next) => {
//     try {
//       const { nickname, password } = req.body;

//       const user = await this.usersService.loginUser(nickname, password);

//       res.cookie("accessToken", user[1]); // Access Token을 Cookie에 전달한다.
//       res.cookie("refreshToken", user[2]);
//       res.status(200).json({
//         nickname: user[0].nickname,
//         userKey: user[0].userKey,
//         accessToken: user[1],
//         refreshToken: user[0].refreshToken,
//         msg: "로그인에 성공하였습니다.",
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

//   confirmUser = async (req, res, next) => {
//     try {
//       const { userKey, nickname } = res.locals.user;
//       const { accessToken } = res.locals;

//       const existUser = await this.usersService.checkUser(userKey);

//       if (existUser.refreshToken === refreshToken) {
//         res.status(200).json({
//           ok: true,
//           msg: "로그인 유저 정보 확인",
//           accessToken,
//           refreshToken: existUser.refreshToken,
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };
// }
// module.exports = UsersController;
