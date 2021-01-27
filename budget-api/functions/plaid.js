const { HttpsError } = require('firebase-functions/lib/providers/https')
const plaid = require('plaid')
const {db} = require('./admin')
const {unwrap, combine} = require('./utils')

const client = new plaid.Client({
  clientID: '5e6ee25f8bf3880012c90ad0',
  secret: '5a8242dfb0db50336ad67fab42f2a6',
  env: plaid.environments.sandbox,
})

exports.getAccessToken = async req => {
  const {uid, institution: inst} = req.body

  let accessToken
  try {
    const raw = await db.doc(`/users/${req.params.uid}`).get()

    if (!raw.exists) {
      throw HttpsError
    }

    const {bankTokens} = raw.data()
    const [token] = bankTokens.filter(({institution}) => institution === inst)

    accessToken = token.accessToken

    if (!accessToken) {
      throw HttpsError
    }
  } catch (err) {
    return res.status(500).json({error: err})
  }

  return accessToken
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

exports.getAccounts = async (req, res) => {
  const accessToken = await getAccessToken(req)

  client.getAccounts(accessToken)
}