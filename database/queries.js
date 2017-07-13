export const knex = require('./knex');
export const Users = () => knex('users');
export const UserCode = id => Users.where('id', parseInt(id));
