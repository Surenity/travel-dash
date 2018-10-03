
exports.up = function(knex, Promise) {
  return knex.schema.createTable("trips",(table)=>{
    table.increments();
    table.string("name");
    table.date("date");
    table.string("origin");
    table.string("destination");
    table.integer("user_id") // FOREIGN KEY
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    table.integer("airline_id") // FOREIGN KEY
        .references('id')
        .inTable('airlines')
        .onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("trips");
};
