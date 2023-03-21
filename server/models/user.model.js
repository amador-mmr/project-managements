const model = require("../core/connection")

const User = function (user) {
  this.username = user.username
  this.password = user.password
}

User.login = (username, result) => {
  var query = `SELECT username, password FROM test_project.user WHERE username='${username}'`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, res.length === 1 ? res[0] : null)
    return
  })
}

User.create = (user, result) => {
  var query = `INSERT INTO test_project.user (username, password) VALUE ('${user.username}','${user.password}')`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, true)
    return
  })
}

module.exports = User
