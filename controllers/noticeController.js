require('./mongoConnect');
const { ObjectId } = require('mongodb');
const Notice = require('../models/notice');
const noticeList = require('../constants/noticeList');


const init = async(req, res) => {
    try{
        const NOTICE = await Notice.insertMany(
            noticeList
        )
        if(!NOTICE) return res.status(400).json("실패");
        return res.status(200).json("초기데이터 셋 성공");
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const getAllNotices = async(req, res) => {
    try{
        const allNotices = await Notice.find({});
        if(!allNotices) return res.status(400).json("실패");
        return res.status(200).json(allNotices);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const selectNoticeOne = async (req, res) => {
    try {
        const noticeOne = await Notice.findOne({
            _id: req.params.id
        });
        if(!noticeOne) return res.status(400).json("해당 공지 없음");
        // console.log(noticeOne);
        return res.status(200).json(noticeOne);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

// 수정 필요 -> index < 0 // index length 보다 초과시 발생상황 이슈 있음
const getPrevAndNowAndNextNotices = async (req, res) => {
    try {
        const index = req.params.index
        if(index  <  2){
            const three = await Notice.find({}).skip(req.params.index-1).limit(2);
            if(!three) return res.status(400).json("해당 공지 없음");
            const noticeList = [null, ...three]
            return res.status(200).json(noticeList);
        }else{
            const three = await Notice.find({}).skip(req.params.index-2).limit(3);
            if(!three) return res.status(400).json("해당 공지 없음");
            if(three.length === 2){
                const noticeList = [...three, null];
                return res.status(200).json(noticeList);
            }
            return res.status(200).json(three);
        }


    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const getLatestThreeNotices = async (req, res) => {
    try{
        const test = await Notice.find({}).sort({"_id" : -1}).limit(3)
        if(!test) return res.status(400).json("최신 공지 못찾음");
        return res.status(200).json(test);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const countNotices = async (req, res) => {
    try{
        const count = await Notice.find({}).count();
        if(!count) return res.status(400).json("개수 파악 불가");
        return res.status(200).json(count);
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}
module.exports = {
    init, getAllNotices, selectNoticeOne,
    getPrevAndNowAndNextNotices,
    getLatestThreeNotices,
    countNotices
}