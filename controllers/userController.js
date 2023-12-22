require("./mongoConnect");
const { ObjectId } = require("mongodb");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const userList = require("../constants/userList");
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

//localhost:4000/user/postuser -> post방식으로
const postMyPage = async (req, res) => {
  try {
    const { userData, token } = req.body;
    const decoded = jwt.verify(token, ACCESS_SECRET);

    const MyPageUser = await User.findOne({ _id: decoded.user._id });
    if (MyPageUser) {
      MyPageUser.profile_image = userData.profileImg;
      MyPageUser.partner_id = userData.partnerId;
      MyPageUser.point = userData.money;
      MyPageUser.selected_board_answer = userData.questionNum;
      MyPageUser.level = userData.level;
      MyPageUser.interest_category = userData.major;
      MyPageUser.intro = userData.intro;

      await MyPageUser.save();

      res.status(200).json({
        user: {
          user_id: MyPageUser.user_id,
          user_name: MyPageUser.user_name,
          partner_id: MyPageUser.partner_id,
          profile_image: MyPageUser.profile_image,
          point: MyPageUser.point,
          selected_board_answer: MyPageUser.selected_board_answer,
          level: MyPageUser.level,
          interest_category: MyPageUser.interest_category,
          intro: MyPageUser.intro,
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

//localhost:4000/user/getuser -> get방식으로
const getMyPage = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
    }

    const token = authorizationHeader.split(" ")[1]; // Bearer 다음의 토큰 값
    const decoded = jwt.verify(token, ACCESS_SECRET);

    // decoded에는 토큰에 저장된 정보가 들어있습니다. 이 정보를 사용하여 데이터베이스에서 사용자 정보를 조회합니다.
    const userDataFromDB = await User.findOne(decoded.user_id);

    if (userDataFromDB) {
      res.status(200).json(userDataFromDB);
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
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
        expiresIn: "5h",
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
