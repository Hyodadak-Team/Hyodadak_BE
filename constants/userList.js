const userList = [
  {
    user_id: "dbswp",
    user_pw: "1234",
    user_tel: "01012345678",
    user_name: "윤제",
    user_type: "responser",
    intro: "안녕하세요 아는게 많은 송수빈입니다.",
    level: 2,
    poiint: 1000,
    interest_category: ["무인자판기", "이동수단", "기타"],
    alam_partner: [
      {
        user_id: "qkrtjdwo5662",
        create_time: "date",
        contents: "받아주세요",
        is_partner: "pendding",
      },
    ],
    partner_id: ["dbswp", "dmswl"],
    partner_image: "m1", // m1,m2 이런식
    my_board_question: null,
    my_board_answer: [
      {
        board_Object_Id: "3231323dsad", // 어떤 게시물
        answer_Object_Id: "3231323dsad", // 어떤 답변
      },
    ],
    select_board_answer: null,
    selected_board_answer: 4,
  },
  {
    user_id: "wldnjspark",
    user_pw: "1234",
    user_tel: "01012345678",
    user_name: "박지원",
    user_type: "questioner",
    intro: "안녕하세요 아는게 많은 송수빈입니다.",
    level: null,
    poiint: 1000,
    interser_category: ["무인자판기", "이동수단", "기타"],
    alam_partner: [
      {
        user_id: "qkrtjdwo5662",
        create_time: "date",
        contents: "받아주세요",
        is_partner: "pendding",
      },
    ],
    partner_info: ["dbswp", "dmswl"],
    partner_image: "m1", // m1,m2 이런식
    my_board_question: ["ObjectId"],
    my_board_answer: null,
    select_board_answer: 2,
    selected_board_answer: null,
  },
];

module.exports = userList;