const express = require("express");

const {
  registerPersonal,
  registerMember,
} = require("../controllers/userConnect");
const router = express.Router();

router.post("/registerpersonal", registerPersonal);
router.post("/registermember", registerMember);

module.exports = router;
