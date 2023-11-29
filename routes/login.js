const express = require("express");

const { loginUser } = require("../controllers/userConnect");
const router = express.Router();

router.post("/", loginUser);

module.exports = router;
