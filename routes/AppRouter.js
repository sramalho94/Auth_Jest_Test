const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const AuthRouter = require('./AuthRouter')
const EventRouter = require('./EventRouter')
const TicketRouter = require('./TicketRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)
Router.use('/event', EventRouter)
Router.use('/ticket', TicketRouter)

module.exports = Router
