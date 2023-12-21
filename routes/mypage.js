const express = require("express");

const { postMyPage, getMyPage } = require("../controllers/userController");
const router = express.Router();

router.get("/getuser", getMyPage);
router.post("/postuser", postMyPage);

module.exports = router;
