"use strict";

var express = require("express");

var _require = require("../controllers/userController"),
    loginUser = _require.loginUser;

var router = express.Router();
router.post("/", loginUser); // router.get("/", cookieJwtAuth);

module.exports = router;