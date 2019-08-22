const mongoose = require('mongoose')
const db = require('../db')
const Schema = mongoose.Schema

const orgSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
}, { timestamps: true })

const Org = db.model('Org', orgSchema)
module.exports = Org
