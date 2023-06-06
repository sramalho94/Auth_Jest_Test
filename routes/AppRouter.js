const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const AuthRouter = require('./AuthRouter')
const EventRouter = require('./EventRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)
Router.use('/event', EventRouter)

module.exports = Router
