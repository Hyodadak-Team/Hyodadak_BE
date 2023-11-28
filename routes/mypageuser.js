const express = require("express");

const { postMyPage, getMyPage } = require("../controllers/userConnect");
const router = express.Router();

router.post("/mypage", getMyPage);

module.exports = router;
