const express = require("express");

const {
  postMyPage,
  getMyPage,
  cookieJwtAuth,
    authJwt
} = require("../controllers/userController");
const router = express.Router();

router.get("/user", authJwt, getMyPage);
router.post("/user", cookieJwtAuth, postMyPage);

module.exports = router;
