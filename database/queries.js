export const knex = require('./knex');

export const Users = () => knex('users');

export const AllUsers = () => Users().select();

export const Code = () => knex('codebase');

export const UserCode = id => Code().where('user_id', parseInt(id));

export const FindUser = username => Users().where('username', username).first();

export const FindDuplicate = (username, email) =>
  Users().where('username', username).orWhere('email', email);

export const AddUser = user => Users().insert(user, 'id');

export const AddCode = code => Code().insert(code, 'id');

export const FindCode = id => Users().Code().where('user_id', parseInt(id));
