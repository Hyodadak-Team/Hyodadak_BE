require('./mongoConnect');

const { ObjectId } = require('mongodb');
const Board = require('../models/board');

const boardList = [
    {
        board_title : '1KTX 시간 바꾸고 싶어요 1',
        board_contents : '1KTX 타고 가려고 하는데 시간을 잘못 예약했어요.. 시간이 얼마 안남았는데 바꾸고 싶어요 가능할까요? 오프라인으로 얘기할 수 있는 곳이 문을 닫아서 온라인으로 직접 해야할 것 같은데 어떻게 해야할지 모르겠네요.. 기차표 취소하고 하려면 바로 자리 매진날 것 같아서 겁나서 시도를 못하겠어요ㅠㅠ 제발 도움 좀 주세요1',
        board_category : ['이동수단', '상품구매'],
        board_access : 'public',
        board_point : 100,
        board_img : ['test11.png', 'test12.png'],
        writer_id : '1qkrtjdwo56621',
        create_time : Date.now(),
        status : 'wait',
        answers :
            [
                {
                    _id : new ObjectId(),
                    user_id : '1psjj031',
                    answer_contents : '1고민을 좀 하고 물어보세요1',
                    answer_create_time : Date.now(),
                    comments : [
                        {
                            user_id : '1aaaaaa1',
                            comment_contents : '1말이 좀 그렇네요 사과하세요1',
                            comment_create_time : Date.now(),
                        },
                        {
                            user_id : '1psjj031',
                            comment_contents : '1말을 험하게 했네요 사과합니다.1',
                            comment_create_time : Date.now(),
                        }
                    ]
                },
                {
                    _id : new ObjectId(),
                    user_id : '1bbbb1',
                    answer_contents : '1역을 가보세요1',
                    answer_create_time : Date.now(),
                    comments : [
                        {
                            user_id : '1ccc1',
                            comment_contents : '오 굳',
                            comment_create_time : Date.now(),
                        },
                        {
                            user_id : '1qkrtjdwo56621',
                            comment_contents : '감사합니다 채택할게요',
                            comment_create_time : Date.now(),
                        }
                    ]
                },
            ],
        selected_answer : {
            user_id : '1bbbb1',
            answers_contents : '1역을 가보세요1',
            answers_create_time : Date.now(),
            comments : [
                {
                    user_id : '1ccc1',
                    comments_contents : '오 굳',
                    comments_create_time : Date.now(),
                },
                {
                    user_id : '1qkrtjdwo56621',
                    comments_contents : '감사합니다 채택할게요',
                    comments_create_time : Date.now(),
                }
            ]
        },
        views: 0,
    },
    {
        board_title: '2KTX 시간 바꾸고 싶어요 2',
        board_contents: '2KTX 타고 가려고 하는데 시간을 잘못 예약했어요.. 시간이 얼마 안남았는데 바꾸고 싶어요 가능할까요? 오프라인으로 얘기할 수 있는 곳이 문을 닫아서 온라인으로 직접 해야할 것 같은데 어떻게 해야할지 모르겠네요.. 기차표 취소하고 하려면 바로 자리 매진날 것 같아서 겁나서 시도를 못하겠어요ㅠㅠ 제발 도움 좀 주세요2',
        board_category: ['이동수단2', '상품구매2'],
        board_access: 'private',
        board_point: 100,
        board_img: ['test21.png', 'test22.png'],
        writer_id: '2qkrtjdwo56622',
        create_time: Date.now(),
        status: 'complete',
        answers:
            [
                {
                    _id : new ObjectId(),
                    user_id: '2psjj032',
                    answer_contents: '2고민을 좀 하고 물어보세요2',
                    answer_create_time: Date.now(),
                    comments: [
                        {
                            user_id: '2aaaaaa2',
                            comment_contents: '2말이 좀 그렇네요 사과하세요2',
                            comment_create_time: Date.now(),
                        },
                        {
                            user_id: '2psjj032',
                            comment_contents: '2말을 험하게 했네요 사과합니다.2',
                            comment_create_time: Date.now(),
                        }
                    ]
                },
                {
                    _id : new ObjectId(),
                    user_id: '2bbbb2',
                    answer_contents: '2역을 가보세요2',
                    answer_create_time: Date.now(),
                    comments: [
                        {
                            user_id: '2ccc2',
                            comment_contents: '오 굳',
                            comment_create_time: Date.now(),
                        },
                        {
                            user_id: '2qkrtjdwo56622',
                            comment_contents: '감사합니다 채택할게요',
                            comment_create_time: Date.now(),
                        }
                    ]
                },
            ],
        selected_answer: {
            user_id: '2bbbb2',
            answer_contents: '2역을 가보세요2',
            answer_create_time: Date.now(),
            comments: [
                {
                    user_id: '2ccc2',
                    comment_contents: '오 굳',
                    comment_create_time: Date.now(),
                },
                {
                    user_id: '2qkrtjdwo56622',
                    comment_contents: '감사합니다 채택할게요',
                    comment_create_time: Date.now(),
                }
            ]
        },
        views: 0,
    },
]

