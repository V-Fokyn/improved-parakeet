const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userService = require('../services/user')

router.get('/balances/', verifyJWT, getUserBalances)
router.post('/login', authenticate)

function getUserBalances(req, res, next) {

  userService.getUserBalances(req.user.id)
    .then(balances => res.json(balances[0]))
    .catch(err => console.error)

}

function authenticate(req, res, next) {

  userService.authenticate(req.body.username, req.body.password)
    .then(user => {
      const token = jwt.sign({id: user[0].id, username: user[0].username}, process.env.JWT_SECRET)
      res.json({token, id: user[0].id, username: user[0].username})
    })
    .catch(err => console.error)
}

function verifyJWT(req, res, next) {
  if(req.headers.authorization) {

    console.log(req.headers.authorization)

    const token = req.headers.authorization.split(' ')[1]

    console.log(token)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) 
        return res.status(403).end()

      req.user = user
      next()
    })

  }
  else
    res.status(401).end()
}

module.exports = router