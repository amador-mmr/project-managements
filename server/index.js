const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("trust proxy", true)

require("./routes/user.routes")(app)
require("./routes/project.routes")(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
  if (err) console.error("❌ Unable to connect the server: ", err)
  console.log("Server running on port", PORT)
})
