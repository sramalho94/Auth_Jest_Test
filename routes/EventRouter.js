const router = require('express').Router()
const controller = require('../controllers/EventController')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAllEvents
)
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getEventById
)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createEvent
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateEvent
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteEvent
)

module.exports = router
