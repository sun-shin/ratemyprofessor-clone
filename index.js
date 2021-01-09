const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dbprof = require("./controllers/professors");
const dbrev = require("./controllers/reviews");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/professors", dbprof.getProfessors);
// app.get("/professors/:id", dbprof.getProfessorById);
app.post("/professors", dbprof.createProfessor);
// app.put("/professors/:id", dbprof.updateProfessor);
// app.delete("/professors/:id", dbprof.deleteProfessor);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
