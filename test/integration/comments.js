const chai = require('chai')
const app = require('../../index')
const db = require('../../src/db')
const fixtures = require('../fixtures')
const Comment = require('../../src/models/comment')

const expect = chai.expect

describe('Comment integration', () => {
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
  describe('POST /orgs/:orgName/comments', () => {
    it('should add a comment to an existing organization', async () => {
      const orgName = 'fsociety'
      const content = 'I can totally bring ecorp down, Elliot.'

      const response = await chai.request(app)
        .post(`/orgs/${orgName}/comments`)
        .send({ content })
      expect(response.status).to.equal(200)

      // verify addition
      const commentsResponse = await chai.request(app)
        .get(`/orgs/${orgName}/comments`)

      const expectedResults = commentsResponse.body.filter(comment => comment.content === content)
      expect(expectedResults[0].content).to.equal(content)
    })

    it('should throw an error if the organization requested does not exist', async () => {
      const response = await chai.request(app)
        .post('/orgs/orgThatDoesNotExist/comments')
        .send()

      expect(response.status).to.equal(400)
      expect(response.body).to.deep.equal({ message: 'Error: org does not exist' })
    })
  })

  describe('GET /orgs/:orgName/comments', () => {
    it('should fetch all comments belonging to the requested organization', async () => {
      const orgName = 'fsociety'
      const response = await chai.request(app)
        .get(`/orgs/${orgName}/comments`)

      expect(response.status).to.equal(200)
      for (const comment of response.body) {
        expect(comment.org).to.equal(orgName)
      }
    })

    it('should throw an error if the organization requested does not exist', async () => {
      const response = await chai.request(app)
        .get('/orgs/orgThatDoesNotExist/comments')

      expect(response.status).to.equal(400)
      expect(response.body).to.deep.equal({ message: 'Error: org does not exist' })
    })
  })

  describe('DELETE /orgs/:orgName/comments', () => {
    it('should remove (soft delete) all comments belonging to the requested organization', async () => {
      const orgName = 'fsociety'
      const response = await chai.request(app)
        .delete(`/orgs/${orgName}/comments`)

      expect(response.status).to.equal(200)

      // verify deletion
      const commentsResponse = await chai.request(app)
        .get(`/orgs/${orgName}/comments`)

      expect(commentsResponse.status).to.equal(200)
      expect(commentsResponse.body.length).to.equal(0)
    })

    it('should throw an error if the organization requested does not exist', async () => {
      const response = await chai.request(app)
        .delete('/orgs/orgThatDoesNotExist/comments')

      expect(response.status).to.equal(400)
      expect(response.body).to.deep.equal({ message: 'Error: org does not exist' })
    })
  })
})
