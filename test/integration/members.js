const chai = require('chai')
const app = require('../../index')
const expect = chai.expect

describe('Member integration', () => {
  describe('GET /orgs/:orgName/members', () => {
    it('should fetch all comments belonging to the requested organization', async () => {
      const orgName = 'fsociety'
      const response = await chai.request(app)
        .get(`/orgs/${orgName}/members`)

      expect(response.status).to.equal(200)
      for (const member of response.body) {
        expect(member.org).to.equal(orgName)
      }
    })

    it('should throw an error if the organization requested does not exist', async () => {
      const response = await chai.request(app)
        .get('/orgs/orgThatDoesNotExist/members')

      expect(response.status).to.equal(400)
      expect(response.body).to.deep.equal({ message: 'Error: org does not exist' })
    })
  })
})
