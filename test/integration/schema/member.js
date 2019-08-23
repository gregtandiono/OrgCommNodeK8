const chai = require('chai')
const Member = require('../../../src/models/member')

const expect = chai.expect

describe('Members', () => {
  it('should be able to return all members belonging to an organization', async () => {
    const org = 'fsociety'
    const members = await Member.find({ org })
    expect(members.length).to.equal(3)
    for (const member of members) {
      expect(member.org === org)
    }
  })

  it('return an empty array if organization does not exist or if organization has no members', async () => {
    const org = 'thisOrgDoesNotExist'
    const members = await Member.find({ org })
    expect(members.length).to.equal(0)
  })
})
