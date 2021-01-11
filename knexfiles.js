module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "sshin2",
      password: password,
      database: "ratemyprofessor",
    },
    migrations: {
      directory: "/db/migrations",
    },
    seeds: {
      directory: "/db/seeds",
    },
  },
};
