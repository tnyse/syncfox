

 const AccountStatus = {
	ACTIVE : 'ACTIVE',
	SUSPENDED : 'SUSPENDED',
}



 const AccountType = {
	USER : 'USER',
	ARTIST :'ARTIST',
}


const {config} = require('../config/configSetup');
const { Sequelize, DataTypes } = require('sequelize');
// const {sequelize} = require("../controllers/db")


const sequelize = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
	host: config.DBHOST,
	port: config.DBPORT,
	dialect: 'mysql',
	logging: false,
	dialectOptions: {
		ssl: { require: false, rejectUnauthorized: false },
	},
	// models: [
	// 	Accounts,
	// 	Verify,
	// 	Profiles,
	// 	Musics
	// ],
});


 const Accounts = sequelize.define('accounts', {
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	password: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	email: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	username: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	join: {
		type: DataTypes.STRING,
		allowNull: false,
	  },
	  status: {
		defaultValue: AccountStatus.ACTIVE,
		type: DataTypes.ENUM(AccountStatus.ACTIVE, AccountStatus.SUSPENDED),
		allowNull: false,
	  },
	  type: {
		type: DataTypes.ENUM(AccountType.USER, AccountType.ARTIST),
		allowNull: false,
	  },
	  verified: {
		defaultValue: false,
		type: DataTypes.BOOLEAN,
		allowNull: false,
	  }
  }, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
  });




  const Profiles = sequelize.define('profiles', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	businessName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	jobTitle: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	businessType: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	cardNumber: {
		type: DataTypes.STRING,
		allowNull: true,

	},
	cvv: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	cardDate: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	ipi: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	proName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	pkaTitle: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	type: {
		type: DataTypes.ENUM(AccountType.USER, AccountType.ARTIST),
		allowNull: true,
	},
	account: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: 'accounts', // name of the referenced model
			key: 'id', // name of the referenced column
		},
	},
}, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
});




const Musics = sequelize.define('musics', {
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	secure_url: {
	  type: DataTypes.STRING,
	  allowNull: true,
	},
	trackNumber: {
	  type: DataTypes.STRING,
	  allowNull: true,
	},
	composer: {
	  type: DataTypes.STRING,
	  allowNull: true,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: true,
	  },
	  length: {
		type:DataTypes.STRING,
		allowNull: true,
	  },
	  album: {
		type: DataTypes.STRING,
		allowNull: true,
	  },
	//   year, title, imageBuffer, genre, account
	year: {
		type: DataTypes.STRING,
		allowNull: true,
		
	  },
	  title: {
		type: DataTypes.STRING,
		allowNull: true,
		
	  },
	  imageBuffer: {
		type: DataTypes.STRING,
		allowNull: true,
		
	  },
	  genre: {
		type: DataTypes.STRING,
		allowNull: true,
		
	  },
	  account: {
		allowNull: true,
		type: DataTypes.INTEGER,
		references: {
		  model: 'accounts', // name of the referenced model
		  key: 'id', // name of the referenced column
		},
	  },
  }, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
  });



  const Category = sequelize.define('category', {

	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	title: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	  },
	image: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
  }, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
  });



  const SubCategory = sequelize.define('subcategory', {
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	title: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	  },
	image: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	// category: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: true,
	// 	references: {
	// 		model: 'category', // name of the referenced model
	// 		key: 'id', // name of the referenced column
	// 	},
	// },
  }, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
  });


  const MusicAdmin = sequelize.define('musicadmin', {
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	
	// subcategory: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: true,
	// 	references: {
	// 		model: 'subcategory', // name of the referenced model
	// 		key: 'id', // name of the referenced column
	// 	},
	// },

	// musics: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: true,
	// 	references: {
	// 		model: 'musics', // name of the referenced model
	// 		key: 'id', // name of the referenced column
	// 	},
	// },
  }, {
	// optional settings for the model
	timestamps: true, // adds createdAt and updatedAt fields
	freezeTableName: true, // use singular table name (default is pluralized)
  });

  Profiles.belongsTo(Accounts, {  as: 'account_id' });
  Musics.belongsTo(Accounts, {  as: 'account_id' })


Category.hasMany(SubCategory, { as: "subcategorys" });
SubCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});


SubCategory.hasMany(MusicAdmin, { as: "musics" });
MusicAdmin.belongsTo(SubCategory, {
  foreignKey: "subcategoryId",
  as: "subcategory",
});
MusicAdmin.belongsTo(Musics, {
	foreignKey: "musicId",
	as: "music",
  });



  sequelize.sync()


  module.exports = {Profiles, Musics, Accounts,SubCategory, Category, MusicAdmin, AccountType, AccountStatus}