const firebase = require("firebase")
const config = require('./config')
const {db} = require('./admin')
const {unwrap, combine} = require('./utils')

firebase.initializeApp(config)

exports.signup = (req, res) =>
  firebase.auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(({user}) => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))

exports.login = (req, res) =>
  firebase.auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(({user}) => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))

exports.logout = (req, res) =>
  firebase.auth().signOut()
    .then(() => res.status(200).json({message: 'Success'}))
    .catch(err => res.status(500).json({error: err}))


// ========= User ============

exports.createUser = (req, res) => {
  const {email, uid} = req.body
  const user = {email, uid, bankToken: null}

  db.collection('users').doc(uid).set(user)
    .then(doc => res.status(200).json(combine(user, {id: doc.id})))
    .catch(err => res.status(500).json({error: err}))
}

exports.addBankToken = (req, res) =>
  db.collection('users').doc(req.params.uid)
    .update({bankToken: req.body.token})
    .then(() => res.status(200).json({message: 'Bank token saved.'}))
    .catch(err => res.status(500).json({error: err}))

exports.getUser = (req, res) =>
  db.doc(`/users/${req.params.uid}`).get()
    .then(raw => !raw.exists ?
      res.status(404).json({error: 'User not found'}) :
      res.status(200).json(combine(raw.data(), {id: raw.id}))
    )
    .catch(err => res.status(500).json({error: err}))