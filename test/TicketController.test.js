process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { User, Event, Ticket } = require('../models')

let testToken

describe('Ticket controller tests', () => {
  let testUser
  let testUserId
  let testUserId2
  let testEvent
  let testTicket

  beforeAll(async () => {
    // create testUser
    const testUser = await User.create({
      username: 'testuser',
      passwordDigest: await hashPassword('testpassword')
    })
    testUserId = testUser.id
    // create second user
    const testUser2 = await User.create({
      username: 'testUser2',
      passwordDigest: await hashPassword('testpassword2')
    })

    testUserId2 = testUser2.id
    // create testToken using testUser
    testToken = createToken({
      id: testUser.id,
      username: testUser.username,
      passwordDigest: testUser.passwordDigest
    })
    // create test event
    testEvent = await Event.create({
      title: 'testEvent',
      cost: 100
    })
    // create test ticket
    testTicket = await Ticket.create({
      userId: testUser.id,
      eventId: testEvent.id
    })
  })

  test('Create Ticket', async () => {
    const response = await request(app)
      .post('/api/ticket')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        userId: testUserId,
        eventId: testEvent.id
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.ticket.userId).toBe(testUserId)
    expect(response.body.ticket.eventId).toBe(testEvent.id)
  })

  test('Get all tickets', async () => {
    const response = await request(app)
      .get('/api/ticket/')
      .set(`Authorization`, `Bearer ${testToken}`)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body.tickets)).toBeTruthy()
    expect(response.body.tickets.length).toBeGreaterThan(0)
  })

  test('Get ticket by id', async () => {
    const response = await request(app)
      .get(`/api/ticket/${testTicket.id}`)
      .set(`Authorization`, `Bearer ${testToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.ticket.userId).toBe(testTicket.userId)
    expect(response.body.ticket.eventId).toBe(testTicket.eventId)
  })

  test('Update ticketuserId', async () => {
    const response = await request(app)
      .put(`/api/ticket/${testTicket.id}`)
      .set(`Authorization`, `Bearer ${testToken}`)
      .send({
        userId: testUserId2
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.ticket.userId).toBe(testUserId2)
  })

  test('Delete ticket', async () => {
    const response = await request(app)
      .delete(`/api/ticket/${testTicket.id}`)
      .set(`Authorization`, `Bearer ${testToken}`)

    expect(response.statusCode).toBe(204)
  })

  afterAll(async () => {
    try {
      await User.destroy({ truncate: { cascade: true } })
      await Event.destroy({ truncate: { cascade: true } })
      await Ticket.destroy({ truncate: { cascade: true } })
    } catch (error) {
      console.log('Error cleanign up test data: ', error)
    }
  })
})
