const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')

app.use(cors())

const {createLinkToken} = require('./plaid')
const {
  signup, login, logout, getUser, addBankToken,
  createUser,
} = require('./auth')

// Routes
app.post('/create-link-token/:uid', createLinkToken)
app.post('/add-bank-token/:uid', addBankToken)
app.post('/signup', signup)
app.post('/login', login)
app.post('/logout', logout)
app.post('/user', createUser)
app.get('/user/:uid', getUser)

exports.api = functions.https.onRequest(app)