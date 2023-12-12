require("./mongoConnect");

const { ObjectId } = require("mongodb");
const Board = require("../models/board");

const boardList = [
  {
    board_title: "1KTX 시간 바꾸고 싶어요",
    board_contents:
      "1KTX 타고 가려고 하는데 시간을 잘못 예약했어요.. 시간이 얼마 안남았는데 바꾸고 싶어요 가능할까요? 오프라인으로 얘기할 수 있는 곳이 문을 닫아서 온라인으로 직접 해야할 것 같은데 어떻게 해야할지 모르겠네요.. 기차표 취소하고 하려면 바로 자리 매진날 것 같아서 겁나서 시도를 못하겠어요ㅠㅠ 제발 도움 좀 주세요1",
    board_category: "이동수단",
    board_access: "public",
    board_point: 100,
    board_img: ["test11.png", "test12.png"],
    writer_user_info: {
      user_id: "qkrtjdwo5662",
      pro_img: "m1",
      interest_category : ["무인자판기", "이동수단", "기타"],
    },
    create_time: Date.now(),
    status: "wait",
    answers: [
      {
        _id: new ObjectId(),
        answer_user_info :{
          user_id: "psjj03",
          pro_img: "m1",
          interest_category : ["무인자판기", "이동수단", "기타"],
        },
        answer_contents: "고민을 좀 하고 물어보세요",
        answer_create_time: new Date(Date.now()),
        comments: [
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "aaaaa",
              pro_img: "m2",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "말이 좀 그렇네요 사과하세요",
            comment_create_time: new Date(Date.now()),
          },
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "psjj03",
              pro_img: "m1",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "말을 험하게 했네요 사과합니다.",
            comment_create_time: new Date(Date.now()),
          },
        ],
      },
      {
        _id: new ObjectId(),
        answer_user_info :{
          user_id: "bbbbb",
          pro_img: "w1",
          interest_category : ["무인자판기", "이동수단", "기타"],
        },
        answer_contents: "역을 가보세요",
        answer_create_time: new Date(Date.now()),
        comments: [
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "ccccc",
              pro_img: "w2",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "오 굳",
            comment_create_time: new Date(Date.now()),
          },
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "qkrtjdwo5662",
              pro_img: "m1",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "감사합니다 채택할게요",
            comment_create_time: new Date(Date.now()),
          },
        ],
      },
    ],
    selected_answer: [],
    views: 0,
  },
  {
    board_title: "KTX 어디서탐?",
    board_contents:
        "KTX를 어디서 타는지 모르겠어요. 어디서 타는지좀 제발좀 알려주세요 제발좀 제발좀 제발좀 제발좀",
    board_category: "이동수단",
    board_access: "public",
    board_point: 100,
    board_img: ["test11.png", "test12.png"],
    writer_user_info: {
      user_id: "tjdwo1234",
      pro_img: "m1",
      interest_category : ["무인자판기", "이동수단", "기타"],
    },
    create_time: Date.now(),
    status: "wait",
    answers: [
      {
        _id: new ObjectId(),
        answer_user_info :{
          user_id: "psjj03",
          pro_img: "m1",
          interest_category : ["무인자판기", "이동수단", "기타"],
        },
        answer_contents: "고민을 좀 하고 물어보세요",
        answer_create_time: new Date(Date.now()),
        comments: [
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "aaaaa",
              pro_img: "m2",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "말이 좀 그렇네요 사과하세요",
            comment_create_time: new Date(Date.now()),
          },
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "psjj03",
              pro_img: "m1",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "말을 험하게 했네요 사과합니다.",
            comment_create_time: new Date(Date.now()),
          },
        ],
      },
      {
        _id: new ObjectId(),
        answer_user_info :{
          user_id: "bbbbb",
          pro_img: "w1",
          interest_category : ["무인자판기", "이동수단", "기타"],
        },
        answer_contents: "역을 가보세요",
        answer_create_time: new Date(Date.now()),
        comments: [
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "ccccc",
              pro_img: "w2",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "오 굳",
            comment_create_time: new Date(Date.now()),
          },
          {
            _id: new ObjectId(),
            comment_user_info :{
              user_id: "qkrtjdwo5662",
              pro_img: "m1",
              interest_category : ["무인자판기", "이동수단", "기타"],
            },
            comment_contents: "감사합니다 채택할게요",
            comment_create_time: new Date(Date.now()),
          },
        ],
      },
    ],
    selected_answer: [],
    views: 0,
  },
];

