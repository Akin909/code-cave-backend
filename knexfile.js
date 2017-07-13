// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'code_cave_dev'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'code_cave_staging'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.HEROKU_HOST,
      user: process.env.HEROKU_USER,
      password: process.env.HEROKU_PW,
      database: process.env.HEROKU_DB
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
