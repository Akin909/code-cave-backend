import db from './../database/dbConnection.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await db.query(`SELECT * FROM users`);
        return users.map(async user => {
          const code = await db.query(
            `SELECT * FROM codebase WHERE $1 = codebase.user_id`,
            user.id
          );
          return {
            ...user,
            code
          };
        });
      } catch (e) {
        return e;
      }
    },
    findUser: async (_, { input }) => {
      const { username, password } = input;
      try {
        const [dbRes] = await db.query(
          `SELECT users.password, users.username, users.id, users.email FROM users WHERE username = $1`,
          username
        );
        const isUser = await bcrypt.compare(password, dbRes.password);
        const code = await db.query(
          `SELECT * FROM codebase WHERE $1 = codebase.user_id`,
          dbRes.id
        );
        if (isUser) {
          return {
            isUser,
            user: {
              username: dbRes.username,
              email: dbRes.email,
              id: dbRes.id,
              code
            },
            error: ''
          };
        } else {
          throw new Error('You are not registered with us');
        }
      } catch (e) {
        return {
          error: e.message,
          isUser: false
        };
      }
    },
    findCode: (_, { id }) =>
      db
        .query(
          `SELECT users.firstname, users.surname, users.username, users.id, codebase.code, codebase.user_id FROM users, codebase WHERE codebase.user_id = $1`,
          id
        )
        .catch(err => err)
  },
  Mutation: {
    addCode: async (root, { code, user_id }) => {
      try {
        const [
          res
        ] = await db.query(
          `INSERT INTO codebase (user_id, code) VALUES ($1, $2) RETURNING ID`,
          [user_id, code]
        );
        console.log('id', res.id);
        console.log('user_id', id);
        console.log('code', code);
        return {
          submittedCode: {
            code,
            id: res.id,
            user_id: id
          }
        };
      } catch (err) {
        return {
          err: err.message
        };
      }
    },
    addUser: async (root, { input }) => {
      const { username, email, password } = input;
      const errors = Object.keys(input)
        .filter(field => {
          //FIXME errors are thrown handle as errors or return error messages
          //to front end
          if (validator.isEmpty(field)) {
            return { key: field, message: `${field} is empty` };
          } else if (field === 'email') {
            if (!validator.isEmail(input[field])) {
              return { key: field, message: `Please submit a valid email` };
            }
          } else if (!validator.isLength(field, { max: 20 })) {
            return { key: field, message: `${field} cannot be longer than 20` };
          }
          return null;
        })
        .filter(e => e);
      if (errors.length) throw new Error(errors);
      try {
        const salt = await bcrypt.genSalt(10);
        const saltedAndHashed = await bcrypt.hash(password, salt);
        const duplicate = await db.query(
          `SELECT * FROM users WHERE ($1 = users.username) OR (users.email = $2)`,
          [username, email]
        );
        if (!duplicate.length) {
          const [
            res
          ] = await db.query(
            `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING ID`,
            [username, email, saltedAndHashed]
          );
          return {
            id: res.id,
            username,
            email,
            code: []
          };
        } else {
          throw new Error('There is a duplicate');
        }
      } catch (e) {
        return e;
      }
    }
  }
};

export default resolvers;
