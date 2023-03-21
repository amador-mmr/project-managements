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
  Project.create(req.body.project, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while create new data."
      })
    else {
      if (req.body.wgt.length > 0) {
        Project.createwgt(
          req.bodywgt,
          req.body.project.id_project,
          (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while create new data."
              })
            else {
              res.send(true)
            }
          }
        )
      } else res.send(true)
    }
  })
}

exports.edit = (req, res) => {
  Project.edit(req.params.id, req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while update data."
      })
    else {
      Project.deletewgt(req.params.id, (err, data) => {
        console.log("wgt:", req.body)
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while update data."
          })
        } else if (req.body.wgt.length > 0) {
          Project.createwgt(req.body.wgt, req.body.id_project, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while create new data."
              })
            else {
              res.send(true)
            }
          })
        } else {
          res.send(true)
        }
      })
    }
  })
}

exports.deletewgt = (idProject, res) => {
  Project.deletewgt(idProject, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while delete data."
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
