
// const {config} = require('../config/configSetup');
// const { Sequelize, DataTypes } = require('sequelize');
// // const {sequelize} = require("../controllers/db")
// const {Accounts} = require("./account")
//  // secure_url, trackNumber,composer,comment, length, album, year, title, imageBuffer, genre, account

//  const sequelize = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
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

// // define the Accounts model
//  const Musics = sequelize.define('musics', {
// 	id: {
// 	  type: DataTypes.INTEGER,
// 	  primaryKey: true,
// 	  autoIncrement: true,
// 	},
// 	secure_url: {
// 	  type: DataTypes.STRING,
// 	  allowNull: true,
// 	},
// 	trackNumber: {
// 	  type: DataTypes.STRING,
// 	  allowNull: true,
// 	},
// 	composer: {
// 	  type: DataTypes.STRING,
// 	  allowNull: true,
// 	},
// 	comment: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	  },
// 	  length: {
// 		type:DataTypes.STRING,
// 		allowNull: true,
// 	  },
// 	  album: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
// 	  },
// 	//   year, title, imageBuffer, genre, account
// 	year: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
		
// 	  },
// 	  title: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
		
// 	  },
// 	  imageBuffer: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
		
// 	  },
// 	  genre: {
// 		type: DataTypes.STRING,
// 		allowNull: true,
		
// 	  },
// 	  account: {
// 		allowNull: true,
// 		type: DataTypes.INTEGER,
// 		references: {
// 		  model: 'accounts', // name of the referenced model
// 		  key: 'id', // name of the referenced column
// 		},
// 	  },
//   }, {
// 	// optional settings for the model
// 	timestamps: true, // adds createdAt and updatedAt fields
// 	freezeTableName: true, // use singular table name (default is pluralized)
//   });


//   Musics.belongsTo(Accounts, { foreignKey: 'account' });

//   Profiles.belongsTo(Accounts, { foreignKey: 'account' });
//   Musics.belongsTo(Accounts, { foreignKey: 'account' });

//   sequelize.sync()