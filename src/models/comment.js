const mongoose = require('mongoose')
const db = require('../db')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  org: {
    type: String,
    ref: 'Org',
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Comment = db.model('Comment', commentSchema)
module.exports = Comment
