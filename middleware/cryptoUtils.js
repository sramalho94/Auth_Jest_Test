require('dotenv').config({ path: '.env.local' })

const crypto = require('crypto')

const algorithm = process.env.ALGORITHM
const secretKey = process.env.SECRET_KEY
const iv = crypto.randomBytes(16)

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function decrypt(text) {
  let textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final()
  ])
  return decrypted.toString()
}

module.exports = {
  encrypt,
  decrypt
}
