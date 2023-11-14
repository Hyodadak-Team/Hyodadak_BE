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
    user_intro: {
      type: String,
      required: true,
    },
    // 레벨
    user_level: {
      type: Number,
      reqiured: true,
      default: 0,
    },
    // 관심사
    interser_category: {
      type: Array,
      required: true,
      default: [],
    },
    //요청 파트너
    request_partner: {
      type: Array,
    },
    //응답 파트너
    response_partner: {
      type: Array,
    },
    //파트너 정보
    partner_info: {
      type: Array,
      required: true,
      default: [],
    },
    //프로필 이미지
    partner_info: {
      type: String,
      required: false,
    },
    //내 댓글
    my_comment: {
      type: Object,
    },
    //내 질문
    my_question: {
      type: Object,
    },
    //시뮬레이션 상태
    simulation: {
      type: Object,
      required: true,
      default: {},
    },
    //내 답변
    my_answer: {
      type: Object,
    },
    //나의 채택된 답변 개수
    selected_answer: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collation: "users",
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
