const { MiddlewareError } = require("../exceptions/index.exception");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      throw new MiddlewareError("이미 로그인 되어 있습니다.");
    }

    next();
  } catch (error) {
    console.trace(error);
    throw new MiddlewareError("잘못된 접근입니다.");
  }
};
