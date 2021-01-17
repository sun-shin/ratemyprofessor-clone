const Pool = require("pg").Pool;
const pool = new Pool({
  user: "sshin2",
  host: "localhost",
  database: "ratemyprofessor",
  password: "password",
  port: 5432,
});

// Reviews CRUD

// Reviews Index
const getReviews = (req, res) => {
  pool.query("SELECT * FROM reviews ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
// Reviews Show
const getReviewById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const reviewResult = await pool.query(
      "SELECT * FROM reviews WHERE id = $1",
      [id]
    );
    const review = reviewResult.rows[0];
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Reviews Create
const createReview = (request, response) => {
  const { professor_id, title, course_code, review, rating } = request.body;

  pool.query(
    "INSERT INTO reviews (professor_id, title, course_code, review, rating) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [professor_id, title, course_code, review, rating],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Review added with ID: ${results.rows[0].id}`);
    }
  );
};
//Reviews Update
const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professor_id, title, course_code, review, rating } = request.body;

  pool.query(
    "UPDATE reviews SET professor_id = $1, title = $2, course_code = $3, review = $4, rating = $5 WHERE id = $6",
    [professor_id, title, course_code, review, rating, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};
//Reviews Delete
const deleteReview = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM reviews WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${id}`);
  });
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
