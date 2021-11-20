const functions = require("firebase-functions");
const db = require("../db/db");
const { postDB } = require("../db");

/**
 *  @포스트 전체 조회
 *  @route Post /post/
 *  @access public
 *  @error
 */

const getPostAll = async (req) => {
  let client;

  try {
    client = await db.connect(req);

    const posts = await postDB.getAllPosts(client);

    return posts;
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
  getPostAll,
};
