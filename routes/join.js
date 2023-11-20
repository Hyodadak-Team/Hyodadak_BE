const express = require("express");

const { joinPersonal, joinMember } = require("../controllers/userConnect");
const router = express.Router();

router.post("/", joinPersonal, joinMember);
// router.post(
//   "/registerpersonal",
//   (req, res, next) => {
//     next();
//   },
//   registerMember
// );
// router.post("/registermember", registerMember);

module.exports = router;
