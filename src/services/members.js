const utils = require('./utils')
const Member = require('../models/member')

class Members {
  async list (req, res) {
    try {
      await utils.validateOrg(req)

      const members = await Member.find({ org: req.params.orgName })
      res.status(200).json(members)
    } catch (error) {
      res.status(400).send({ message: error.toString() })
    }
  }
}

module.exports = Members
