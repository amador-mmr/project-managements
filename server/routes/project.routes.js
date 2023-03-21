module.exports = (app) => {
  const projectController = require("../controllers/project.controller.js")

  app.get("/api/projects", projectController.findAll)
  app.get("/api/getAllwgt", projectController.findAllWgt)
  app.post("/api/create-project", projectController.create)
  app.put("/api/edit-project/:id", projectController.edit)
  app.delete("/api/delete-project/:id", projectController.delete)
}
