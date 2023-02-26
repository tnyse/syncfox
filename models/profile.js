// const {Accounts} = require("./account")
// const { Sequelize, DataTypes } = require('sequelize');
// const {config} = require('../config/configSetup');


// const sequelize = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
// 	host: config.DBHOST,
// 	port: config.DBPORT,
// 	dialect: 'mysql',
// 	// logging: false,
// 	// dialectOptions: {
// 	// 	ssl: { require: true, rejectUnauthorized: false },
// 	// },
// 	// models: [
// 	// 	Accounts,
// 	// 	Verify,
// 	// 	Profiles,
// 	// 	Musics
// 	// ],
// });


// // businessName, jobTitle, businessType, address, phone, cardNumber, cvv, cardDate, ipi, proName, pkaTitle, type, account
// // define the Accounts model
//  const Profiles = sequelize.define('profiles', {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	businessName: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	jobTitle: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	businessType: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	address: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	phone: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	cardNumber: {
// 		type: DataTypes.STRING,
// 		allowNull: true,

// 	},
// 	cvv: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	cardDate: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	ipi: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	proName: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	pkaTitle: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	},
// 	type: {
// 		type: DataTypes.ENUM(AccountType.USER, AccountType.ARTIST),
// 		allowNull: true,
// 	},
// 	account: {
// 		type: DataTypes.INTEGER,
// 		allowNull: true,
// 		references: {
// 			model: 'accounts', // name of the referenced model
// 			key: 'id', // name of the referenced column
// 		},
// 	},
// }, {
// 	// optional settings for the model
// 	timestamps: true, // adds createdAt and updatedAt fields
// 	freezeTableName: true, // use singular table name (default is pluralized)
// });


// Profiles.belongsTo(Accounts, { foreignKey: 'account' });


// sequelize.sync()


