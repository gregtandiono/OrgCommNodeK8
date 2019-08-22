const mongoose = require('mongoose')
const db = require('../db')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: { type: String, required: true },
  orgName: { type: String, required: true }
}, { timestamps: true })

const Comment = db.model('Comment', commentSchema)
module.exports = Comment
