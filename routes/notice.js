const express = require("express");

const {
  init,
  getAllNotices,
  selectNoticeOne,
  getPrevAndNowAndNextNotices,
  getLatestThreeNotices,
  countNotices,
} = require("../controllers/noticeController");
const router = express.Router();

router.post("/init", init);

router.get("/all", getAllNotices);

router.get("/notice/:id", selectNoticeOne);

router.get('/three/:index', getPrevAndNowAndNextNotices)

router.get("/latest", getLatestThreeNotices);

router.get('/count', countNotices)
module.exports = router;
