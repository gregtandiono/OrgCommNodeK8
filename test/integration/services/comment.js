const chai = require('chai')
const sinon = require('sinon')
const db = require('../../../src/db')
const fixtures = require('../../fixtures')
const Comment = require('../../../src/models/comment')
const Comments = require('../../../src/services/comments')

const comments = new Comments()
const expect = chai.expect
const assert = chai.assert

const mockRequest = (params, body) => ({
  params: { orgName: params && params.orgName ? params.orgName : '' },
  body
})

const mockResponse = () => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  res.send = sinon.stub().returns(res)

  return res
}

// custom sinon matcher
const orgNameMatcher = (orgName) => (comments) => {
  for (const comment of comments) {
    return comment.org === orgName
  }
}

xdescribe('Comment service', () => {
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

  it('should 200 with an array of comments in the response body', async () => {
    const req = mockRequest({ orgName: 'ecorp' })
    const res = mockResponse()

    await comments.list(req, res)

    assert.isTrue(res.status.calledWith(200))
    assert.isTrue(res.json.calledOnceWith(sinon.match.array))
    assert.isTrue(res.json.calledOnceWith(
      sinon.match(orgNameMatcher('ecorp'))
    ))
  })

  it('should 400 if no org name is found in the request params', async () => {
    const req = mockRequest()
    const res = mockResponse()

    await comments.list(req, res)

    assert.isTrue(res.status.calledWith(400))
    assert.isTrue(res.send.calledOnce)
    assert.isTrue(res.send.calledOnceWith(
      sinon.match({ message: 'Error: org name missing from param' })
    ))
  })
})
