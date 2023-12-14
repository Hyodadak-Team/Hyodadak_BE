const express = require("express");

const { postMyPage, getMyPage } = require("../controllers/userController");
const router = express.Router();

router.post("/mypage", getMyPage);

module.exports = router;
