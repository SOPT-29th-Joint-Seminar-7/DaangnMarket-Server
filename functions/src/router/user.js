const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// router.post("/signup", );
router.post("/login", userController.loginController);

module.exports = router;
