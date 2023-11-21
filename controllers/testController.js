require('./mongoConnect');
const { ObjectId } = require('mongodb');

const test = async (req, res) => {
    try{
        console.log(req.body);

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    test
}