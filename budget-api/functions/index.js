const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')

app.use(cors())

const {
  getTransactions, getTransaction, createTransaction,
} = require('./transactions')
const {createLinkToken} = require('./plaid')
const {Signup, Login, Logout} = require('./auth')

// Routes
app.post('/create_link_token', createLinkToken)
app.get('/transactions', getTransactions)
app.get('/transaction', getTransaction)
app.post('/transaction', createTransaction)
app.post('/signup', Signup)
app.post('/login', Login)
app.post('/logout', Logout)

exports.api = functions.https.onRequest(app)