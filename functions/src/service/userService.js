const admin = require("firebase-admin");
const functions = require("firebase-functions");
const db = require("../db/db");
const { userDB } = require("../db");
const validator = require("../lib/validator");
const jwtHandlers = require("../lib/jwtHandlers");

/**
 *  @회원가입
 *  @route Post /user/signup
 *  @access public
 *  @error
 *      1. 요청 바디 부족
 *      2. 아이디 중복
 */

const postSignup = async (req) => {
  const { email, password, address } = req.body;

  let client;

  try {
    client = await db.connect(req);

    // console.log(email, password);
    // // 요청 바디 부족
    // if (!email || !password) {
    //   return -2;
    // }
    // // 이메일 형식 오류
    // const emailValidator = validator.emailValidator(email);
    // if (!emailValidator) {
    //   return -3;
    // }

    const userFirebase = await admin
      .auth()
      .createUser({ email, password })
      .then((user) => user)
      .catch((e) => {
        console.log(e);
        return { err: true, error: e };
      });

    // console.log(userFirebase);

    if (userFirebase.err) {
      // 이미 존재하는 사용자
      if (userFirebase.error.code === "auth/email-already-exists") {
        return -4;
      }
      // 비밀번호 형식 오류
      else if (userFirebase.error.code === "auth/invalid-password") {
        return -5;
      } else {
        // return -1
        throw new Error("firebase 오류");
      }
    }
    console.log("ddd");
    const idFirebase = userFirebase.uid;

    // 성공시 Token
    const user = await userDB.addUser(client, email, idFirebase, address);
    const { accesstoken } = jwtHandlers.sign(user);

    return accesstoken;
  } catch (error) {
    functions.logger.error(
      `[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`,
      `[CONTENT] ${error}`
    );
    console.log(error);

    // DB 에러
    return -1;
  } finally {
    client.release();
  }
};

module.exports = {
  postSignup,
};
