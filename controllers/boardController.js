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
                    user_id : '1psjj031',
                    answers_contents : '1고민을 좀 하고 물어보세요1',
                    answers_create_time : Date.now(),
                    comments : [
                        {
                            user_id : '1aaaaaa1',
                            comments_contents : '1말이 좀 그렇네요 사과하세요1',
                            comments_create_time : Date.now(),
                        },
                        {
                            user_id : '1psjj031',
                            comments_contents : '1말을 험하게 했네요 사과합니다.1',
                            comments_create_time : Date.now(),
                        }
                    ]
                },
                {
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
                    user_id: '2psjj032',
                    answers_contents: '2고민을 좀 하고 물어보세요2',
                    answers_create_time: Date.now(),
                    comments: [
                        {
                            user_id: '2aaaaaa2',
                            comments_contents: '2말이 좀 그렇네요 사과하세요2',
                            comments_create_time: Date.now(),
                        },
                        {
                            user_id: '2psjj032',
                            comments_contents: '2말을 험하게 했네요 사과합니다.2',
                            comments_create_time: Date.now(),
                        }
                    ]
                },
                {
                    user_id: '2bbbb2',
                    answers_contents: '2역을 가보세요2',
                    answers_create_time: Date.now(),
                    comments: [
                        {
                            user_id: '2ccc2',
                            comments_contents: '오 굳',
                            comments_create_time: Date.now(),
                        },
                        {
                            user_id: '2qkrtjdwo56622',
                            comments_contents: '감사합니다 채택할게요',
                            comments_create_time: Date.now(),
                        }
                    ]
                },
            ],
        selected_answer: {
            user_id: '2bbbb2',
            answers_contents: '2역을 가보세요2',
            answers_create_time: Date.now(),
            comments: [
                {
                    user_id: '2ccc2',
                    comments_contents: '오 굳',
                    comments_create_time: Date.now(),
                },
                {
                    user_id: '2qkrtjdwo56622',
                    comments_contents: '감사합니다 채택할게요',
                    comments_create_time: Date.now(),
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
        console.log(allBoards)
        return res.render('board', { boards: allBoards}); // test
        // return res.status(200).json(allBoards); // api
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const selectBoardOne = async (req, res) => {
    try{
        const boardOne = await Board.findOne({
            _id: req.params.id
        })
        if(!boardOne)return res.status(400).json("해당 공지 없음");
        console.log(boardOne);
        return res.render('detail', {board : boardOne}); // test
        // return res.status(200).json(boardOne); // api
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

module.exports = {
    init, getAllBoards, selectBoardOne
}