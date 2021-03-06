require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? {
    rejectUnauthorized: false
  } : false
});


// Professors CRUD
// Professors Index
const getProfessors = async (req, res) => {
  const professors = await pool.query("SELECT * FROM professors");
  for (const professor of professors.rows) {
    const reviews = await pool.query(
      `SELECT * FROM reviews WHERE professor_id = ${professor.id}`
    );
    professor.reviews = reviews.rows;
  }
  res.json(professors.rows);
};
// Professors Show
const getProfessorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const professorResult = await pool.query(
      "SELECT * FROM professors WHERE id = $1",
      [id]
    );
    const reviewsResult = await pool.query(
      "SELECT * FROM reviews WHERE professor_id = $1",
      [id]
    );
    const professor = professorResult.rows[0];
    professor.reviews = reviewsResult.rows;
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Professors Create
const createProfessor = (req, res) => {
  const { name, university, department } = req.body;

  pool.query(
    "INSERT INTO professors (name, university, department) VALUES ($1, $2, $3) RETURNING *",
    [name, university, department],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};
//Professors Update
const updateProfessor = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, university, department } = req.body;

  pool.query(
    "UPDATE professors SET name = $1, university = $2, department = $3 WHERE id = $4",
    [name, university, department, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Professor modified with ID: ${id}`);
    }
  );
};
//Professors Delete
const deleteProfessor = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM professors WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Professor deleted with ID: ${id}`);
  });
};

module.exports = {
  pool,
  getProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};
