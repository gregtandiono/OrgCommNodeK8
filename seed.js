// Run `node seed.js`
// to teardown current collection
// and setup default set of collections and documents.
// This script uses test fixtures for the default data set.

require('colors')
const db = require('./src/db')
const Org = require('./src/models/org')
const Member = require('./src/models/member')
const Comment = require('./src/models/comment')
const fixtures = require('./test/fixtures')

const seed = async () => {
  try {
    console.log('running seed script...'.green)
    const mongo = await db

    console.log('dropping current db'.blue)
    await mongo.connection.dropDatabase()

    console.log('inserting org documents...'.blue)
    await Org.create(fixtures.orgs)

    console.log('inserting member documents...'.blue)
    await Member.create(fixtures.members)

    console.log('inserting comment documents...'.blue)
    await Comment.create(fixtures.comments)

    console.log('finished running seed script...'.green)
    process.exit()
  } catch (error) {
    throw new Error(error)
  }
}

seed()
