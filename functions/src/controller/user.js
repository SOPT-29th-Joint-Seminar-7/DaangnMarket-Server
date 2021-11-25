const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const userService = require("../service/userService");
/**
 *  @회원가입
 *  @route Post user/signup
 *  @access public
 */

const signupController = async (req, res) => {
  try {
    const tokenData = await userService.postSignup(req);

    // 파이어 베이스 오류
    if (tokenData === -1) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, "firebase 오류"));
    }

    // 요청 바디 부족
    else if (tokenData === -2) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    // 이메일 형식 오류
    else if (tokenData === -3) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(
          util.fail(statusCode.BAD_REQUEST, "이메일 형식이 잘못되었습니다.")
        );
    }
    // 이미 존재하는 아이디
    else if (tokenData === -4) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
    }

    // 비밀번호 형식 오류
    else if (tokenData === -5) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(
          util.fail(statusCode.BAD_REQUEST, "비밀번호 형식이 잘못되었습니다.")
        );
    }
    // 회원가입 성공
    else {
      res
        .status(statusCode.OK)
        .send(
          util.success(statusCode.OK, responseMessage.CREATED_USER, tokenData)
        );
    }
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};


/**
 *  @회원가입
 *  @route Post user/login
 *  @access public
 */

const loginController = async (req, res) => {
  try {
    // 로그인 유저 반환
    const tokenData = await userService.postLogin(req);

    // 디비 에러
    if (tokenData === -1) {
      return res
        .status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, "DB 에러"));
    }
    // 요청 바디 부족
    if (tokenData === -2) {
      return res
      .status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    // 사용자를 찾을 수 없음
    else if (tokenData === -3) {
      return res
      .status(statusCode.NOT_FOUND)
      .json(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
    }

    // 이메일 형식 오류
    else if ( tokenData === -4) {
      return res
      .status(statusCode.NOT_FOUND)
      .json(util.fail(statusCode.NOT_FOUND, responseMessage.INVALID_EMAIL));
    }
    // password 불일치
    else if (tokenData === -5) {
      return res
      .status(statusCode.NOT_FOUND)
      .json(util.fail(statusCode.NOT_FOUND, responseMessage.MISS_MATCH_PW));
    }
    // 서버 내 오류
    else if (tokenData === -6) {
      return res
      .status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
    // 로그인 성공
    else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, tokenData));
    }

  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};


module.exports = {
  signupController, loginController,
};
