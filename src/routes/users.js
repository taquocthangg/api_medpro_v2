const router = require('express').Router()
const users = require('../controllers/usersController')

router.get('/' ,users.getUsers)

module.exports = router