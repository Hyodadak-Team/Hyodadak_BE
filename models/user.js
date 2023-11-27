const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // 아이디
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    // 비밀번호
    user_pw: {
      type: String,
      required: true,
    },
    // 전화번호
    user_tel: {
      type: String,
      required: true,
      unique: true,
    },
    // 이름
    user_name: {
      type: String,
      required: true,
    },
    // 유형
    user_type: {
      type: String,
      required: true,
    },
    // 소개글
    intro: {
      type: String,
      required: false,
    },
    // 레벨
    level: {
      type: Number,
      reqiured: false,
      default: null,
    },
    //용돈
    point: {
      type: Number,
      required: false,
      default: 0,
    },
    // 관심사
    interest_category: {
      type: Array,
      required: false,
      default: [],
    },
    //요청 파트너
    alam_partner: {
      type: Array,
    },
    //파트너 정보
    partner_id: {
      type: Array,
      required: false,
      default: [],
    },
    //프로필 이미지
    profile_image: {
      type: String,
      required: false,
    },
    //내 질문
    my_board_question: {
      type: Array,
      default: null,
    },
    //내 답변
    my_board_answer: {
      type: Array,
      default: null,
    },
    //나의 채택된 답변 개수
    select_board_answer: {
      type: Number,
      required: false,
      default: null,
    },
    //나의 채택된 답변 개수
    selected_board_answer: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    collation: "users",
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
