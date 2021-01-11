exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("professors")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("professors").insert([
        {
          name: "John Taylor",
          university: "Northwestern University",
          department: "Art",
        },
        {
          name: "Ethan Towns",
          university: "Dartmouth Univeristy",
          department: "Biology",
        },
        {
          name: "Matthew Givens",
          university: "University of Illinois",
          department: "Physics",
        },
        {
          name: "Sarah Long",
          university: "Purdue University",
          department: "Math & Stat",
        },
        {
          name: "Amy Klean",
          university: "Stanford University",
          department: "Computer Science",
        },
      ]);
    });
};
