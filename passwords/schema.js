import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull
} from 'graphql';
import Db from './db';


const Password = new GraphQLObjectType({
	name: 'Password',
	description: 'This is the Password table handler.',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(password) {
					return password.id
				}
			},
			password: {
				type: GraphQLString,
				resolve(password) {
					return password.password
				}
			}
		}
	}
});

const PasswordData = new GraphQLObjectType({
	name: 'PasswordData',
	description: 'This is the password_data table handler.',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(passwordData) {
					return passwordData.id
				}
			},
			url: {
				type: GraphQLString,
				resolve(passwordData) {
					return passwordData.url
				}
			},
			username: {
				type: GraphQLString,
				resolve(passwordData) {
					return passwordData.username
				}
			},
			email: {
				type: GraphQLString,
				resolve(passwordData) {
					return passwordData.email
				}
			},
			comment: {
				type: GraphQLString,
				resolve(passwordData) {
					return passwordData.comment
				}
			},
			password: {
				type: Password,
				resolve(password) {
					return password.getPassword()
				}
			}
		}
	}
});

const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is a root query',
	fields: () => {
		return {
			passwords: {
				type: new GraphQLList(PasswordData),
				args: {
					id: {
						type: GraphQLInt
					}
				},
				resolve(root, args) {
					console.log(Db.models);
					return Db.models.password_data.findAll({
						where: args
					});
				}
			},
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'addPassword',
	description: 'Add a password.',
	fields() {
		return {
			addPassword: {
				type: PasswordData,
				args: {
					url: {
						type: GraphQLString
					},
					username: {
						type: GraphQLString
					},
					email: {
						type: GraphQLString
					},
					comment: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return Db.models.password_data.create({
						url: args.url,
						username: args.username,
						email: args.email,
						comment: args.comment
					});
				}
			}
		}
	}
})

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

export default Schema;