const init = async(req, res) => {
    try{
        const BOARD = await Board.insertMany(
            boardList
        )
        if(!BOARD) return res.status(400).json("실패");
        return res.status(200).json("초기데이터 셋 성공");
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const getAllBoards = async (req, res) => {
    try{
        const allBoards = await Board.find({});
        return res.render('board', { boards: allBoards}); // test
        // return res.status(200).json(allBoards); // api
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}



// board
// c
const createBoard = async (req, res) => {
    try{
        const {
            board_title, // string, required
            board_contents, // string, required
            board_category, // array, required
            board_access, // string, required
            board_point, // number, required
            // board_img // array, default : [] -> * 추가 구현 필요 *
            writer_id, // string, required
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
            writer_id,
        })
        if(!board) return res.status(400).json('board 생성 실패');
        return res.status(200).json('board 생성 성공');

    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}
// r
const selectBoardOne = async (req, res) => {
    try{
        const boardOne = await Board.findOne({
            _id: req.params.id
        })
        if(!boardOne)return res.status(400).json("해당 공지 없음");
        return res.render('detail', {board : boardOne}); // test
        // return res.status(200).json(boardOne); // api
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

// u
const increaseViews = async (req, res ) => {
    try{
        const board = await Board.findOne({
            _id: req.params.id
        })
        if(!board) return res.status(400).json("해당 board 찾기 실패");
        const modifyBoard = await Board.updateOne(
            {
                _id: req.params.id,
            },{
                $set:
                    {
                        views: board.views + 1
                    }
            }
        )
        if(modifyBoard.modifiedCount !== 1){
            console.log(modifyBoard.modifiedCount)
            return res.status(400).json('board 수정 실패');
        }
        return res.status(200).json("조회수 올리기 성공");
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const selectBoardOneToModify = async (req, res) => {
    try{
        const boardOne = await Board.findOne({
            _id : req.params.id
        })
        if(!boardOne)return res.status(400).json("해당 공지 없음");
        return res.render('board_modify', {board : boardOne}); // test
        // return res.status(200).json(boardOne); // api
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const modifyBoardOne = async (req, res ) => {
    try{
        const {board_title, board_contents, board_category , board_access, board_img} = req.body;

        const modifyBoard = await Board.updateOne(
            {
                _id: req.params.id,
            },{
                $set:
                    {
                        board_title,
                        board_contents,
                        board_category,
                        board_access,
                        board_img
                    }
            }
        )
        // console.log(modifyBoard);
        // if(modifyBoard.modifiedCount !== 1){
        //     console.log(modifyBoard.modifiedCount)
        //     return res.status(400).json('board 수정 실패');
        // }
        //
        return res.status(200).json("수정 OK");
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

// d
const deleteBoardOne = async (req, res) => {
    try{
        const deleteBoard = await Board.deleteOne({
            _id : req.params.id
        })
        if(deleteBoard.deletedCount !== 1){
            console.log(deleteBoard.deletedCount);
            return res.status(200).json("board 지우기 실패")
        }
        return res.status(200).json("board 지우기 성공");
    }catch(err){
        console.log(err);
    }
}

// board - answer
const addAnswer = async (req, res) => {
    try{
        const {
            user_id,
            answer_contents,

        } = req.body;
        const board = await Board.findOne({
            _id: req.params.id
        })
        if(!board) return res.status(400).json("answer 추가 실패");

        const modifyBoard = await Board.updateOne(
            {
                _id: req.params.id,
            },
            { $set:
                    { answers:
                            [...board.answers,
                                {
                                    _id : new ObjectId(),
                                    user_id,
                                    answer_contents,
                                    answer_create_time : Date.now(),
                                    comments : []
                                }
                            ]
                    }
            },
        );
        if(!modifyBoard) return res.status(400).json('answer 추가 실패');
        return res.status(200).json('answer 추가 성공');

    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

// board - answer - comment
const addComment = async (req, res) => {
    try{
        const {
            user_id,
            comment_contents,

        } = req.body;
        const board = await Board.findOne({
            _id: req.params.id
        })

        if(!board) return res.status(400).json("comments 추가 실패");
        const index = req.params.index;
        const answers = [
            ...board.answers
        ]
        answers[index] = {
            user_id : answers[index].user_id,
            answer_contents : answers[index].answer_contents,
            answer_create_time : answers[index].answer_create_time,
            comments : [
                ...answers[index].comments,
                {
                    user_id,
                    comment_contents,
                    comment_create_time : Date.now(),

                }
            ]
        }
        console.log(answers);
        const modifyBoard = await Board.updateOne(
            {
                _id: req.params.id,
            },
            { $set:
                    {
                        answers:[...answers]
                    }
            },
        );
        if(!modifyBoard) return res.status(400).json('comments 추가 실패');
        return res.status(200).json('comments 추가 성공');

    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

module.exports = {
    init, getAllBoards,
    createBoard, selectBoardOne, increaseViews, deleteBoardOne, selectBoardOneToModify, modifyBoardOne,
    addAnswer,
    addComment
}