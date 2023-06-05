process.env.NODE_ENV = 'test'
require('dotenv').config({ path: '.env.local' })

if (!process.env.APP_SECRET) {
  throw new Error('APP_SECRET environment variable is required')
}

const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { User } = require('../models')

describe('Auth controller test', () => {
  let testUser
  let testToken

  beforeAll(async () => {
    const hashedPassword = await hashPassword('testpassword')
    testUser = await User.create({
      username: 'testuser',
      passwordDigest: hashedPassword,
      fullName: 'testuser'
    })
    testToken = createToken({
      id: testUser.id,
      username: testUser.username,
      passwordDigest: testUser.passwordDigest
    })
  })

  test('Login user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      fullName: 'testuser',
      password: 'testpassword'
    })

    testToken = response.body.token

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('token')
    expect(response.body.user.username).toBe('testuser')
    expect(response.body.user.fullName).toBe('testuser')
  })

  test('Check session', async () => {
    const response = await request(app)
      .get('/api/auth/session')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('payload')
    expect(response.body.payload.username).toBe('testuser')
  })

  test('Update password', async () => {
    const response = await request(app)
      .put('/api/auth/update-password')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        username: 'testuser',
        oldPassword: 'testpassword',
        newPassword: 'testnewpassword'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.msg).toBe('Password updated')
  })

  test('Update password fail', async () => {
    const response = await request(app).put('/api/auth/update-password').send({
      username: 'testuser',
      oldPassword: 'wrongpassword',
      newPassword: 'testnewpassword'
    })

    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Error')
    expect(response.body.msg).toBe('Unauthorized')
  })

  afterAll(async () => {
    try {
      await User.destroy({ where: { username: 'testuser' } })
    } catch (error) {
      console.error('Error cleaning up test data', error)
    }
  })
})
