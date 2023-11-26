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

const userList = [
  {
    user_id: "nhd2010",
    user_pw: "asdf",
    user_tel: "01095567378",
    user_name: "dbswp",
    user_type: "questioner",
    user_intro: "안녕하세요 아는게 많은 송수빈입니다.",
    user_level: 3,
    interser_category: "",
    request_partner: "",
    response_partner: "",
    partner_info: "",
    partner_image: "", // m1,m2 이런식
    my_comment: "",
    my_question: "",
    my_answer: "",
    selected_answer: 2,
  },
];

const inituser = async (req, res) => {
  try {
    const USER = await User.insertMany(userList);
    if (!USER) return res.status(400).json("실패");
    return res.status(200).json("초기데이터 셋 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

const joinPersonal = async (req, res) => {
  try {
    const { joinState } = req.body;
    const name = joinState.user_name;
    const phone = joinState.user_tel;
    const id = joinState.user_id;
    const password = joinState.user_password;
    const type = joinState.user_type;

    console.log(type);
    console.log(name);
    console.log(phone);
    console.log(id);
    console.log(password);

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
    const sameIdUser = await User.findOne({ id });
    if (sameIdUser !== null) {
      return res.json({
        registerSuccess: false,
        message: "이미 존재하는 아이디입니다",
      });
    }
    // 빈값이 오면 팅겨내기
    if (id === "" || password === "" || passwordCheck === "") {
      return res.json({ registerSuccess: false, message: "정보를 입력하세요" });
    }

    // 솔트 생성 및 해쉬화 진행
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.insertMany({
      name,
      phone,
      id,
      type,
      password: hashedPassword,
    });
    if (!user) return res.status(400).json("실패");
    return res.json({ registerSuccess: true });
  } catch (error) {
    return res.json({ registerSuccess: false, message: error.message });
  }
};

// const joinMember = async (req, res) => {
//   try {
//     const { joinState } = req.body;
//     const id = joinState.user_id;
//     const password = joinState.user_pw;

//     // 빈값이 오면 팅겨내기
//     if (id === "" || password === "" || passwordCheck === "") {
//       return res.json({ registerSuccess: false, message: "정보를 입력하세요" });
//     }
//     const sameIdUser = await User.findOne({ id });
//     if (sameIdUser !== null) {
//       return res.json({
//         registerSuccess: false,
//         message: "이미 존재하는 아이디입니다",
//       });
//     }
//     // 솔트 생성 및 해쉬화 진행
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = new User({
//       id,
//       password: hashedPassword,
//     });
//     await user.save();
//     res.send("저장 성공");
//     console.log(id);
//     console.log(password);
//     console.log(hashedPassword);
//     return res.json({ registerSuccess: true });
//   } catch (error) {
//     return res.json({ registerSuccess: false, message: error.message });
//   }
// };

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
  joinPersonal,
  // joinMember,
  loginUser,
  logoutUser,
  inituser,
};
