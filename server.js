import Express from 'express';
import GraphHTTP from 'express-graphql';
import SchemaPasswords from './passwords/schema';
import SchemaPeople from './people/schema';

const APP_PORT = 3000;
const app = Express();

app.use('/graphql_ppl', GraphHTTP({
	schema: SchemaPeople,
	pretty: true,
	graphiql: true
}));

app.use('/graphql_pw', GraphHTTP({
	schema: SchemaPasswords,
	pretty: true,
	graphiql: true
}));




app.listen(APP_PORT, () => {
	console.log(`App is listening on port ${APP_PORT}`);
});
