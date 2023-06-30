// comment for commit

require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const AppRouter = require('./routes/AppRouter')

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/api', AppRouter)

module.exports = app
