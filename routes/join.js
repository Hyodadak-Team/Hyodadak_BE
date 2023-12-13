const express = require("express");

const {
  // joinPersonal,
  // initUser,
  testUser,
} = require("../controllers/userController");
const router = express.Router();

// router.post("/init", initUser);
router.post("/test", testUser);
// router.post("/", joinPersonal);

module.exports = router;
