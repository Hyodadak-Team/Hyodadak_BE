require("./mongoConnect");
const { ObjectId } = require("mongodb");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//유저 로그인시 데이터를 받기 위한 전역변수
let isNormalUserLogined = false;
let userID;

const saltRounds = 10;
const { ACCESS_SECRET } = process.env;

// const userList = [
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

const testUser = async (req, res) => {
  try {
    const { data } = req.body;

    // 솔트 생성 및 해쉬화 진행
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(data.user_pw, salt);

    const USER = await User({
      ...data,
      user_pw: hashedPassword,
    });
    await USER.save();
    if (!USER) return res.status(400).json("실패");
    return res.status(200).json("초기데이터 셋 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

const joinUserFindID = async (req, res) => {
  try {
    const { data } = req.body;
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

//localhost:4000/user -> post방식으로
const postMyPage = async (req, res) => {
  try {
    const MyPageUser = await User.findOne({ user_id: decoded.user_id });

    if (MyPageUser) {
    }
  } catch (err) {
    console.log(err);
  }
};

//localhost:4000/user -> get방식으로
const getMyPage = async (req, res) => {
  try {
    const MyPageUser = await User.findOne({ user_id: decoded.user_id });

    if (MyPageUser) {
      // 필요한 정보 추출
      const userId = MyPageUser.user_id;
      const userImg = MyPageUser.profile_image;
      //배열
      const userIntersetCate = MyPageUser.interest_category;
      const userLevel = MyPageUser.level;
      const userSelectesAnswer = MyPageUser.selected_board_answer;
      const userPoint = MyPageUser.point;
      //배열의 길이
      const userPartener = MyPageUser.partner_id.length;
      const userIntro = MyPageUser.intro;

      res.status(200).json({
        userId: userId,
        userImg: userImg,
        userIntersetCate: userIntersetCate,
        userLevel: userLevel,
        userSelectesAnswer: userSelectesAnswer,
        userPoint: userPoint,
        userPartener: userPartener,
        userIntro: userIntro,
      });
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};

//로그인 미들웨어
const loginUser = async (req, res) => {
  const { id, pw } = req.body;

  //알림 기능을 위한 전역변수 변경
  userID = id;
  isNormalUserLogined = true;
  try {
    // body에 담아서 보내준 data의 id를 db에서 확인
    const user = await User.findOne({ user_id: id });
    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: "해당하는 아이디가 없습니다.",
      });
    }

    // 해싱 암호화한 비밀번호 대조
    const isMatch = await bcrypt.compare(pw, user.user_pw);
    if (!isMatch) {
      return res.status(403).json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
    console.log(pw, user.user_pw);

    const token = jwt.sign(
      { type: "jwt", name: user.user_name },
      ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );
    if (!token) {
      return res.status(500).json({
        loginSuccess: false,
        message: "토큰 발행 중에 오류가 발생했습니다.",
      });
    }
    user.token = token;
    await user.save();

    return res
      .status(200)
      .json({ loginSuccess: true, name: user.user_name, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something wrong" });
  }
};

// 로그인 저장된 token과 비교해서
const cookieJwtAuth = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, ACCESS_SECRET);
    const checkUser = await User.findOne({ user_id: decoded.user_id });

    if (checkUser) {
      const userId = decoded.user_id;
      const userInfo = await User.findOne({ user_id: userId });

      console.log(userInfo);
      next();
    } else {
      res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    }
  } catch (err) {
    console.error(err);
  }
};

const logoutUser = async (req, res) => {
  const { token } = req.body;
  res.json({ message: "로그아웃 성공" });
};

module.exports = {
  // joinPersonal,
  // joinMember,
  loginUser,
  logoutUser,
  // initUser,
  testUser,
  joinUserFindID,
  postMyPage,
  cookieJwtAuth,
  getMyPage,
};
