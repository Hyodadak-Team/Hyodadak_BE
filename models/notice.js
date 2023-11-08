const mongoose = require('mongoose');

const { Schema } = mongoose;

const noticeSchema = new Schema(
    {
        idx: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        contents: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        createTime: {
            type: Date,
            required: true,
        }
    },
    {
        collection: 'notices',
        versionKey: false,
    }
)

module.exports = mongoose.model('Board', noticeSchema);