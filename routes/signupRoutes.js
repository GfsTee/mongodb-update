const express = require('express')
const signupRoutes = express.Router()

const signupController = require('../controllers/signupController')

signupRoutes.get('/', signupController.signup_get)

signupRoutes.post('/', signupController.signup_post)

module.exports = signupRoutes