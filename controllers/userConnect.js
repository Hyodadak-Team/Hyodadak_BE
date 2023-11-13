require("./mongoConnect");
const { ObjectId } = require("mongodb");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//유저 로그인시 데이터를 받기 위한 전역변수
let isNormalUserLogined = false;
let userID;
const { ACCESS_SECRET } = process.env;

const registerPersonal = async (req, res) => {
  try {
    const { name, phone } = req.body;
    // 빈값이 오면 팅겨내기
    if (name === "" || phone === "") {
      return res.json({ registerSuccess: false, message: "정보를 입력하세요" });
    }
    const samePhoneUser = await User.findOne({ phone });
    if (samePhoneUser !== null) {
      return res.json({
        registerSuccess: false,
        message: "이미 존재하는 번호입니다.",
      });
    }
    const user = new User({
      name,
      phone,
    });
    await user.save();
    res.send("저장 성공");
    next();
    return res.json({ registerSuccess: true });
  } catch (error) {
    return res.json({ registerSuccess: false, message: error.message });
  }
};

const registerMember = async (req, res) => {
  try {
    const { id, password, passwordCheck } = req.body;
    // 빈값이 오면 팅겨내기
    if (id === "" || password === "" || passwordCheck === "") {
      return res.json({ registerSuccess: false, message: "정보를 입력하세요" });
    }
    const sameIdUser = await User.findOne({ id });
    if (sameIdUser !== null) {
      return res.json({
        registerSuccess: false,
        message: "이미 존재하는 아이디입니다",
      });
    }
    // 솔트 생성 및 해쉬화 진행
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      id,
      password: hashedPassword,
    });
    await user.save();
    res.send("저장 성공");
    return res.json({ registerSuccess: true });
  } catch (error) {
    return res.json({ registerSuccess: false, message: error.message });
  }
};

//로그인 미들웨어
const loginUser = async (req, res) => {
  const { id, password } = req.body;

  //알림 기능을 위한 전역변수 변경
  userID = id;
  isNormalUserLogined = true;
  try {
    // body에 담아서 보내준 id를 db에서 확인
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: "해당하는 아이디가 없습니다.",
      });
    }

    // 해싱 암호화한 비밀번호 대조
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    const token = jwt.sign({ type: "jwt", id: user.id }, ACCESS_SECRET, {
      expiresIn: "7d",
    });
    user.token = token;
    await user.save();

    return res.status(200).json({ loginSuccess: true, id: user.id, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something wrong" });
  }
};

const logoutUser = async (req, res) => {
  const { token } = req.body;
  res.json({ message: "로그아웃 성공" });
};

module.exports = {
  registerPersonal,
  registerMember,
  loginUser,
  logoutUser,
};
