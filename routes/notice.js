const express = require('express');

const { init, getAllNotices, selectNoticeOne } = require('../controllers/noticeController');
const router = express.Router();

router.post('/init', init);

router.get('/all', getAllNotices);

router.get('/:id', selectNoticeOne);
module.exports = router;