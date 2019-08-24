
const chai = require('chai')
const sinon = require('sinon')
const fixtures = require('../../fixtures')
const Member = require('../../../src/models/member')
const Org = require('../../../src/models/org')
const Members = require('../../../src/services/members')

const members = new Members()
const assert = chai.assert
const match = sinon.match
const stub = sinon.stub

const mockRequest = (params, body) => ({
  params: { orgName: params && params.orgName ? params.orgName : '' },
  body
})

const mockResponse = () => {
  const res = {}
  res.status = stub().returns(res)
  res.json = stub().returns(res)
  res.send = stub().returns(res)

  return res
}

const orgNameMatcher = (orgName) => (members) => {
  for (const member of members) {
    return member.org === orgName
  }
}

const fields = ['email', 'avatar', 'followers', 'following', 'org']

const memberFieldsChecker = (fields = []) => (members) => {
  for (const member of members) {
    for (const key of Object.keys(member)) {
      return fields.includes(key)
    }
  }
}

describe('Member service', () => {
  describe('Members.list', () => {
    it('should respond a 200 along with an array of member belonging to the requested organization in the response body', async () => {
      const orgName = 'fsociety'
      const req = mockRequest({ orgName })
      const res = mockResponse()
      const mockMemberResult = fixtures.members.filter(member => member.org === orgName)
      // mock mongodb desc sort
      mockMemberResult.sort((a, b) => (a.followers > b.followers ? -1 : 1))

      const memberModelStub = stub(Member, 'find')
      const orgModelStub = stub(Org, 'findOne')

      memberModelStub.withArgs({ org: orgName }).returns(mockMemberResult)
      orgModelStub.withArgs({ name: orgName }).returns({ name: orgName })

      await members.list(req, res)
      memberModelStub.restore()
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(200))
      assert.isTrue(res.json.calledOnceWith(match.array))
      assert.isTrue(res.json.calledOnceWith(
        match(orgNameMatcher(orgName))
      ))
      assert.isTrue(res.json.calledOnceWith(
        match(memberFieldsChecker(fields))
      ))
    })

    it('should throw a 400 if no org name is found in the request param', async () => {
      const req = mockRequest()
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')
      orgModelStub.yields()

      await members.list(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org name missing from param' })
      ))
    })

    it('should throw a 400 if no org name is found in the request param', async () => {
      const orgName = 'orgThatDoesNotExist'
      const req = mockRequest({ orgName })
      const res = mockResponse()

      const orgModelStub = sinon.stub(Org, 'findOne')

      orgModelStub.withArgs({ name: orgName }).returns(null)

      await members.list(req, res)
      orgModelStub.restore()

      assert.isTrue(res.status.calledWith(400))
      assert.isTrue(res.send.calledOnceWith(
        match({ message: 'Error: org does not exist' })
      ))
    })
  })
})
