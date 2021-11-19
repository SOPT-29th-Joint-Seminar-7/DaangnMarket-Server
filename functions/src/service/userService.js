import jwt from "jsonwebtoken";

/**
 *  @회원가입
 *  @route Post /user/signup
 *  @access public
 *  @error
 *      1. 요청 바디 부족
 *      2. 아이디 중복
 */

const postSignup = async (data) => {};

const userService = {
  postSignup,
};

export default userService;
