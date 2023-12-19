require('./mongoConnect');
const { ObjectId } = require('mongodb');
const Notice = require('../models/notice');
const noticeList = require('../constants/noticeList');
const category = ["", "notification", "event"]

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
        const allNotices = await Notice.find({})
        if(!allNotices) return res.status(400).json("실패");
        return res.status(200).json(allNotices);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}


const getAllNoticesDesc = async(req, res) => {
    try{
        const allNoticesDesc = await Notice.find({}).sort({"_id" : -1})
        if(!allNoticesDesc) return res.status(400).json("실패");
        return res.status(200).json(allNoticesDesc);
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

const getPrevAndNowAndNextNotices = async (req, res) => {
    try {
        const index = parseInt(req.params.index)
        const noticeLength = await Notice.find({}).count()

        if(index === 1){
            const three = await Notice.find({}).skip(index-1).limit(2);
            if(!three) return res.status(400).json("해당 공지 없음");
            const noticeList = [null, ...three]
            return res.status(200).json(noticeList);
        }else if(index > 1 && index <= noticeLength){
            const three = await Notice.find({}).skip(index-2).limit(3);
            if(!three) return res.status(400).json("해당 공지 없음");
            if(three.length === 2){
                const noticeList = [...three, null];
                return res.status(200).json(noticeList);
            }
            return res.status(200).json(three);
        }else{
            return res.status(400).json("해당 공지 없음");
        }
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const getLatestThreeNotices = async (req, res) => {
    try{
        const test = await Notice.find({}).sort({"_id" : -1}).limit(3);
        if(!test) return res.status(400).json("최신 공지 못찾음");
        return res.status(200).json(test);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const countNoticesByCategory = async (req, res) => {
    try{
        const category_number = parseInt(req.params.category_number);
        console.log(category_number)

        if(category_number === 0){
            const count = await Notice.find({}).count();
            if(!count) return res.status(400).json("개수 파악 불가");
            return res.status(200).json(count);
        }else if(category_number < category.length){
            const count = await Notice.find({category: category[category_number]}).count();
            if(!count) return res.status(400).json("개수 파악 불가");
            return res.status(200).json(count);
        }else{
            return res.status(400).json("없어요");
        }

    }catch (err){
        console.log(err);
        return res.status(500).json("오류 발생");
    }
}

const getNoticesByCategory = async (req, res) => {
    try{
        const category_number = parseInt(req.params.category_number);
        console.log(category_number)

        if(category_number === 1){
            const notices = await Notice.find({category: "notification"});
            return res.status(200).json(notices)
        }else if(category_number === 2){
            const notices = await Notice.find({category: "event"});
            return res.status(200).json(notices)
        }
    }catch(err){
        console.log(err);
        return res.status(500).json("오류 발생");
    }
}

const paginationByCategory = async (req, res) => {
    try{
        const category_number = parseInt(req.params.category_number);
        console.log(category_number)
        const itemsPerPage = 7;
        const currentPage = parseInt(req.params.page);

        if(category_number === 0){
            const count = await Notice.find({}).count();
            const pageLength = Math.ceil(count/itemsPerPage)
            if(pageLength === currentPage){
                const test = await Notice.find({}).sort({"_id":-1}).skip((currentPage-1)*itemsPerPage).limit(count%itemsPerPage);
                return res.status(200).json(test)
            }else if(currentPage!== 0 && pageLength > currentPage){
                const test = await Notice.find({}).sort({"_id":-1}).skip((currentPage-1)*itemsPerPage).limit(itemsPerPage);
                return res.status(200).json(test);
            }else{
                return res.status(400).json("XX");
            }
        }else if(category_number < category.length){
            const count = await Notice.find({category : category[category_number]}).count();
            const pageLength = Math.ceil(count/itemsPerPage)
            if(pageLength === currentPage){
                const test = await Notice.find({category : category[category_number]}).sort({"_id":-1}).skip((currentPage-1)*itemsPerPage).limit(count%itemsPerPage);
                return res.status(200).json(test)
            }else if(currentPage!== 0 && pageLength > currentPage){
                const test = await Notice.find({category : category[category_number]}).sort({"_id":-1}).skip((currentPage-1)*itemsPerPage).limit(itemsPerPage);
                return res.status(200).json(test);
            }else{
                return res.status(400).json("XX");
            }
        }else{
            return res.status(400).json("없어요");
        }


    }catch(err){
        console.log(err);
        return res.status(500).json("오류 발생");
    }
}


module.exports = {
    init, getAllNotices, getAllNoticesDesc ,selectNoticeOne,
    getPrevAndNowAndNextNotices,
    getLatestThreeNotices,
    countNoticesByCategory,
    paginationByCategory,
    getNoticesByCategory
}