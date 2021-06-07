const express = require("express");
var cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const dbprof = require("./controllers/professors");
const dbrev = require("./controllers/reviews");
const dbuauth = require("./controllers/users")

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

function authenticateUser(req, res, next) {
  const token = req.headers["authorization"];
  if(!token) {
    res.status(401).json("Unauthorized")
    return
  }
  console.log(token);
  const decoded = jwt.verify(token, 'key');
  req.decoded = decoded
  next() 
}

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API"});
});

app.get("/users", dbuauth.getUsers);
app.post("/users", dbuauth.createUser);
app.post("/sessions", dbuauth.createSession);

app.get("/professors", dbprof.getProfessors);
app.get("/professors/:id", dbprof.getProfessorById);
app.post("/professors", dbprof.createProfessor);
app.put("/professors/:id", authenticateUser, dbprof.updateProfessor);
app.delete("/professors/:id", dbprof.deleteProfessor);

app.get("/reviews", dbrev.getReviews);
app.get("/reviews/:id", dbrev.getReviewById);
app.post("/professors/:id/review-new", authenticateUser, dbrev.createReview);
app.put("/reviews/:id", authenticateUser, dbrev.updateReview);
app.delete("/reviews/:id", authenticateUser, dbrev.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
