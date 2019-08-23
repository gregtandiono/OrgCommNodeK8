const utils = require('./utils')
const Comment = require('../models/comment')

class Comments {
  async list (req, res) {
    try {
      await utils.validateOrg(req)
      const comments = await Comment.find({ org: req.params.orgName, deleted: false })
      res.status(200).json(comments)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async create (req, res) {
    try {
      await utils.validateOrg(req)
      await Comment.create({
        content: req.body.content,
        org: req.params.orgName
      })
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async remove (req, res) {
    try {
      await utils.validateOrg(req)
      await Comment.updateMany(
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
