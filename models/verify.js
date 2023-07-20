const { Sequelize, DataTypes } = require('sequelize');
const {config} = require('../config/configSetup');


const sequelize = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
	host: config.DBHOST,
	port: config.DBPORT,
	dialect: 'mysql',
	logging: false,
	dialectOptions: {
		// ssl: { require: true, rejectUnauthorized: false },
	},
	// models: [
	// 	Accounts,
	// 	Verify,
	// 	Profiles,
	// 	Musics
	// ],
});

// businessName, jobTitle, businessType, address, phone, cardNumber, cvv, cardDate, ipi, proName, pkaTitle, type, account
// define the Accounts model
 const Verify = sequelize.define('verify', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	code: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	serviceID: {
		type: DataTypes.STRING,
		allowNull: true,
	},

}, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
});


sequelize.sync()


module.exports = {Verify}
