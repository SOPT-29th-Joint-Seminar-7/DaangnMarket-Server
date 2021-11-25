const functions = require("firebase-functions");
const db = require("../db/db");
const postDB = require("../db/post");
const userDB = require("../db/user");
const imgs = require("../sampleDB/img");

/**
 *  @포스트 전체 조회
 *  @route Get /post/
 *  @access public
 *  @error
 */

const getPostAll = async (req) => {
  let client;

  try {
    client = await db.connect();

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

/**
 *  @포스트 검색
 *  @route GET /post/search?keyword=
 *  @access public
 *  @error
 */

const getSearchPost = async (req) => {
  const { keyword } = req.query;

  let client;

  try {
    client = await db.connect(req);

    const searchedPosts = await postDB.searchedPosts(client, keyword);

    // 검색 결과가 없거나 공백 입력 시
    if ( searchedPosts.length === 0 ) return false;
    

    return searchedPosts;
  } catch (error) {
    functions.logger.error(
      `[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`,
      `[CONTENT] ${error}`
    );
    return -1;
  } finally {
    client.release();
  }
};


/**
 *  @포스트 등록
 *  @route Post /post/upload
 *  @access public
 *  @error
 */

const postPostUpload = async (req) => {
  let client;

  try {
    client = await db.connect();

    const { title, category, price, state, trade, content } = req.body;

    // 요청 바디 부족
    if (!title || !category || !price || !state || !trade || !content) {
      return -2;
    }

    // price가 음수 값
    if (price <= 0) {
      return -3;
    }

    // 유저는 랜덤 유저 삽입
    const users = await userDB.getAllUsers(client);
    const userArr = Object.values(users);
    const randomUser = Math.floor(Math.random() * userArr.length) + 1;

    const selectUser = userArr.filter((user) => user.id === randomUser)[0];
    const postInfo = {
      title,
      category,
      price,
      state,
      trade,
      content,
      address: selectUser.address,
      img: imgs[0],
    };

    // // DB Post 등록
    await postDB.postPostUpload(client, postInfo, randomUser);
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
  getPostAll, getSearchPost, postPostUpload,
};
