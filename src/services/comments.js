const Comment = require('../models/comment')
const Org = require('../models/org')

class Comments {
  async list (req, res) {
    try {
      await this.validateOrg(req, res)

      const comments = await Comment.find({ org: req.params.orgName })
      res.status(200).json(comments)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async create (req, res) {
    try {
      await this.validateOrg(req, res)
      await Comment.create(req.body)
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async remove (req, res) {
    try {
      await this.validateOrg(req, res)
      await Comment.update(
        { org: req.params.orgName },
        { $set: { deleted: true } }
      )
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }

  async validateOrg (req, res) {
    const { orgName } = req.params
    if (!orgName) throw new Error('org name missing from param')

    const org = await Org.findOne({ name: orgName })
    if (!org) throw new Error('org does not exist')
  }
}

module.exports = Comments
