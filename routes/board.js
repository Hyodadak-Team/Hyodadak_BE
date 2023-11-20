const express = require('express');

const
    {
        init, getAllBoards, selectBoardOne,
        createBoard,
        addAnswer,
        addComment
    } = require('../controllers/boardController')

const router = express.Router();

router.post('/init', init);

router.get('/all', getAllBoards); // all

router.get('/detail/:id', selectBoardOne);

// board
router.post('/create-board', createBoard);

// answer
router.put('/add-answer/:id', addAnswer);

//
router.put('add-commnet/:id/:index', addComment);

module.exports = router;