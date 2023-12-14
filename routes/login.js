const express = require("express");

const { loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/", loginUser);
// router.get("/", cookieJwtAuth);

module.exports = router;
