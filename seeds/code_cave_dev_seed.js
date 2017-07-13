exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(() => {
    // Inserts seed entries
    return knex('users')
      .insert([
        {
          id: 1,
          username: 'Akin909',
          email: 'akin@test.com',
          password: 'stuff'
        }
      ])
      .then(() =>
        knex('codebase').insert([
          { user_id: '1', code: '() => fn => next => fn(next)' },
          {
            user_id: '1',
            code: 'function sayHello(name){ console.log("Hello" + name) }'
          }
        ])
      );
  });
};
