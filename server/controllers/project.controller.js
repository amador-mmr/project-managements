require("dotenv").config()
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const Project = require("../models/project.model.js")

const table = "project"
const API_KEY = process.env.API_KEY_JWT

exports.findAll = (req, res) => {
  Project.findAll((err, data) => {
    if (err)
      result.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving from " + this.table + "."
      })
    else {
      res.send(data)
    }
  })
}

exports.findAllWgt = (req, res) => {
  Project.findAllWgt((err, data) => {
    if (err)
      result.status(500).send({
        message: err.message || "Some error occurred while retrieving from wgt."
      })
    else {
      res.send(data)
    }
  })
}

exports.create = (req, res) => {
  Project.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while create new data."
      })
    else res.send(data)
  })
}

exports.edit = (req, res) => {
  Project.edit(req.params.id, req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while update data."
      })
    else res.send(data)
  })
}

exports.delete = (req, res) => {
  Project.delete(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while delete data."
      })
    else res.send(data)
  })
}
