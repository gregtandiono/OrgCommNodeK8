const chaiHttp = require('chai-http')
const config = require('config')
const chai = require('chai')

const db = require('../src/db')
const Org = require('../src/models/org')
const Member = require('../src/models/member')
const fixtures = require('./fixtures')

chai.use(chaiHttp)

const dropDBs = async () => {
  const mongo = await db
  await mongo.connection.dropDatabase()
}

before(async () => {
  await dropDBs()
  await Org.create(fixtures.orgs)
  await Member.create(fixtures.members)
})

after(async () => {
  await dropDBs()
})
