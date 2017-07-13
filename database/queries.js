export const knex = require('./knex');
export const Users = () => knex('users');
export const AllUsers = () => Users().select();
export const Code = () => knex('codebase');
export const UserCode = id => Code().where('user_id', parseInt(id));
