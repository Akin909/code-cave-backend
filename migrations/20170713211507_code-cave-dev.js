exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.string('email');
    }),
    knex.schema.createTable('codebase', table => {
      table.increments('id').primary();
      table.string('code');
      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('codebase')
  ]);
};
