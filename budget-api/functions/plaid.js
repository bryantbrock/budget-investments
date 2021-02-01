const { HttpsError } = require('firebase-functions/lib/providers/https')
const plaid = require('plaid')
const {db} = require('./admin')
const {sum, cleanAmount, combine} = require('./utils')

const client = new plaid.Client({
  clientID: '5e6ee25f8bf3880012c90ad0',
  secret: '5a8242dfb0db50336ad67fab42f2a6',
  env: plaid.environments.sandbox,
})

getAccessTokens = async req => {
  const {uid, institution: inst = null} = req.body

  let tokens
  try {
    const raw = await db.doc(`/users/${req.params.uid}`).get()

    if (!raw.exists) {
      throw HttpsError
    }

    const {bankTokens} = raw.data()

    if (inst) {
      const token = bankTokens.filter(({institution}) => institution === inst)

      tokens = token
    }

    tokens = bankTokens

  } catch (err) {
    return res.status(500).json({error: err})
  }

  return tokens
}

exports.createLinkToken = async (req, res) => {
  try {
    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id: req.params.uid,
      },
      client_name: 'Plaid Quickstart',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    })

    res.status(200).json({linkToken: tokenResponse.link_token})
  } catch (e) {
    return res.status(400).json({error: e.message})
  }
}

exports.exchangeToken = async (req, res) => {
  const {publicToken} = req.params

  client.exchangePublicToken(publicToken)
    .then(result => res.status(200).json({
      itemId: result.item_id,
      accessToken: result.access_token,
    }))
    .catch(err => res.status(500).json({error: err}))
}

exports.getTransactions = async (req, res) => {
  const accessTokens = await getAccessTokens(req)
  const now = new Date()
  const endOfMonth = [
    now.getFullYear(),
    '01',
    '25',
  ].join('-')
  const startOfMonth = [
    now.getFullYear() - 1, // Have to do this due to the year change
    '12',
    '25',
  ].join('-')

  Promise.all(accessTokens.map(async ({accessToken, institution}) => {
    const data =  await client
      .getTransactions(accessToken, startOfMonth, endOfMonth)
      .then(result => result.transactions)

    const cleanData = data.map(transaction =>
      combine(
        transaction, institution,
        {amount: transaction.amount}
        // {amount: cleanAmount(transaction.amount)}
      )
    )

    const amounts = cleanData.map(({amount}) => amount)
    const overUnder = sum(amounts)
    const expenses = sum(amounts.filter(val => val > 0))
    const income = sum(amounts.filter(val => val < 0))

    return {
      institution,
      transactions: cleanData,
      summary: {overUnder, expenses, income}
    }
  })).then(result => res.status(200).json(result))
}