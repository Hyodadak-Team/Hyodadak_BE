"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require("./mongoConnect");

var _require = require("mongodb"),
    ObjectId = _require.ObjectId;

var User = require("../models/user");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt"); //유저 로그인시 데이터를 받기 위한 전역변수


var isNormalUserLogined = false;
var userID;
var saltRounds = 10;
var ACCESS_SECRET = process.env.ACCESS_SECRET; // const userList = [
//   {
//     user_id: "dbswp",
//     user_pw: "1234",
//     user_tel: "01012345678",
//     user_name: "윤제",
//     user_type: "responser",
//     intro: "안녕하세요 아는게 많은 송수빈입니다.",
//     level: 2,
//     poiint: 1000,
//     interest_category: ["무인자판기", "이동수단", "기타"],
//     alam_partner: [
//       {
//         user_id: "qkrtjdwo5662",
//         create_time: "date",
//         contents: "받아주세요",
//         is_partner: "pendding",
//       },
//     ],
//     partner_id: ["dbswp", "dmswl"],
//     partner_image: "m1", // m1,m2 이런식
//     my_board_question: null,
//     my_board_answer: [
//       {
//         board_Object_Id: "3231323dsad", // 어떤 게시물
//         answer_Object_Id: "3231323dsad", // 어떤 답변
//       },
//     ],
//     select_board_answer: null,
//     selected_board_answer: 4,
//   },
//   {
//     user_id: "wldnjspark",
//     user_pw: "1234",
//     user_tel: "01012345678",
//     user_name: "박지원",
//     user_type: "questioner",
//     intro: "안녕하세요 아는게 많은 송수빈입니다.",
//     level: null,
//     poiint: 1000,
//     interser_category: ["무인자판기", "이동수단", "기타"],
//     alam_partner: [
//       {
//         user_id: "qkrtjdwo5662",
//         create_time: "date",
//         contents: "받아주세요",
//         is_partner: "pendding",
//       },
//     ],
//     partner_info: ["dbswp", "dmswl"],
//     partner_image: "m1", // m1,m2 이런식
//     my_board_question: ["ObjectId"],
//     my_board_answer: null,
//     select_board_answer: 2,
//     selected_board_answer: null,
//   },
// ];

var testUser = function testUser(req, res) {
  var data, salt, hashedPassword, USER;
  return regeneratorRuntime.async(function testUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          data = req.body.data; // 솔트 생성 및 해쉬화 진행

          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.genSalt(saltRounds));

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(data.user_pw, salt));

        case 7:
          hashedPassword = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(User(_objectSpread({}, data, {
            user_pw: hashedPassword
          })));

        case 10:
          USER = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(USER.save());

        case 13:
          if (USER) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(400).json("실패"));

        case 15:
          return _context.abrupt("return", res.status(200).json("초기데이터 셋 성공"));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json("오류 발생");

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var joinUserFindID = function joinUserFindID(req, res) {
  var data;
  return regeneratorRuntime.async(function joinUserFindID$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            data = req.body.data;
          } catch (err) {
            console.log(err);
            res.status(500).json("오류 발생");
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //localhost:4000/user -> post방식으로


var postMyPage = function postMyPage(req, res) {
  var MyPageUser;
  return regeneratorRuntime.async(function postMyPage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            user_id: decoded.user_id
          }));

        case 3:
          MyPageUser = _context3.sent;

          if (MyPageUser) {}

          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //localhost:4000/user -> get방식으로


var getMyPage = function getMyPage(req, res) {
  var MyPageUser, userId, userImg, userIntersetCate, userLevel, userSelectesAnswer, userPoint, userPartener, userIntro;
  return regeneratorRuntime.async(function getMyPage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            user_id: decoded.user_id
          }));

        case 3:
          MyPageUser = _context4.sent;

          if (MyPageUser) {
            // 필요한 정보 추출
            userId = MyPageUser.user_id;
            userImg = MyPageUser.profile_image; //배열

            userIntersetCate = MyPageUser.interest_category;
            userLevel = MyPageUser.level;
            userSelectesAnswer = MyPageUser.selected_board_answer;
            userPoint = MyPageUser.point; //배열의 길이

            userPartener = MyPageUser.partner_id.length;
            userIntro = MyPageUser.intro;
            res.status(200).json({
              userId: userId,
              userImg: userImg,
              userIntersetCate: userIntersetCate,
              userLevel: userLevel,
              userSelectesAnswer: userSelectesAnswer,
              userPoint: userPoint,
              userPartener: userPartener,
              userIntro: userIntro
            });
          } else {
            res.status(404).json({
              message: "사용자를 찾을 수 없습니다."
            });
          }

          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //로그인 미들웨어


var loginUser = function loginUser(req, res) {
  var _req$body, id, pw, user, isMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, id = _req$body.id, pw = _req$body.pw; //알림 기능을 위한 전역변수 변경

          userID = id;
          isNormalUserLogined = true;
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            user_id: id
          }));

        case 6:
          user = _context5.sent;

          if (user) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(403).json({
            loginSuccess: false,
            message: "해당하는 아이디가 없습니다."
          }));

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(pw, user.user_pw));

        case 11:
          isMatch = _context5.sent;

          if (isMatch) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", res.status(403).json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다."
          }));

        case 14:
          console.log(pw, user.user_pw);
          token = jwt.sign({
            type: "jwt",
            name: user.user_name
          }, ACCESS_SECRET, {
            expiresIn: "1h"
          });

          if (token) {
            _context5.next = 18;
            break;
          }

          return _context5.abrupt("return", res.status(500).json({
            loginSuccess: false,
            message: "토큰 발행 중에 오류가 발생했습니다."
          }));

        case 18:
          user.token = token;
          _context5.next = 21;
          return regeneratorRuntime.awrap(user.save());

        case 21:
          return _context5.abrupt("return", res.status(200).json({
            loginSuccess: true,
            name: user.user_name,
            token: token
          }));

        case 24:
          _context5.prev = 24;
          _context5.t0 = _context5["catch"](3);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            error: "something wrong"
          }));

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 24]]);
}; // 로그인 저장된 token과 비교해서


var cookieJwtAuth = function cookieJwtAuth(req, res, next) {
  var token, _decoded, checkUser, userId, userInfo;

  return regeneratorRuntime.async(function cookieJwtAuth$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          token = req.body.token;
          _decoded = jwt.verify(token, ACCESS_SECRET);
          _context6.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            user_id: _decoded.user_id
          }));

        case 5:
          checkUser = _context6.sent;

          if (!checkUser) {
            _context6.next = 15;
            break;
          }

          userId = _decoded.user_id;
          _context6.next = 10;
          return regeneratorRuntime.awrap(User.findOne({
            user_id: userId
          }));

        case 10:
          userInfo = _context6.sent;
          console.log(userInfo);
          next();
          _context6.next = 16;
          break;

        case 15:
          res.status(401).json({
            message: "인증되지 않은 사용자입니다."
          });

        case 16:
          _context6.next = 21;
          break;

        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var logoutUser = function logoutUser(req, res) {
  var token;
  return regeneratorRuntime.async(function logoutUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          token = req.body.token;
          res.json({
            message: "로그아웃 성공"
          });

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports = {
  // joinPersonal,
  // joinMember,
  loginUser: loginUser,
  logoutUser: logoutUser,
  // initUser,
  testUser: testUser,
  joinUserFindID: joinUserFindID,
  postMyPage: postMyPage,
  cookieJwtAuth: cookieJwtAuth,
  getMyPage: getMyPage
};