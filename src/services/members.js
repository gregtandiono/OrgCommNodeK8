const utils = require('./utils')
const logger = require('../logger')
const Member = require('../models/member')

class Members {
  async list (req, res) {
    try {
      await utils.validateOrg(req)
      const members = await Member.find({ org: req.params.orgName }).sort({ followers: -1 })
      res.status(200).json(members)
    } catch (error) {
      const errStr = utils.errorStringifier(error)
      logger.error(`Members.list ${errStr}`)
      res.status(400).send({ message: errStr })
    }
  }
}

module.exports = Members
