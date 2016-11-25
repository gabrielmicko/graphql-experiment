import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import Config from '../config/config.json';

const Conn = new Sequelize(
	Config.db,
	Config.username,
	Config.password,
	{
		dialect: Config.dialect,
		host: Config.host
	}
);

const Password = Conn.define('passwords', {
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			max: 100
		}
	}
});

const PasswordData = Conn.define('password_data', {
	url: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			max: 250
		}
	},
	username: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			max: 200
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isEmail: true
		}
	},
	comment: {
		type: Sequelize.TEXT,
		allowNull: true
	}
});

//Relationships
PasswordData.belongsTo(Password, {as: 'password'});

Conn.sync({
	force: true
}).then(() => {
	_.times(10, () => {
		return PasswordData.create({
			url: Faker.internet.url(),
			username: Faker.internet.userName(),
			email: Faker.internet.email(),
			comment: Faker.lorem.sentence()
		}).then(password => {
			return password.createPassword({
				password: Faker.internet.password(),
			})
		});
	})
});

export default Conn;
