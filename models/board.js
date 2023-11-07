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
            type: String,
            required: false,
        },
        writer_id: {
            type: String,
            required: true,
        },
        create_time: {
            type: Date,
            required: true,
        },
        status : {
            type: String,
            required: true,
        },
        answer: {
            type: Array,
            required: false,
        },
        selected_answer: {
            type: Object,
            required: false,
        },
        views: {
            type: Number,
            required: false,
        }
    },
    {
        collection: 'boards',
        versionKey: false,
    }
)

module.exports = mongoose.model('Board', boardSchema);