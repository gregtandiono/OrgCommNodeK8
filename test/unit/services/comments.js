const chai = require('chai')
const sinon = require('sinon')
const fixtures = require('../../fixtures')
const Comment = require('../../../src/models/comment')
const Org = require('../../../src/models/org')
const Comments = require('../../../src/services/comments')

const comments = new Comments()
const assert = chai.assert
const match = sinon.match

const mockRequest = (params, body) => ({
  params: { orgName: params && params.orgName ? params.orgName : '' },
  body
})

const mockResponse = () => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  res.send = sinon.stub().returns(res)
  res.sendStatus = sinon.stub().returns(res)

  return res
}

// custom sinon matcher
const orgNameMatcher = (orgName) => (comments) => {
  for (const comment of comments) {
    return comment.org === orgName
  }
}

describe('Comment service', () => {
  describe('Comments.list', () => {
    it('should respond a 200 with an array of comments in the response body if it fulfills all requirements', async () => {
      const orgName = 'ecorp'
      const req = mockRequest({ orgName })
      const res = mockResponse()
      const mockCommentResult = fixtures.comments.filter(comment => comment.org === orgName)

      const commentModelStub = sinon.stub(Comment, 'find')
      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns({ name: orgName })
      commentModelStub.withArgs({ org: orgName }).returns(mockCommentResult)

      await comments.list(req, res)
      orgModelStub.restore()
      commentModelStub.restore()

      assert.isTrue(res.status.calledWith(200))
      assert.isTrue(res.json.calledOnceWith(match.array))
      assert.isTrue(res.json.calledOnceWith(
        match(orgNameMatcher('ecorp'))
      ))
    })

    it('should throw a 400 if no org name is found in the request params', async () => {
      const req = mockRequest()
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.yields()

      await comments.list(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org name missing from param' })
      ))
    })

    it('should throw a 400 status if the org does not exist', async () => {
      const orgName = 'orgThatDoesNotExist'
      const req = mockRequest({ orgName })
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns(null)

      await comments.list(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org does not exist' })
      ))
    })
  })

  describe('Comments.create', () => {
    it('should respond a 200 after successfully added a comment', async () => {
      const orgName = 'ecorp'
      const commentFixtures = fixtures.comments.filter(comment => comment.org === orgName)

      const req = mockRequest({ orgName }, commentFixtures[0])
      const res = mockResponse()

      const commentModelStub = sinon.stub(Comment, 'create')
      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns({ name: orgName })
      commentModelStub.withArgs(commentFixtures[0]).returns()

      await comments.create(req, res)
      orgModelStub.restore()
      commentModelStub.restore()

      assert.isTrue(res.sendStatus.calledWith(200))
    })

    it('should throw a 400 status if no org name is found in the request param', async () => {
      const req = mockRequest()
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')
      orgModelStub.yields()

      await comments.create(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org name missing from param' })
      ))
    })

    it('should throw a 400 status if the org does not exist', async () => {
      const orgName = 'orgThatDoesNotExist'
      const req = mockRequest({ orgName })
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns(null)

      await comments.create(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org does not exist' })
      ))
    })
  })

  describe('Comments.remove', () => {
    it('should respond a 200 after successfully removing all comments to an organization', async () => {
      const orgName = 'ecorp'
      const commentFixtures = fixtures.comments.filter(comment => comment.org === orgName)

      const req = mockRequest({ orgName }, commentFixtures[0])
      const res = mockResponse()

      const commentModelStub = sinon.stub(Comment, 'update')
      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns({ name: orgName })
      commentModelStub.withArgs({ name: orgName }).returns()

      await comments.create(req, res)
      orgModelStub.restore()
      commentModelStub.restore()

      assert.isTrue(res.sendStatus.calledWith(200))
    })

    it('should throw a 400 status if no org name is found in the request param', async () => {
      const req = mockRequest()
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')
      orgModelStub.yields()

      await comments.remove(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org name missing from param' })
      ))
    })

    it('should throw a 400 status if the org does not exist', async () => {
      const orgName = 'orgThatDoesNotExist'
      const req = mockRequest({ orgName })
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns(null)

      await comments.remove(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org does not exist' })
      ))
    })
  })
})