const init = async (req, res) => {
  try {
    const BOARD = await Board.insertMany(boardList);
    if (!BOARD) return res.status(400).json("실패");
    return res.status(200).json("초기데이터 셋 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

const getAllBoards = async (req, res) => {
  try {
    const allBoards = await Board.find({});
    // return res.render('board', { boards: allBoards}); // test
    return res.status(200).json(allBoards); // api
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// ------board-------
// c
const createBoard = async (req, res) => {
  try {
    const {
      board_title, // string, required
      board_contents, // string, required
      board_category, // string, required
      board_access, // string, required
      board_point, // number, required
      // board_img // array, default : [] -> * 추가 구현 필요 *
      writer_user_info, // object, required
      // create_time // date, default : Date.now()
      // status // string, default : "wait"
      // answers // array, default : []
      // selected_answer // object, default : {}
      // views // number, default : 0
    } = req.body;

    const board = await Board.create({
      board_title,
      board_contents,
      board_category,
      board_access,
      board_point,
      writer_user_info,
    });
    if (!board) return res.status(400).json("board 생성 실패");
    return res.status(200).json("board 생성 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};
// r
const selectBoardOne = async (req, res) => {
  try {
    const boardOne = await Board.findOne({
      _id: req.params.id,
    });
    if (!boardOne) return res.status(400).json("해당 공지 없음");
    // return res.render('detail', {board : boardOne}); // test
    return res.status(200).json(boardOne); // api
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// 얘는 사용X
const selectBoardOneToModify = async (req, res) => {
  try {
    const boardOne = await Board.findOne({
      _id: req.params.id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");
    // return res.render('board_modify', {board : boardOne}); // test
    return res.status(200).json(boardOne); // api
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};
// 얘는 사용X

// u
const increaseViews = async (req, res) => {
  try {
    const boardOne = await Board.findOne({
      _id: req.params.id,
    });
    if (!boardOne) return res.status(400).json("해당 board 찾기 실패");
    const modifyBoard = await Board.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          views: boardOne.views + 1,
        },
      }
    );
    if (modifyBoard.modifiedCount !== 1) {
      return res.status(400).json("board 수정 실패");
    }
    return res.status(200).json("조회수 올리기 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

const modifyBoardOne = async (req, res) => {
  try {
    const {
      board_title,
      board_contents,
      board_category,
      board_access,
      board_img,
    } = req.body;
    const modifyBoard = await Board.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          board_title,
          board_contents,
          board_category,
          board_access,
          board_img,
        },
      }
    );
    if (modifyBoard.matchedCount !== 1)
      return res.status(400).json("board 수정 실패");
    return res.status(200).json("수정 OK");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// d
const deleteBoardOne = async (req, res) => {
  try {
    const deleteBoard = await Board.deleteOne({
      _id: req.params.id,
    });
    if (deleteBoard.deletedCount !== 1)
      return res.status(200).json("board 지우기 실패");
    return res.status(200).json("board 지우기 성공");
  } catch (err) {
    console.log(err);
  }
};
// ------board-------

// ----- board - answer ------
// c
const addAnswer = async (req, res) => {
  try {
    const { user_id, answer_contents } = req.body;
    const boardOne = await Board.findOne({
      _id: req.params.id,
    });
    if (!boardOne) return res.status(400).json("answer 추가 실패");

    const modifyBoard = await Board.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          answers: [
            ...boardOne.answers,
            {
              _id: new ObjectId(),
              user_id,
              answer_contents,
              answer_create_time: new Date(Date.now()),
              comments: [],
            },
          ],
        },
      }
    );
    if (modifyBoard.modifiedCount < 1)
      return res.status(400).json("answer 추가 실패");
    return res.status(200).json("answer 추가 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// r
const selectAnswerOne = async (req, res) => {
  try {
    const { board_id, answer_id } = req.params;

    // 게시물(board) 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    // 답변(answer) 찾고
    const answerOne = boardOne.answers.find((answer) =>
      answer._id.equals(answer_id)
    );
    if (!answerOne) return res.status(400).json("해당 answer 없음");
    return res.status(200).json(answerOne);
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// u
const modifyAnswerOne = async (req, res) => {
  try {
    const { board_id, answer_id } = req.params;
    const { answer_contents } = req.body;

    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    const answers = boardOne.answers;
    const selectAnswerOneIndex = boardOne.answers.findIndex((answer) =>
      answer._id.equals(answer_id)
    );
    answers[selectAnswerOneIndex] = {
      ...answers[selectAnswerOneIndex],
      answer_contents,
    };

    const modifyBoard = await Board.updateOne(
      {
        _id: board_id,
      },
      {
        $set: {
          answers,
        },
      }
    );
    if (modifyBoard.matchedCount !== 1)
      return res.status(400).json("answer 수정 실패");
    return res.status(200).json("answer 수정 완료");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// d
const deleteAnswerOne = async (req, res) => {
  try {
    const { board_id, answer_id } = req.params;

    // 게시물(board) 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    // 답변(answer) 찾고
    const answers = boardOne.answers;
    const selectAnswerOneIndex = boardOne.answers.findIndex((answer) =>
      answer._id.equals(answer_id)
    );

    answers.splice(selectAnswerOneIndex, 1);
    // console.log(answers);

    const modifyBoard = await Board.updateOne(
      {
        _id: board_id,
      },
      {
        $set: {
          answers,
        },
      }
    );
    console.log(modifyBoard);
    if (modifyBoard.modifiedCount < 1)
      return res.status(400).json("answer 삭제 실패");
    return res.status(200).json("answer 삭제 완료");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// board - answer - comment
// c
const addComment = async (req, res) => {
  try {
    const { board_id, answer_id } = req.params;
    const { user_id, comment_contents } = req.body;

    // board 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    // answer 찾고
    const answers = boardOne.answers;
    const answerIndex = answers.findIndex((answer) =>
      answer._id.equals(answer_id)
    );
    if (!answerIndex) return res.status(400).json("해당 answer 없음");

    // 해당 answer comment 추가 해주고
    answers[answerIndex] = {
      ...answers[answerIndex],
      comments: [
        ...answers[answerIndex].comments,
        {
          _id: new ObjectId(),
          user_id,
          comment_contents,
          comment_create_time: new Date(Date.now()),
        },
      ],
    };

    const modifyBoard = await Board.updateOne(
      {
        _id: board_id,
      },
      {
        $set: {
          answers: [...answers],
        },
      }
    );

    if (modifyBoard.modifiedCount < 1)
      return res.status(400).json("comments 추가 실패");
    return res.status(200).json("comments 추가 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// r
const selectCommentOne = async (req, res) => {
  try {
    const { board_id, answer_id, comment_id } = req.params;

    // board 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    // answer 찾고
    const answers = boardOne.answers;
    const answerOne = answers.find((answer) => answer._id.equals(answer_id));
    if (!answerOne) return res.status(400).json("해당 answer 없음");

    // comment 찾고
    const comments = answerOne.comments;
    const commentOne = comments.find((comment) =>
      comment._id.equals(comment_id)
    );
    if (!commentOne) return res.status(400).json("해당 comment 없음");
    return res.status(200).json(commentOne);
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// u
const modifyCommentOne = async (req, res) => {
  try {
    const { board_id, answer_id, comment_id } = req.params;
    const { comment_content } = req.body;
    // board 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    // answer 찾고
    const answers = boardOne.answers;
    const answerIndex = answers.findIndex((answer) =>
      answer._id.equals(answer_id)
    );
    const answerOne = answers.find((answer) => answer._id.equals(answer_id));
    if (!answerOne || answerIndex === -1)
      return res.status(400).json("해당 answer 없음");

    // comment 찾고
    const comments = answerOne.comments;
    const commentIndex = comments.findIndex((comment) =>
      comment._id.equals(comment_id)
    );
    if (commentIndex === -1) return res.status(400).json("해당 comment 없음");

    // comment 수정해주고
    comments[commentIndex] = {
      ...comments[commentIndex],
      comment_content,
    };

    // answer에 반영해주고
    answers[answerIndex] = {
      ...answers[answerIndex],
      comments: [...comments],
    };

    const modifyBoard = await Board.updateOne(
      {
        _id: board_id,
      },
      {
        $set: {
          answers: [...answers],
        },
      }
    );
    console.log(modifyBoard);
    if (modifyBoard.modifiedCount < 1)
      return res.status(400).json("comments 수정 실패");
    return res.status(200).json("comments 수정 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};

// d
const deleteCommentOne = async (req, res) => {
  try {
    const { board_id, answer_id, comment_id } = req.params;

    // board 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) return res.status(400).json("해당 board 없음");

    // answer 찾고
    const answers = boardOne.answers;
    const answerIndex = answers.findIndex((answer) =>
      answer._id.equals(answer_id)
    );
    const answerOne = answers.find((answer) => answer._id.equals(answer_id));
    if (!answerOne || answerIndex === -1)
      return res.status(400).json("해당 answer 없음");

    // comment 찾고
    const comments = answerOne.comments;
    const commentIndex = comments.findIndex((comment) =>
      comment._id.equals(comment_id)
    );
    if (commentIndex === -1) return res.status(400).json("해당 comment 없음");

    // comment 지우고
    comments.splice(commentIndex, 1);
    answers[answerIndex] = {
      ...answers[answerIndex],
      comments: [...comments],
    };

    const modifyBoard = await Board.updateOne(
      {
        _id: board_id,
      },
      {
        $set: {
          answers: [...answers],
        },
      }
    );
    console.log(modifyBoard);
    if (modifyBoard.modifiedCount < 1)
      return res.status(400).json("comments 삭제 실패");
    return res.status(200).json("comments 삭제 성공");
  } catch (err) {
    console.log(err);
    res.status(500).json("오류 발생");
  }
};
module.exports = {
  init,
  getAllBoards,
  createBoard,
  selectBoardOne,
  increaseViews,
  deleteBoardOne,
  selectBoardOneToModify,
  modifyBoardOne,
  addAnswer,
  selectAnswerOne,
  deleteAnswerOne,
  modifyAnswerOne,
  addComment,
  selectCommentOne,
  deleteCommentOne,
  modifyCommentOne,
};
