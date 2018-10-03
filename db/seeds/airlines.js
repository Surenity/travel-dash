
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('airlines').del()
    .then(function () {
      // Inserts seed entries
      return knex('airlines').insert([
        {name: "American Airlines",
        description: 'American description',
        img_url: "/assets/images/american.jpg"},

        {name: "Southwest Airlines",
        description: 'Southwest description',
        img_url: "/assets/images/sw.jpg"},

        {name: "United Airlines",
        description: 'United description',
        img_url: "/assets/images/united.jpg"}
      ]);
    });
};
