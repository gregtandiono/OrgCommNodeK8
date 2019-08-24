const utils = require('./utils')
const Comment = require('../models/comment')
const logger = require('../logger')

class Comments {
  async list (req, res) {
    try {
      await utils.validateOrg(req)
      const comments = await Comment.find({ org: req.params.orgName, deleted: false })
      res.status(200).json(comments)
    } catch (error) {
      const errStr = utils.errorStringifier(error)
      logger.error(`Comments.list ${errStr}`)
      res.status(400).send({ message: errStr })
    }
  }

  async create (req, res) {
    try {
      await utils.validateOrg(req)
      if (!req.body.comment) throw new Error('comment is required in the request body')

      await Comment.create({
        comment: req.body.comment,
        org: req.params.orgName
      })
      res.sendStatus(200)
    } catch (error) {
      const errStr = utils.errorStringifier(error)
      logger.error(`Comments.create ${errStr}`)
      res.status(400).send({ message: errStr })
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
      const errStr = utils.errorStringifier(error)
      logger.error(`Comments.remove ${errStr}`)
      res.status(400).send({ message: errStr })
    }
  }
}

module.exports = Comments
