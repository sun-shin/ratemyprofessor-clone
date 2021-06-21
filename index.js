const express = require("express");
var cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

const dbprof = require("./queries/professors");
const dbrev = require("./queries/reviews");
const dbuauth = require("./queries/users")

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static('public'));

function authenticateUser(req, res, next) {
  const token = req.headers.authentication;
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

app.get("/api/users", dbuauth.getUsers);
app.post("/api/users", dbuauth.createUser);
app.post("/api/sessions", dbuauth.createSession);

app.get("/api/professors", dbprof.getProfessors);
app.get("/api/professors/:id", dbprof.getProfessorById);
app.post("/api/professors", authenticateUser, dbprof.createProfessor);
app.put("/api/professors/:id", dbprof.updateProfessor);
app.delete("/api/professors/:id", dbprof.deleteProfessor);

app.get("/api/reviews", dbrev.getReviews);
app.get("/api/reviews/:id", dbrev.getReviewById);
app.post("/api/reviews", authenticateUser, dbrev.createReview);
app.put("/api/reviews/:id", dbrev.updateReview);
app.delete("/api/reviews/:id", dbrev.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
