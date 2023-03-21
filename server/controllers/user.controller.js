require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model.js")

const API_KEY = process.env.API_KEY_JWT

exports.login = async (req, res) => {
  User.login(req.body.username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving from user."
      })
    else {
      const { pwd } = req.body
      let tokenUser = null
      if (bcrypt.compareSync(req.body.password, data.password)) {
        tokenUser = jwt.sign({ data }, API_KEY)
        console.log("Token user:", tokenUser)
        res.send(tokenUser)
        return
      }
      res.send(false)
      return
    }
  })
}

exports.create = async (req, res) => {
  let user = req.body
  user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync())
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error ocurred while insert new  " + table + "."
      })
    else res.send(data)
  })
}
