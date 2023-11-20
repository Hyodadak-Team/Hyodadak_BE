const express = require("express");

const {
  registerPersonal,
  registerMember,
} = require("../controllers/userConnect");
const router = express.Router();

router.post("/join", registerPersonal, registerMember);
// router.post(
//   "/registerpersonal",
//   (req, res, next) => {
//     next();
//   },
//   registerMember
// );
// router.post("/registermember", registerMember);

module.exports = router;
