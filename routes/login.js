const express = require("express");

const { loginUser, authJwt } = require("../controllers/userController");
const router = express.Router();

router.post("/", loginUser);
// router.get("/", cookieJwtAuth);

router.post("/verify-jwt", authJwt)
module.exports = router;
