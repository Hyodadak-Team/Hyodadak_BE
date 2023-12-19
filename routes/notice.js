const express = require("express");
const { ObjectId } = require('mongodb');
const {
  init,
  getAllNotices,
  getAllNoticesDesc,
  selectNoticeOne,
  getPrevAndNowAndNextNotices,
  getLatestThreeNotices,
  countNoticesByCategory,
  pagination,
  getNoticesByCategory, paginationByCategory
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
 *      description: "프로젝트 내 constants/noticeList의 실험용 데이터 저장"
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ok:
 *                    type: boolean
 *                  notices:
 *                    type: object
 *                    example:
 *                      [
 *                        {
 *                         "_id" : 1,
 *                         "title" : "제목 1",
 *                         "contents" : "내용 1",
 *                         "category" : "분류 1",
 *                         "create_time" : "작성 시간"
 *                        },
 *                        {
 *                         "_id" : 2,
 *                         "title" : "제목 2",
 *                         "contents" : "내용 2",
 *                         "category" : "분류 2",
 *                         "create_time" : "작성 시간"
 *                        }
 *                      ]
 *        "400":
 *          description: 전체 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get("/notices", getAllNoticesDesc);

/**
 * @swagger
 * paths:
 *  /notice/notice/{id}:
 *    get:
 *      summary: "선택된 notice 데이터 조회"
 *      description: "req.params id로 1개 데이터 조회 "
 *      tags: [Notice]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: notice ObjectId
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
router.get("/notice/:id", selectNoticeOne);

/**
 * @swagger
 * paths:
 *  /notice/prev-now-next/{index}:
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
 *            type: number
 *      responses:
 *        "200":
 *          description: 데이터 조회 성공
 *        "400":
 *          description: 데이터 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/prev-now-next/:index', getPrevAndNowAndNextNotices);

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
 *
 *      responses:
 *        "200":
 *          description: 데이터 개수 조회 성공
 *        "400":
 *          description: 데이터 개수 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/notices-count/:category_number', countNoticesByCategory);

/**
 * @swagger
 * paths:
 *  /notice/pagination/{page}:
 *    get:
 *      summary: "notice 데이터 개수 조회"
 *      description: ""
 *      tags: [Notice]
 *      parameters:
 *        - in: path
 *          name: page
 *          required: true
 *          description: page index
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 데이터 개수 조회 성공
 *        "400":
 *          description: 데이터 개수 조회 실패
 *        "500":
 *          description: 서버 내부 오류
 */
router.get('/pagination/:category_number/:page', paginationByCategory)

router.get('/notices/category/:category_number', getNoticesByCategory)
module.exports = router;
