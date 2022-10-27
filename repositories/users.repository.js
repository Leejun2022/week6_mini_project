const { User } = require("../models");

class UsersRepository {
  findOneUser = async (userKey) => {
    const findOneUser = await User.findByPk(userKey);
    return findOneUser;
  };
  findOneId = async (userId) => {
    const findOneId = await User.findOne({ where: { userId } });

    return findOneId;
  };
  findOneNickname = async (userKey, nickname) => {
    const findOneNickname = await User.findOne({
      where: { userKey, nickname },
    });
    return findOneNickname;
  };
  createUser = async (userId, nickname, password) => {
    const createUser = await User.create({ userId, nickname, password });
    return createUser;
  };
  deleUser = async (userKey, password) => {
    const deleteUser = await User.destroy({
      where: { userKey, password },
    });
    return deleteUser;
  };
  updateRefresh = async (refreshToken, user) => {
    const updateRefresh = await User.update(
      { refreshToken },
      { where: { userKey: user.userKey } }
    );
    return updateRefresh;
  };
  updatUser = async (userKey, nickname) => {
    console.log("111");
    const updatUser = await User.update({ nickname }, { where: { userKey } });
    console.log("222");
    return updatUser;
  };
  findRefresh = async (refreshToken) => {
    const findRefresh = await User.findOne({
      where: { refreshToken: refreshToken },
    });
    return findRefresh;
  };
}

module.exports = UsersRepository;

// class UsersRepository {
//   findOneUser = async (userKey) => {
//     const findOneUser = await User.findOne({ where: { userKey } });

//     return findOneUser;
//   };
//   findOneId = async (nickname) => {
//     const findOneId = await User.findOne({ where: { nickname } });

//     return findOneId;
//   };

//   createUser = async (nickname, password) => {
//     console.log(nickname, password);
//     const createUser = await User.create({ nickname, password });

//     return createUser;
//   };
//   updateRefresh = async (refreshToken, user) => {
//     await User.update({ refreshToken }, { where: { userKey: user.userKey } });
//   };
// }

// module.exports = UsersRepository;
