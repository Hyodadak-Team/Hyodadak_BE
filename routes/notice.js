const express = require('express');

const { init, getAllNotices } = require('../controllers/noticeController');
const router = express.Router();

router.post('/init', init);

router.get('/all', getAllNotices);
module.exports = router;