require('dotenv').config({ path: '.env.local' })

if (!process.env.APP_SECRET) {
  throw new Error('APP_SECRET environment variable is required')
}

process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { User } = require('../models')

describe('User controller test', () => {
  let testUser
  let testToken

  beforeAll(async () => {
    testUser = await User.create({
      username: 'testuser',
      passwordDigest: await hashPassword('testpassword'),
      fullName: 'testFullName'
    })

    // Create the test user token
    testToken = createToken({
      id: testUser.id,
      username: testUser.username,
      fullName: testUser.fullName
    })
  })

  test('get user by id', async () => {
    const response = await request(app)
      .get(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.user.username).toBe('testuser')
    expect(response.body.user.fullName).toBe('testFullName')
  })

  test('update user', async () => {
    const response = await request(app)
      .put(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        username: 'update username',
        fullName: 'update fullName'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.user.username).toBe('update username')
    expect(response.body.user.fullName).toBe('update fullName')
  })

  test('delete user', async () => {
    const response = await request(app)
      .delete(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.statusCode).toBe(204)
  })

  afterAll(async () => {
    try {
      await User.destroy({ truncate: { cascade: true } })
    } catch (error) {
      console.error('Error cleaning up test data', error)
    }
  })
})
