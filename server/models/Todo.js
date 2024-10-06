const mongoose = require("mongoose");

//스키마 만들기
const Schema = mongoose.Schema;
const todoSchema = Schema({
    sdate : {type: String, required: true},
    name : {type: String, required: true},
    complete: {type: Boolean, required: true, default: false}
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;