// Import packages
const { Sequelize, DataTypes } = require('sequelize');

// Import configs
const {config} = require('../config/configSetup');
const { Accounts, Profiles, Musics  } = require('../models/account');
const { Verify } = require('../models/verify');


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
		Verify,
		Profiles,
		Musics
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
		.catch(function (err) {
			console.log(err, 'Something went wrong with the Database Update!');
		});
};
// export { sequelize, initDB };


module.exports = {
	sequelize, initDB,
   };