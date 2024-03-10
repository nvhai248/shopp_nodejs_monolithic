const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class AppErr extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

// api specific error handling
class APIError extends AppErr {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
    description = "INternal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

// 400
class BadRequestError extends AppErr {
  constructor(logingErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      "Bad request",
      true,
      false,
      logingErrorResponse
    );
  }
}

class UnauthorizeError extends AppErr {
  constructor(description) {
    super("Unauthorize", STATUS_CODES.UNAUTHORIZED, description, true);
  }
}

module.exports = {
  AppErr,
  APIError,
  BadRequestError,
  UnauthorizeError,
  STATUS_CODES,
};
