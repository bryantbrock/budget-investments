const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')

app.use(cors())

const {
  createLinkToken,
  exchangeToken,
  getTransactions,
} = require('./plaid')
const {
  signup,
  login,
  logout,
  getUser,
  addBankToken,
  createUser,
  resetPassword,
} = require('./auth')

// Routes
app.post('/create-link-token/:uid', createLinkToken)
app.post('/exchange-token/:publicToken', exchangeToken)
app.post('/add-bank-token/:uid', addBankToken)
app.get('/transactions/:uid', getTransactions)
app.post('/reset-password/:email', resetPassword)
app.post('/signup', signup)
app.post('/login', login)
app.post('/logout', logout)
app.post('/user', createUser)
app.get('/user/:uid', getUser)

exports.api = functions.https.onRequest(app)