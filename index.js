const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const dbprof = require("./controllers/professors");
const dbrev = require("./controllers/reviews");

app.use(cors());
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
app.get("/professors/:id", dbprof.getProfessorById);
app.post("/professors", dbprof.createProfessor);
app.put("/professors/:id", dbprof.updateProfessor);
app.delete("/professors/:id", dbprof.deleteProfessor);

app.get("/reviews", dbrev.getReviews);
app.get("/reviews/:id", dbrev.getReviewById);
app.post("/reviews", dbrev.createReview);
app.put("/reviews/:id", dbrev.updateReview);
app.delete("/reviews/:id", dbrev.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
