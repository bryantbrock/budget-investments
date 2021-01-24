const plaid = require('plaid')

// const client = new plaid.Client({
//   clientID: process.env.PLAID_CLIENT_ID,
//   secret: process.env.PLAID_SECRET,
//   env: plaid.environments.development,
// })

exports.createLinkToken = async (req, res) => {
  // const {userId: clientUserId} = req.body
  // try {
  //   // Create the link_token with all of your configurations
  //   const tokenResponse = await client.createLinkToken({
  //     user: {
  //       client_user_id: clientUserId,
  //     },
  //     client_name: 'budget-investments',
  //     products: ['transactions'],
  //     country_codes: ['US'],
  //     language: 'en',
  //   })

  //   res.status(200).json({link_token: tokenResponse.link_token})
  // } catch (e) {
  //   // Display error on client
  //   return res.status(400).json({error: e.message})
  // }
}