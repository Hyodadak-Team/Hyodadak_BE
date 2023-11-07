const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema(
    {
        order_model:{
            type: Array,
            required : true,
        },
        original_price : {
            type: String,
            required : true,
        },
        order_price : {
            type: String,
            requried : true,
        },
        used_coupon: {
            type: Object,
            default: null
        },
        order_userInfo : {
            type: Object,
            required: true,
        },
        order_proInfo : {
            type: Array,
            required: true,
        },
        order_status: {
            type: String,
            required: true,
            default: "request"
        }
    },
    {
        collection: 'tests',
        versionKey: false,
    }
);

module.exports = mongoose.model('Test', testSchema);