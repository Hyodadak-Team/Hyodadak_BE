const express = require('express');

const
    {
        init, getAllBoards,
        createBoard, selectBoardOne, increaseViews, deleteBoardOne,selectBoardOneToModify,modifyBoardOne,
        addAnswer, selectAnswerOne,deleteAnswerOne, modifyAnswerOne,
        addComment
    } = require('../controllers/boardController')

const router = express.Router();

router.post('/init', init);

router.get('/all', getAllBoards); // all

// board
router.post('/create-board', createBoard);
router.get('/detail/:id', selectBoardOne);
router.get('/select-modify/:id', selectBoardOneToModify);
router.put('/increase-views/:id', increaseViews);
router.put('/modify-board/:id', modifyBoardOne);
router.delete('/delete/:id', deleteBoardOne);

// answer
router.put('/add-answer/:id', addAnswer);
router.get('/select-answer/:board_id/:answer_id', selectAnswerOne);
router.put('/delete-answer/:board_id/:answer_id', deleteAnswerOne);
router.put('/modify-answer/:board_id/:answer_id', modifyAnswerOne);

// comment
router.put('/add-comment/:id/:index', addComment);

module.exports = router;