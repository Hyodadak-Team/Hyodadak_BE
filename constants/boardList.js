const {ObjectId} = require("mongodb");
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

module.exports = boardList;