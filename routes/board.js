const express = require('express');

const { init, getAllBoards, selectBoardOne } = require('../controllers/boardController')

const router = express.Router();

router.post('/init', init);

router.get('/all', getAllBoards); // all

router.get('/detail/:id', selectBoardOne);

module.exports = router;