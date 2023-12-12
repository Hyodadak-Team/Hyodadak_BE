const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardSchema = new Schema(
    {
        board_title: {
            type: String,
            required: true,
        },
        board_contents: {
            type: String,
            required: true,
        },
        board_category: {
            type: String,
            required: true,
        },
        board_access: {
            type: String,
            required: true,
        },
        board_point: {
            type: Number,
            required: true,
        },
        board_img: {
            type: Array,
            required: true,
            default:[],
        },
        writer_user_info: {
            type: Object,
            required: true,
        },
        create_time: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        status : {
            type: String,
            required: true,
            default : "wait",
        },
        answers: {
            type: Array,
            required: true,
            default : [],
        },
        selected_answer: {
            type: Array,
            required: true,
            default: [],
        },
        views: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    {
        collection: 'boards',
        versionKey: false,
    }
)

module.exports = mongoose.model('Board', boardSchema);