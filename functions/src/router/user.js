const express = require("express");
const router = express.Router();

const userController = require("../controller/user.js");

router.post("/signup", userController.signupController);
// router.post("/signin", );

module.exports = router;
