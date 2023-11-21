const express = require("express");

const { joinPersonal, inituser } = require("../controllers/userConnect");
const router = express.Router();

router.post("/init", inituser);
router.post("/", joinPersonal);

module.exports = router;
