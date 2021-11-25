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

    console.log(data);

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
  try{
    // 검색 성공
    const data = await postService.getSearchPost(req);

    // 디비 에러
    if (data === -1) {
      return res
        .status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, "DB 에러"));
    }
    
    // 검색 내용 없음
    if (data === false) 
      return res
        .status(statusCode.OK)
        .send(
          util.fail(
            statusCode.OK, 
            responseMessage.NO_SEARCH_POST
          )
        );

    // 검색 성공 response 
    res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK, 
          responseMessage.SEARCH_POST_SUCCESS, 
          data));

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
  postAllController, postSearchController,
};
