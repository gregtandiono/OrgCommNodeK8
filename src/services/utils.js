const Org = require('../models/org')

const validateOrg = async (req) => {
  const { orgName } = req.params
  if (!orgName) throw new Error('org name missing from param')

  const org = await Org.findOne({ name: orgName })
  if (!org) throw new Error('org does not exist')
}

const errorStringifier = (error) => {
  return typeof (error) !== 'string' ? error.toString() : error
}

module.exports = { validateOrg, errorStringifier }
