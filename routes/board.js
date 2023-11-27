const express = require('express');

/**
 * @swagger
 * tags:
 *   name: boards
 *   description: 게시물 관련
 * definitions:
 *   boards:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: ObjectId
 *       board_title:
 *         type: String
 *       board_contents:
 *         type: String
 *       board_category:
 *         type: Array
 *       board_access:
 *          type: String
 *       board_point:
 *          type: Number
 *       board_img:
 *          type : Array
 *       writer_id:
 *          type: String
 *       create_time:
 *          type: Date
 *       status:
 *          type: String
 *       answers:
 *          type: Array
 *       selected_answer:
 *          type: Array
 *       views:
 *          type : Number
 *
 */

const
    {
        init, getAllBoards,
        createBoard, selectBoardOne, increaseViews, deleteBoardOne,selectBoardOneToModify,modifyBoardOne,
        addAnswer, selectAnswerOne,deleteAnswerOne, modifyAnswerOne,
        addComment, selectCommentOne, deleteCommentOne, modifyCommentOne
    } = require('../controllers/boardController')

const router = express.Router();

router.post('/init', init);
/**
 * @swagger
 * /board/init:
 *   post:
 *     description: 게시글 초기 데이터 셋
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "success"
 *
 */

router.get('/all', getAllBoards); // all
/**
 * @swagger
 * /board/all:
 *   get:
 *     description: 게시글 모든 데이터 불러오기
 *     tags: [Get]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "success"
 *
 */



// board
router.post('/create-board', createBoard);
/**
 * @swagger
 * /board/create-board:
 *   post:
 *     description: 게시글 모든 데이터 불러오기
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *     in: "body"
 *     required: true
 *     schema:
 *       $ref: "#/definitions/boards"
 *     responses:
 *       "200":
 *         description: "success"
 *
 */

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
router.put('/add-comment/:board_id/:answer_id', addComment);
router.get('/select-comment/:board_id/:answer_id/:comment_id', selectCommentOne);
router.put('/delete-comment/:board_id/:answer_id/:comment_id', deleteCommentOne);
router.put('/modify-comment/:board_id/:answer_id/:comment_id', modifyCommentOne);


module.exports = router;