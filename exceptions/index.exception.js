class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = "InvalidParamsError";
    if (!message) this.message = "요청한 데이터 형식이 올바르지 않습니다.";
  }
}

class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = "ValidationError";
  }
}
class MiddlewareError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = "MiddlewareError";
    if (!message) this.message = "요청한 데이터 형식이 올바르지 않습니다.";
  }
}

module.exports = { InvalidParamsError, ValidationError, MiddlewareError };
