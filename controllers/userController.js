require("./mongoConnect");
const { ObjectId } = require("mongodb");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userList = require("../constants/userList");
//유저 로그인시 데이터를 받기 위한 전역변수
let isNormalUserLogined = false;
let userID;

const saltRounds = 10; // salt 가미 값, 전역관리
const { ACCESS_SECRET } = process.env;

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

//localhost:4000/user/postUser -> post방식으로
const postMyPage = async (req, res) => {
  try {
    const { userData } = req.body;
    const token = req.body.token;
    const decoded = jwt.verify(token, ACCESS_SECRET);
    console.log(userData);

    const MyPageUser = await User.findOne({ user_name: decoded.user_name });
    if (MyPageUser) {
      const user = await User({
        profile_image: userData.profileImg,
        point: userData.money,
        selected_board_answer: userData.questionNum,
        level: userData.level,
        interest_category: userData.major,
        intro: userData.intro,
      });
      await user.save();
      res.status(200).json({
        user: {
          profile_image: user.profile_image,
          point: user.point,
          selected_board_answer: user.selected_board_answer,
          level: user.level,
          interest_category: user.interest_category,
          intro: user.intro,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error saving user data",
    });
  }
};

//localhost:4000/user -> get방식으로
const getMyPage = async (req, res) => {
  try {
    const token = req.body.token;
    console.log(token);
    const decoded = jwt.verify(token, ACCESS_SECRET);
    const MyPageUser = await User.findOne({ _id: decoded.user._id });

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
    console.log(isMatch);
    if (!isMatch) {
      return res.status(403).json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    const token = jwt.sign(
      { type: "jwt", user: { _id: user._id } },
      ACCESS_SECRET,
      {
        expiresIn: "5m",
      }
    );
    console.log(token);
    if (!token) {
      return res.status(500).json({
        loginSuccess: false,
        message: "토큰 발행 중에 오류가 발생했습니다.",
      });
    }

    user.token = token;

    console.log(token);
    return res.status(200).json({ token });
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

const authJwt = async (req, res, next) => {
  try {
    const token = req.body.token;
    console.log(token);
    const decoded = jwt.verify(token, ACCESS_SECRET);
    if (!decoded) return res.status(400).json("XX");
    console.log(decoded.user._id);
    const checkUser = await User.findOne({ _id: decoded.user._id });
    if (checkUser) {
      res.status(200).json("토큰 유효 인증 성공");
      next();
    } else {
      res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("토큰 유효하지 않음");
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
  authJwt,
};
