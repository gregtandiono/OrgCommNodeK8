const mongoose = require('mongoose')
const db = require('../db')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  orgId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

const Comment = db.model('Comment', commentSchema)
module.exports = Comment
