require("./mongoConnect");
const { ObjectId } = require("mongodb");
const Board = require("../models/board");
const boardList = require("../constants/boardList")

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
    const { answer_user_info, answer_contents } = req.body;
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
              answer_user_info,
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
    const { comment_user_info, comment_contents } = req.body;

    // board 찾고
    const boardOne = await Board.findOne({
      _id: board_id,
    });
    if (!boardOne) {
      console.log("해당 board 없음")
      return res.status(400).json("해당 board 없음");
    }

    // answer 찾고
    const answers = boardOne.answers;
    const answerIndex = answers.findIndex((answer) =>
      answer._id.equals(answer_id)
    );

    if (answerIndex === -1){
      console.log("해당 answer 없음")
      return res.status(400).json("해당 answer 없음");
    }

    // 해당 answer comment 추가 해주고
    answers[answerIndex] = {
      ...answers[answerIndex],
      comments: [
        ...answers[answerIndex].comments,
        {
          _id: new ObjectId(),
          comment_user_info,
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
