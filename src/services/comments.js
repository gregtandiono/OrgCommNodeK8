const utils = require('./utils')
const Comment = require('../models/comment')

class Comments {
  async list (req, res) {
    try {
      await utils.validateOrg(req)
      const comments = await Comment.find({ org: req.params.orgName })
      res.status(200).json(comments)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async create (req, res) {
    try {
      await utils.validateOrg(req)
      await Comment.create(req.body)
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async remove (req, res) {
    try {
      await utils.validateOrg(req)
      await Comment.update(
        { org: req.params.orgName },
        { $set: { deleted: true } }
      )
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }
}

module.exports = Comments
