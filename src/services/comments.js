const Comment = require('../models/comment')
const Org = require('../models/org')

class Comments {
  async list (req, res) {
    try {
      await this.validateOrg(req, res)

      const comments = await Comment.find({ org: req.params.orgName })
      res.status(200).json(comments)
    } catch (err) {
      res.status(400).send({ message: JSON.stringify(err) })
    }
  }

  async create (req, res) {
    try {
      await this.validateOrg(req, res)
      await Comment.create(req.body)
      res.sendStatus(200)
    } catch (err) {
      res.status(400).send({ message: JSON.stringify(err) })
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
    } catch (err) {
      res.status(400).send({ message: JSON.stringify(err) })
    }
  }

  async validateOrg (req, res) {
    const { orgName } = req.params
    if (!orgName) return res.status(400).send({ message: 'org name missing from your request' })

    const org = await Org.findOne({ name: orgName })
    if (!org) return res.status(400).send({ message: 'org does not exist' })
  }
}

module.exports = Comments
