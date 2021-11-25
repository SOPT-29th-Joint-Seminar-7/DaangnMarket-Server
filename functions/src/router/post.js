const express = require("express");
const router = express.Router();

const postController = require("../controller/post.js");

router.get("/", postController.postAllController); // 포스트 전체 조회
router.get("/search", postController.postSearchController); // 포스트 검색
router.post("/upload", postController.postUploadController); // 포스트 업로드

module.exports = router;