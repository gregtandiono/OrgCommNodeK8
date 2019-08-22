const mongoose = require('mongoose')
const db = require('../db')
const Schema = mongoose.Schema

const memberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: 'https://api.adorable.io/avatars/285/abott@adorable.png'
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  orgId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

const Member = db.model('Member', memberSchema)
module.exports = Member
