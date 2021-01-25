const plaid = require('plaid')

const client = new plaid.Client({
  clientID: '5e6ee25f8bf3880012c90ad0',
  secret: '5a8242dfb0db50336ad67fab42f2a6',
  env: plaid.environments.sandbox,
})

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