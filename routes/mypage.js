const express = require("express");

const {
  postMyPage,
  getMyPage,
  cookieJwtAuth,
} = require("../controllers/userConnect");
const router = express.Router();

router.get("/user", cookieJwtAuth, getMyPage);
router.post("/user", cookieJwtAuth, postMyPage);

module.exports = router;
