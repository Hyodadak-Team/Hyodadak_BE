const express = require('express');

const {test} = require('../controllers/testController')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: test
 */
router.post('/', test);

/**
 * @swagger
 * paths:
 *  /api/user/users:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Test]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */

/**
 * @swagger
 * /api/user/user?user_id={user_id}:
 *  get:
 *    summary: "특정 유저조회 Query 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Test]
 *    parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */


/**
 * @swagger
 * /api/user/{user_id}:
 *  get:
 *    summary: "특정 유저조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Test]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */

/**
 * @swagger
 *
 * /api/user/add:
 *  post:
 *    summary: "유저 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Test]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: "유저 고유아이디"
 *              name:
 *                type: string
 *                description: "유저 이름"
 */
module.exports = router;