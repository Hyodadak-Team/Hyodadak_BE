const express = require('express');

const
    {
        init, getAllBoards,
        createBoard, selectBoardOne, increaseViews, deleteBoardOne,selectBoardOneToModify,modifyBoardOne,
        addAnswer, selectAnswerOne,deleteAnswerOne, modifyAnswerOne,
        addComment, selectCommentOne, deleteCommentOne, modifyCommentOne
    } = require('../controllers/boardController')
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 질문 게시판 CRUD, 답변 CRUD, 댓글 CRUD
 */

/**
 * @swagger
 * paths:
 *  /board/init:
 *    post:
 *      summary: "질문게시판 초기 데이터 저장"
 *      description: "프로젝트 내 constants/boardList의 실험용 데이터 저장"
 *      tags: [Board]
 *      responses:
 *        "200":
 *          description: 데이터 저장 성공
 *        "400":
 *          description: 데이터 저장 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.post('/init', init);

/**
 * @swagger
 * paths:
 *  /board/boards:
 *    get:
 *      summary: "질문게시판 전체 데이터 조회"
 *      description: ""
 *      tags: [Board]
 *      responses:
 *        "200":
 *          description: 전체 데이터 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ok:
 *                    type: boolean
 *                  boards:
 *                    type: object
 *                    example:
 *                      [
 *                        {
 *                         "_id" : 1,
 *                         "board_title" : "제목 1",
 *                         "board_contents" : "내용 1",
 *                         "board_category" : "분류 1",
 *                         "board_access" : "접근 권한",
 *                         "board_point" : "채택 포인트",
 *                         "board_img" : ["이미지 1", "이미지 2"],
 *                         "writer_user_info" :
 *                          {
 *                            "user_id" : "질문 작성 유저 아이디",
 *                            "pro_img" : "질문 작성 유저 프로필 이미지 정보",
 *                            "interest_category" : ["질문 작성 유저 관심 카테고리1", "질문 작성 유저 관심 카테고리2"]
 *                          },
 *                          "create_time" : "질문 작성 시간",
 *                          "status" : "질문 상태",
 *                          "answers": [
 *                              {
 *                                  "_id" : 1,
 *                                  "answer_user_info" :
 *                                  {
 *                                      "user_id" : "답변 작성 유저 아이디",
 *                                      "pro_img" : "답변 작성 유저 프로필 이미지 정보",
 *                                      "interest_category" : ["답변 작성 유저 관심 카테고리1", "답변 작성 유저 관심 카테고리2"]
 *                                  },
 *                              },
 *                              {
 *                                  "_id" : 2,
 *                                  "answer_user_info" :
 *                                  {
 *                                      "user_id" : "답변 작성 유저 아이디",
 *                                      "pro_img" : "답변 작성 유저 프로필 이미지 정보",
 *                                      "interest_category" : ["답변 작성 유저 관심 카테고리1", "답변 작성 유저 관심 카테고리2"]
 *                                  },
 *                              }
 *                          ],
 *                          "selected_answer" : "채택된 답변",
 *                          "views" : "질문 조회수"
 *                        },
 *                        {
 *                         "_id" : 1,
 *                         "board_title" : "제목 1",
 *                         "board_contents" : "내용 1",
 *                         "board_category" : "분류 1",
 *                         "board_access" : "접근 권한",
 *                         "board_point" : "채택 포인트",
 *                         "board_img" : ["이미지 1", "이미지 2"],
 *                         "writer_user_info" :
 *                          {
 *                            "user_id" : "질문 작성 유저 아이디",
 *                            "pro_img" : "질문 작성 유저 프로필 이미지 정보",
 *                            "interest_category" : ["질문 작성 유저 관심 카테고리1", "질문 작성 유저 관심 카테고리2"]
 *                          },
 *                          "create_time" : "질문 작성 시간",
 *                          "status" : "질문 상태",
 *                          "answers": [
 *                              {
 *                                  "_id" : 1,
 *                                  "answer_user_info" :
 *                                  {
 *                                      "user_id" : "답변 작성 유저 아이디",
 *                                      "pro_img" : "답변 작성 유저 프로필 이미지 정보",
 *                                      "interest_category" : ["답변 작성 유저 관심 카테고리1", "답변 작성 유저 관심 카테고리2"]
 *                                  },
 *                              },
 *                              {
 *                                  "_id" : 2,
 *                                  "answer_user_info" :
 *                                  {
 *                                      "user_id" : "답변 작성 유저 아이디",
 *                                      "pro_img" : "답변 작성 유저 프로필 이미지 정보",
 *                                      "interest_category" : ["답변 작성 유저 관심 카테고리1", "답변 작성 유저 관심 카테고리2"]
 *                                  },
 *                              }
 *                          ],
 *                          "selected_answer" : "채택된 답변",
 *                          "views" : "질문 조회수"
 *                        }
 *                      ]
 *        "400":
 *          description: 전체 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/boards', getAllBoards); // all

// board
/**
 * @swagger
 *
 * /board/board/add:
 *  post:
 *   summary: "질문 게시판 등록"
 *   description: "POST 방식으로 등록"
 *   tags: [Board]
 *   requestBody:
 *      description: 클라이언트가 body에 감싸서 서버로 전달하는 값
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                  board_title:
 *                      type: string
 *                      description: "질문 게시판 제목"
 *                  board_contents:
 *                      type: string
 *                      description: "질문 게시판 내용"
 *                  board_category:
 *                      type: string
 *                      description: "질문 게시판 카테고리"
 *                  board_access:
 *                      type: string
 *                      description: "질문 게시판 접근 범위"
 *                  board_point:
 *                      type: number
 *                      description: "질문 게시판 채택 포인트"
 *                  writer_user_info:
 *                      type: object
 *                      description: "유저 정보"
 *                      properties:
 *                          user_id:
 *                              type: string
 *                          pro_img:
 *                              type: string
 *                          interest_category:
 *                              type: array
 *                              example: ["element1", "element2"]
 *   responses:
 *        "200":
 *          description: 데이터 저장 성공
 *        "400":
 *          description: 데이터 저장 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.post('/board/add', createBoard);

/**
 * @swagger
 * paths:
 *  /board/board/{board_id}:
 *    get:
 *      summary: "선택된 질문 게시판 데이터 조회"
 *      description: "req.params id로 1개 데이터 조회 "
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/board/:board_id', selectBoardOne);

/**
 * @swagger
 * paths:
 *  /board/board/views/increase/{board_id}:
 *    patch:
 *      summary: "선택된 질문 게시판 조회 수 1 증가"
 *      description: "req.params board_id로 1개 질문 게시판 views 수정 "
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 조회수 올리기 성공
 *        "400":
 *          description: 조회수 올리기 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/board/views/increase/:board_id', increaseViews);

/**
 * @swagger
 * paths:
 *  /board/board/modify/{board_id}:
 *    put:
 *      summary: "선택된 질문 게시판 수정"
 *      description: "req.params board_id로 1개 데이터 수정 "
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *      requestBody:
 *          description:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      board_title:
 *                          type: string
 *                          description: "질문 게시판 제목"
 *                      board_contents:
 *                          type: string
 *                          description: "질문 게시판 내용"
 *                      board_category:
 *                          type: string
 *                          description: "질문 게시판 카테고리"
 *                      board_access:
 *                          type: string
 *                          description: "질문 게시판 접근 범위"
 *                      board_img:
 *                          type: array
 *                          description: "질문 게시판 이미지들"
 *      responses:
 *        "200":
 *          description: 데이터 수정 성공
 *        "400":
 *          description: 데이터 수정 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.put('/board/modify/:board_id', modifyBoardOne);

/**
 * @swagger
 * paths:
 *  /board/board/delete/{board_id}:
 *    delete:
 *      summary: "선택된 질문 게시판 데이터 삭제"
 *      description: "req.params id로 1개 데이터 삭제 "
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 삭제 성공
 *        "400":
 *          description: 데이터 삭제 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.delete('/board/delete/:board_id', deleteBoardOne);
router.get('/board/select/modify/:id', selectBoardOneToModify);
// answer

/**
 * @swagger
 * paths:
 *  /board/answer/{board_id}/{answer_id}:
 *    get:
 *      summary: "질문 게시판의 답변 데이터 1개 조회"
 *      description: "req.params board_id로 해당 질문 게시판 찾기, answer_id로 해당 답변 찾기"
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/answer/:board_id/:answer_id', selectAnswerOne);

/**
 * @swagger
 * paths:
 *  /board/answer/add/{board_id}:
 *    patch:
 *      summary: "질문 게시판 답변 추가"
 *      description: "req.params board_id로 1개의 질문 게시판 데이터 조회 후 답변 추가 "
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *      requestBody:
 *          description: 클라이언트가 body에 감싸서 서버로 전달하는 값
 *          required: true
 *          content:
 *             application/x-www-form-urlencoded:
 *                schema:
 *                  type: object
 *                  properties:
 *                    answer_contents:
 *                      type: string
 *                      description: "답변 내용"
 *                    answer_user_info:
 *                      type: object
 *                      description: "답변 작성자 정보"
 *                      properties:
 *                          user_id:
 *                              type: string
 *                          pro_img:
 *                              type: string
 *                          interest_category:
 *                              type: array
 *                              example: ["element1", "element2"]
 *                          user_level:
 *                              type: string
 *
 *      responses:
 *        "200":
 *          description: 답변 추가 성공
 *        "400":
 *          description: 답변 추가 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/answer/add/:board_id', addAnswer);

/**
 * @swagger
 * paths:
 *  /board/answer/delete/{board_id}/{answer_id}:
 *    patch:
 *      summary: "선택된 질문 게시판의 답변 데이터 1개 삭제"
 *      description: "req.params board_id로 해당 질문 게시판 찾기, answer_id로 해당 답변 찾고 삭제"
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 삭제 성공
 *        "400":
 *          description: 데이터 삭제 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/answer/delete/:board_id/:answer_id', deleteAnswerOne);

/**
 * @swagger
 * paths:
 *  /board/answer/modify/{board_id}/{answer_id}:
 *    patch:
 *      summary: "선택된 질문 게시판의 답변 수정"
 *      description: "req.params board_id로 해당 질문 게시판 찾기, answer_id로 해당 답변 찾고 수정"
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *      requestBody:
 *          description:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      answer_contents:
 *                          type: string
 *                          description: "답변 수정 내용"
 *      responses:
 *        "200":
 *          description: 데이터 수정 성공
 *        "400":
 *          description: 데이터 수정 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/answer/modify/:board_id/:answer_id', modifyAnswerOne);

// comment
/**
 * @swagger
 * paths:
 *  /board/comment/{board_id}/{answer_id}/{comment_id}:
 *    get:
 *      summary: "질문 게시판의 답변의 댓글 1개 조회"
 *      description: "req.params board_id로 해당 질문 게시판 찾기, answer_id로 해당 답변 찾기, comment_id로 해당 댓글 찾기"
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: comment_id
 *          required: true
 *          description: comment ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/comment/:board_id/:answer_id/:comment_id', selectCommentOne);

/**
 * @swagger
 * paths:
 *  /board/comment/add/{board_id}/{answer_id}:
 *    patch:
 *      summary: "질문 게시판 답변의 댓글 추가"
 *      description: "req.params board_id로 질문 게시판 찾고 answer_id로 답변 찾고 댓글 추가 "
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *      requestBody:
 *          description: 클라이언트가 body에 감싸서 서버로 전달하는 값
 *          required: true
 *          content:
 *             application/x-www-form-urlencoded:
 *                schema:
 *                  type: object
 *                  properties:
 *                    comment_contents:
 *                      type: string
 *                      description: "답변 내용"
 *                    comment_user_info:
 *                      type: object
 *                      description: "답변 작성자 정보"
 *                      properties:
 *                          user_id:
 *                              type: string
 *                          pro_img:
 *                              type: string
 *                          interest_category:
 *                              type: array
 *                              example: ["element1", "element2"]
 *
 *      responses:
 *        "200":
 *          description: 댓글 추가 성공
 *        "400":
 *          description: 댓글 추가 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/comment/add/:board_id/:answer_id', addComment);

/**
 * @swagger
 * paths:
 *  /board/comment/delete/{board_id}/{answer_id}/{comment_id}:
 *    patch:
 *      summary: "선택된 질문 게시판의 답변의 댓글 데이터 1개 삭제"
 *      description: "req.params board_id로 해당 질문 게시판 찾기, answer_id로 해당 답변 찾기, comment_id로 해당 댓글 찾고 삭제"
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: comment_id
 *          required: true
 *          description: comment ObjectId
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 삭제 성공
 *        "400":
 *          description: 데이터 삭제 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/comment/delete/:board_id/:answer_id/:comment_id', deleteCommentOne);

/**
 * @swagger
 * paths:
 *  /board/comment/modify/{board_id}/{answer_id}/{comment_id}:
 *    patch:
 *      summary: "선택된 질문 게시판의 답변의 댓글 수정"
 *      description: "req.params board_id로 해당 질문 게시판 찾기, answer_id로 해당 답변 찾기, comment_id로 해당 댓글 찾고 수정"
 *      tags: [Board]
 *      parameters:
 *        - in: path
 *          name: board_id
 *          required: true
 *          description: board ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: answer_id
 *          required: true
 *          description: answer ObjectId
 *          schema:
 *            type: string
 *        - in: path
 *          name: comment_id
 *          required: true
 *          description: comment ObjectId
 *          schema:
 *            type: string
 *      requestBody:
 *          description:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      comment_contents:
 *                          type: string
 *                          description: "댓글 수정 내용"
 *      responses:
 *        "200":
 *          description: 데이터 수정 성공
 *        "400":
 *          description: 데이터 수정 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.patch('/comment/modify/:board_id/:answer_id/:comment_id', modifyCommentOne);


module.exports = router;