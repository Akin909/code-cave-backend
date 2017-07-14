import db from './../database/knex';
import * as queries from './../database/queries';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await queries.AllUsers();
        return users.map(async user => {
          const code = await queries.UserCode(user.id);
          return { ...user, code };
        });
      } catch (e) {
        return e;
      }
    },
    findUser: async (_, { input }) => {
      const { username, password } = input;
      try {
        const user = await queries.FindUser(username);
        const isUser = await bcrypt.compare(password, user.password);
        const code = await queries.UserCode(user.id);
        if (isUser) {
          return {
            isUser,
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
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
    findCode: async (_, { id }) => {
      const code = await queries.FindCode(id).catch(err => err);
      console.log('code', code);
      return code;
    }
  },
  Mutation: {
    addCode: async (root, { code, user_id }) => {
      try {
        const codeId = await queries.AddCode({ user_id, code });
        return { submittedCode: { code, id: codeId, user_id } };
      } catch (err) {
        return { err: err.message };
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
        const duplicate = await queries.FindDuplicate(username, email);

        if (!duplicate.length) {
          const newUserID = await queries.AddUser({
            username,
            email,
            password: saltedAndHashed
          });
          return { id: newUserID, username, email, code: [] };
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
