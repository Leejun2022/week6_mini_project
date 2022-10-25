require("dotenv").config();
const UsersRepository = require("../repositories/users.repository");
const { ValidationError } = require("../exceptions/index.exception");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  createUser = async (userId, nickname, password, confirm) => {
    if (password !== confirm) {
      throw new ValidationError("비밀번호를 확인해주세요");
    }

    const findId = await this.usersRepository.findOneId(userId);

    if (findId) {
      throw new ValidationError("이미 사용중인 아이디입니다.");
    }

    const createUser = await this.usersRepository.createUser(
      userId,
      nickname,
      password
    );

    return createUser;
  };
  loginUser = async (userId, password) => {
    const user = await this.usersRepository.findOneId(userId);

    if (!user) {
      throw new ValidationError("아이디 또는 패스워드가 틀립니다.");
    }
    if (password !== user.password) {
      throw new ValidationError("아이디 또는 패스워드가 틀립니다.");
    }
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

    await this.usersRepository.updateRefresh(refreshToken, user);

    return [user, accessToken, refreshToken];
  };
  checkUser = async (userKey) => {
    const existUser = await this.usersRepository.findOneUser(userKey);

    return existUser;
  };
  deleUser = async (userKey, password) => {
    const deleUser = await this.usersRepository.deleUser(userKey, password);
    return deleUser;
  };
  updatUser = async (userKey, nickname) => {
    console.log("11");
    const existUser = await this.usersRepository.findOneNickname(
      userKey,
      nickname
    );
    console.log("22");
    if (existUser) {
      throw new ValidationError("중복된 닉네임이 있습니다.");
    }
    console.log("33");
    const updatUser = await this.usersRepository.updatUser(userKey, nickname);
    console.log("44");
    return updatUser;
  };
}
module.exports = UsersService;
// class UsersService {
//   constructor() {
//     this.usersRepository = new UsersRepository();
//   }

//   createUser = async (nickname, password, confirm) => {
//     if (password !== confirm) {
//       throw new ValidationError("패스워드가 일치하지 않습니다.");
//     }

//     const findId = await this.usersRepository.findOneId(nickname);

//     if (findId) {
//       throw new ValidationError("이미 사용중인 아이디입니다.");
//     }

//     await this.usersRepository.createUser(nickname, password);
//   };
//   loginUser = async (nickname, password) => {
//     const user = await this.usersRepository.findOneId(nickname);

//     if (!user) {
//       throw new ValidationError("아이디 또는 패스워드가 잘못되었습니다.");
//     }

//     const accessToken = jwt.sign(
//       { userKey: user.userKey },
//       process.env.SECRET_KEY,
//       { expiresIn: "1d" }
//     );
//     const refreshToken = jwt.sign(
//       { userKey: user.userKey },
//       process.env.SECRET_KEY,
//       { expiresIn: "21d" }
//     );
//     console.log(accessToken, "access토큰 확인");
//     console.log(refreshToken, "refresh토큰 확인");

//     await this.usersRepository.updateRefresh(refreshToken, user);

//     return [user, accessToken, refreshToken];
//   };

//   checkUser = async (userKey) => {
//     const existUser = await this.usersRepository.findOneUser(userKey);

//     return existUser;
//   };
// }

// module.exports = UsersService;
