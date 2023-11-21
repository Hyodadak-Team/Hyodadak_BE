const express = require('express');

const
    {
        init, getAllBoards,
        createBoard, selectBoardOne, increaseViews, deleteBoardOne,
        addAnswer,
        addComment
    } = require('../controllers/boardController')

const router = express.Router();

router.post('/init', init);

router.get('/all', getAllBoards); // all

// board
router.post('/create-board', createBoard);
router.get('/detail/:id', selectBoardOne);
router.put('/increase-views/:id', increaseViews);
router.delete('/delete/:id', deleteBoardOne);

// answer
router.put('/add-answer/:id', addAnswer);

//
router.put('/add-comment/:id/:index', addComment);

module.exports = router;