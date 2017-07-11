//Graphql Schema
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type User {
    id: ID!
    email: String!
    username: String!
    password: String
    code: [Codebase]
  }

  type Codebase {
    id: ID!
    user_id: Int!
    code: String!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UserInput {
    username: String!
    password: String!
  }

  type findUserReturnPayload {
    isUser: Boolean
    user: User
    error: String
  }

  type AddUserReturnPayload {
    id: ID!
    email: String!
    username: String!
  }

  type AddCodeReturnPayload {
    submittedCode: Codebase
    err: String
  }

  # the schema allows the following queries

  type Query {
    users: [User]
    findUser(input: UserInput!): findUserReturnPayload
    findCode(id: Int!): [Codebase]
  }

  type Mutation {
    # A mutation to add a new snippet of code or a new user
    addCode(user_id: Int! code: String!): AddCodeReturnPayload
    addUser(input: AddUserInput!): AddUserReturnPayload
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
