const express = require("express");

const {
  postMyPage,
  getMyPage,
  cookieJwtAuth,
  authJwt,
} = require("../controllers/userController");
const router = express.Router();

router.get("/getuser", getMyPage);
router.post("/postuser", postMyPage);

module.exports = router;
