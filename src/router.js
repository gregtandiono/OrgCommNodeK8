const express = require('express')

const Comments = require('./services/comments')
const Members = require('./services/members')
const router = express.Router()

const comments = new Comments()
const members = new Members()

router.get('/', (req, res) => res.send('Welcome to OrgCommNodeK8 Project'))
router.post('/orgs/:orgName/comments', comments.create)
router.get('/orgs/:orgName/comments', comments.list)
router.delete('/orgs/:orgName/comments', comments.remove)
router.get('/orgs/:orgName/members', members.list)

module.exports = router
