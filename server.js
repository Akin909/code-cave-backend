import express from 'express';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { schema } from './graphql/schema.js';

const app = express();
const port = process.env.PORT || 4001;

app.use('*', cors({ origin: 'http://localhost:8080' }));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use(
  '/graphiql',
  bodyParser.json(),
  graphiqlExpress({ endpointURL: '/graphql' })
);

app.listen(port, () => {
  console.log(`Server's up on port: ${port}`);
});
