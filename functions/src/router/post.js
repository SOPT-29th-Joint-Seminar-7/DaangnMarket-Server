const express = require("express");
const router = express.Router();

router.get("/"); // 포스트 전체 조회
router.get("/search"); // 포스트 검색
router.post("/upload"); // 포스트 업로드

module.exports = router;
