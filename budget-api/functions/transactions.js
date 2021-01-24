const {db} = require('./admin')
const {unwrap, combine} = require('./utils')

exports.getTransactions = (req, res) =>
  db.collection('transactions').get()
    .then(raw => unwrap(raw))
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err))

exports.getTransaction = (req, res) => {
  db.doc(`/transactions/${req.params.id}`).get()
    .then(raw => !raw.exists ?
      res.status(404).json({error: 'Transaction not found'}) :
      res.status(200).json(combine(raw.data(), {id: raw.id}))
    )
    .catch(err => console.log(err))
}

exports.createTransaction = (req, res) => {
  const {type, amount, created = null, person = 'Bryant'} = req.body
  const transaction = {
    created: created ? created : new Date().toISOString(),
    type, person, amount,
  }

  db.collection('transactions').add(transaction)
    .then(doc => res.status(200).json(combine(transaction, {id: doc.id})))
    .catch(err => console.log(err))
}