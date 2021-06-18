const { Pool } = require("pg");

if (process.env.NODE_ENV !== "production") {
  pool = new Pool({
    user: 'sun',
    host: 'localhost',
    database: 'ratemyprofessor',
    password: 'password',
    port: 5432
  })
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getUsers = async (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    const email = req.body.email;

    pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, password",
      [email, hashedPassword],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        res.status(201).json(results.rows[0]);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const createSession = async (req, res) => {
  try {
    const email = req.body.email;
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];
    const user_id = user.id
    if(await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ user_id: user.id }, 'key')
      res.status(200).json({token, user_id});
    } else {
      res.send(401).json("Unauthorized");
    }
  } catch {
    res.status(500).send();
  }
};

module.exports = {
  pool,
  getUsers,
  createUser,
  createSession
};