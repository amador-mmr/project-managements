const model = require("../core/connection")

const Project = function (project) {
  this.id_project = project.id_project
  this.name = project.name
  this.code_3 = project.code_3
  this.acquisition_date = project.acquisition_date
  this.deal_type = project.deal_type
  this.id_group = project.id_group
  this.status = project.status
  this.kw = project.kw
  this.months_acquired = project.months_acquired
  this.id_company = project.id_company
  this.wgt = project.wgt
}

Project.findAll = (result) => {
  var query = `SELECT p.ID_PROJECT, p.NAME, p.CODE_3, 
  p.ACQUISITION_DATE, p.DEAL_TYPE, p.ID_GROUP, p.STATUS, 
  p.KW, p.MONTHS_ACQUIRED, p.ID_COMPANY
  FROM project p ORDER BY p.NAME`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, res)
    return
  })
}

Project.findAllWgt = (result) => {
  var query = `SELECT WGT_NUMBER, ID_PROJECT FROM test_project.wgt`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, res)
    return
  })
}

Project.findAllWgtByIdProject = (id, result) => {
  var query = `SELECT WGT_NUMBER FROM wgt WHERE ID_PROJECT='${id}'`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, res)
    return
  })
}

Project.create = (project, result) => {
  const date = new Date(project.acquisition_date)
  var query = `INSERT INTO test_project.project
  (ID_PROJECT, NAME, CODE_3, ACQUISITION_DATE, DEAL_TYPE, ID_GROUP, STATUS, KW, MONTHS_ACQUIRED, ID_COMPANY)
  VALUES('${project.id_project}', '${project.name}', '${project.code_3}',
  '${date.toISOString().slice(0, 19).replace("T", " ")}', 
  '${project.deal_type}', '${project.id_group}', '${project.status}', ${
    project.kw
  }, ${project.months_acquired}, ${project.id_company}); `
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

Project.createwgt = (wgt, id, result) => {
  let items = []
  var query = ` INSERT INTO test_project.wgt (WGT_NUMBER, ID_PROJECT) VALUES ? `
  wgt.forEach((el, i) => {
    items.push([el, id])
  })
  console.log("query:", query)
  model.query(query, [items], (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, true)
    return
  })
}

Project.edit = (id, project, result) => {
  const date = new Date(project.acquisition_date)
  var query = `UPDATE test_project.project
  SET NAME='${project.name}', CODE_3='${
    project.code_3
  }', ACQUISITION_DATE='${date.toISOString().slice(0, 19).replace("T", " ")}', 
  DEAL_TYPE='${project.deal_type}', ID_GROUP='${project.deal_type}', STATUS='${
    project.status
  }', 
  KW=${project.kw}, MONTHS_ACQUIRED=${project.months_acquired} 
  WHERE ID_PROJECT='${id}'`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    var exist = Object.keys(res).length === 1
    result(null, exist)
    return
  })
}

Project.deletewgt = (id, result) => {
  var query = `DELETE FROM test_project.wgt WHERE ID_PROJECT='${id}';`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, res)
    return
  })
}

Project.delete = (id, result) => {
  var query = `DELETE FROM test_project.project
  WHERE ID_PROJECT='${id}'`
  console.log("query:", query)
  model.query(query, (err, res) => {
    if (err) {
      console.error(err)
      result(err, null)
      return
    }
    result(null, res)
    return
  })
}

module.exports = Project
