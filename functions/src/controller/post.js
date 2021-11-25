const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");

const postService = require("../service/postService ");
/**
 *  @포스트 전체 조회
 *  @route GET post/
 *  @access public
 */

const postAllController = async (req, res) => {
  try {
    // 조회 성공
    const data = await postService.getPostAll();

    // 디비 에러
    if (data === -1) {
      return res
        .status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, "DB 에러"));
    }
    // response
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, "포스트 전체 조회 성공", data));
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
const postSearchController = async (req, res) => {
  try {
    // 검색 성공
    const data = await postService.getSearchPost(req);

    // 디비 에러
    if (data === -1) {
      return res
        .status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, "DB 에러"));
    }

    console.log(responseMessage.NO_SEARCH_POST);
    // 검색 내용 없음
    if (data === false)
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.NO_SEARCH_POST, []));

    // 검색 성공 response
    res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, responseMessage.SEARCH_POST_SUCCESS, data)
      );
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

/**
 *  @포스트 등록
 *  @route Post /post/upload
 *  @access public
 *  @error
 */

const postUploadController = async (req, res) => {
  try {
    // 포스트 등록
    const resData = await postService.postPostUpload(req);

    // 디비 에러
    if (resData === -1) {
      return res
        .status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, "DB 에러"));
    }

    // 요청 바디 부족
    else if (resData === -2) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    // 잘못된 요청 값
    else if (resData === -3) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
    }
    // 포스트 등록 성공
    else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, "포스트 등록 성공"));
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
  postAllController,
  postUploadController,
  postSearchController,
};
