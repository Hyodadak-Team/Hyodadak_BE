const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("test router 입니다.");
})

module.exports = router;