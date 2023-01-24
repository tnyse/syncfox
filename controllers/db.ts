// Import packages
import { Sequelize } from 'sequelize-typescript';

// Import configs
import config from '../config/configSetup';
import { Accounts } from '../models/account';



const sequelize = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
	host: config.DBHOST,
	port: config.DBPORT,
	dialect: 'mysql',
	logging: false,
	dialectOptions: {
		ssl: { require: true, rejectUnauthorized: false },
	},
	models: [
		Accounts,
	],
});

const initDB = async () => {
	await sequelize.authenticate();
	await sequelize
		// .sync({})
		.sync({ alter: true })
		.then(async () => {
			console.log('Database connected!');
		})
		.catch(function (err: any) {
			console.log(err, 'Something went wrong with the Database Update!');
		});
};
export { sequelize, initDB };
