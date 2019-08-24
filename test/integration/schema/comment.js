const chai = require('chai')
const db = require('../../../src/db')
const fixtures = require('../../fixtures')
const Comment = require('../../../src/models/comment')

const expect = chai.expect

describe('Comment', () => {
  beforeEach('setup fixture', async () => {
    try {
      await Comment.create(fixtures.comments)
    } catch (err) {
      throw new Error(err)
    }
  })

  afterEach('teardown', async () => {
    try {
      await db.connection.dropCollection('comments')
    } catch (err) {
      throw new Error(err)
    }
  })

  it('should return all comments registered against an organization', async () => {
    try {
      const org = 'ecorp'
      const comments = await Comment.find({ org, deleted: false })
      expect(comments.length).to.equal(2)
      for (const comment of comments) {
        expect(comment.deleted).to.be.equal(false)
        expect(comment.org).to.be.equal(org)
      }
    } catch (err) {
      throw new Error(err)
    }
  })

  it('should able to record a comment to an organization', async () => {
    try {
      const record = {
        org: 'fsociety',
        comment: 'yeap, this is my awesome comment'
      }

      await Comment.create(record)
      const newlyAddedComment = await Comment.findOne(record)
      expect(newlyAddedComment.org).to.equal(record.org)
      expect(newlyAddedComment.comment).to.equal(record.comment)
    } catch (err) {
      throw new Error(err)
    }
  })
})
