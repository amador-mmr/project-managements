module.exports = (app) => {
  const userController = require("../controllers/user.controller.js")

  app.post("/api/userByLogin", userController.login)
  app.post("/api/createUser", userController.create)
}
