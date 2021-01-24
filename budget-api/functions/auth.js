const firebase = require("firebase")
const config = require('./config')

firebase.initializeApp(config)

exports.Signup = (req, res) =>
  firebase.auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(({user}) => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))

exports.Login = (req, res) =>
  firebase.auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(({user}) => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))

exports.Logout = (req, res) =>
  firebase.auth().signOut()
    .then(() => res.status(200).json({message: 'Success'}))
    .catch(err => res.status(500).json({error: err}))