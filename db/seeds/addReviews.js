exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("reviews").insert([
        {
          professor_id: 1,
          title: "Great Professor",
          course_code: "ATF 132",
          review:
            "My favorite professor I had this year. Took this course as an elective and am now considering a minor in Art",
          rating: 5,
        },
        {
          professor_id: 1,
          title: "Made class enjoyable",
          course_code: "ATF 132",
          review:
            "Enjoyed the course more than expected thanks to Professor Taylor. Attendance is mandatory, but course is not difficult with fair amount of extra credit.",
          rating: 4,
        },
        {
          professor_id: 1,
          title: "Would recommend",
          course_code: "ATF 220",
          review:
            "Loved this professor for ATF 132, and was glad I had him again for 220",
          rating: 4,
        },
        {
          professor_id: 2,
          title: "Exams are difficult",
          course_code: "BIOS 331",
          review:
            "Exams hardly recover lecture material. You will not pass this course without reading the text",
          rating: 3,
        },
        {
          professor_id: 2,
          title: "Office hours are a must!",
          course_code: "BIOS 331",
          review:
            "He just reads of powerpoints in lecture, but thoroughly explains concepts in office hours",
          rating: 3,
        },
        {
          professor_id: 2,
          title: "Must work for your grade",
          course_code: "BIOS 331",
          review:
            "Dont bother going to lecture. Just read textbook and go to office hours",
          rating: 3,
        },
        {
          professor_id: 3,
          title: "Made me reconsider engineering",
          course_code: "PHYS 201",
          review:
            "Professor Givens loves engineering. He has very interesting takes on the field, and his love for the topic can be seen through curriculum",
          rating: 4,
        },
        {
          professor_id: 3,
          title: "Speaks to Fast",
          course_code: "PHYS 201",
          review:
            "Can hardly understand him since he doesnt enunciate and speaks fast. Exams are way too difficult",
          rating: 1,
        },
        {
          professor_id: 4,
          title: "Professor Long goes extra mile for her students",
          course_code: "STAT 104",
          review:
            "Professor Long often stayed past office hours to help me understand concepts. She gives a lot of resources for you to succeed.",
          rating: 5,
        },
        {
          professor_id: 5,
          title: "New love for computers and tech!",
          course_code: "CSI 150",
          review:
            "Learned a lot about programming and what is going on in the tech industry.",
          rating: 4,
        },
        {
          professor_id: 5,
          title: "Lots of homework",
          course_code: "CSI 150",
          review: "Too much homework and projects in the course.",
          rating: 4,
        },
      ]);
    });
};
