import { AllowNull, Column, DataType, Default, ForeignKey, Model, Sequelize, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Accounts, AccountType } from "./account";




@Table({ timestamps: true, tableName: 'musics' })
export class Musics extends Model {
   // secure_url, trackNumber, length, album, year, title, imageBuffer, account

	@AllowNull(true)
	@Column(DataType.STRING)
	secure_url!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	trackNumber!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	composer!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	comment!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	length!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	album!: string;


    @AllowNull(true)
	@Column(DataType.STRING)
	year!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	title!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	imageBuffer!: string;


	@AllowNull(true)
	@Column(DataType.STRING)
	genre!: string

	@ForeignKey(() => Accounts)
	@Column({ type: DataType.INTEGER, allowNull: false })
	account!: number;

}
