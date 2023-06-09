const router = require('express').Router()
const { verify } = require('jsonwebtoken')
const controller = require('../controllers/TicketController')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAllTickets
)
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getTicketById
)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createTicket
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateTicket
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteTicket
)

module.exports = router
