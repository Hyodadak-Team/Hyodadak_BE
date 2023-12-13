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

/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: 공지사항 생성, 조회
 */

/**
 * @swagger
 * paths:
 *  /notice/init:
 *    post:
 *      summary: "notice 초기 데이터 저장"
 *      description: "프로젝트 내 constants/noticeList의 데이터 저장"
 *      tags: [Notice]
 *      responses:
 *        "200":
 *          description: 데이터 저장 성공
 *        "400":
 *          description: 데이터 저장 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.post("/init", init);

/**
 * @swagger
 * paths:
 *  /notice/notices:
 *    get:
 *      summary: "notice 데이터 전체 조회"
 *      description: ""
 *      tags: [Notice]
 *      responses:
 *        "200":
 *          description: 전체 데이터 조회 성공
 *        "400":
 *          description: 전체 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get("/notices", getAllNotices);

/**
 * @swagger
 * paths:
 *  /notice/{id}:
 *    get:
 *      summary: "선택된 notice 데이터 조회"
 *      description: "req.params id로 1개 데이터 조회 "
 *      tags: [Notice]
 *      parameters:
 *        - in: path
 *          name: _id
 *          required: true
 *          description: notice ObjectId
 *          schema:
 *            type: ObjectId
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get("/:id", selectNoticeOne);

/**
 * @swagger
 * paths:
 *  /notice/notices/{index}:
 *    get:
 *      summary: "선택된 notice 데이터 조회(이전, 현재, 다음)"
 *      description: "req.params index로 3개 데이터 조회 "
 *      tags: [Notice]
 *      parameters:
 *        - in: path
 *          name: index
 *          required: true
 *          description: notice index
 *          schema:
 *            type: Number
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/notices/:index', getPrevAndNowAndNextNotices);

/**
 * @swagger
 * paths:
 *  /notice/latest-notice:
 *    get:
 *      summary: "가장 최근 notice 데이터 조회"
 *      description: "마지막에 저장된 3개의 notice 데이터"
 *      tags: [Notice]
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get("/latest-notice", getLatestThreeNotices);

/**
 * @swagger
 * paths:
 *  /notice/notices-count:
 *    get:
 *      summary: "notice 데이터 개수 조회"
 *      description: ""
 *      tags: [Notice]
 *      responses:
 *        "200":
 *          description: 데이터 개수 조회 성공
 *        "400":
 *          description: 데이터 개수 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/notices-count', countNotices);

module.exports = router;
