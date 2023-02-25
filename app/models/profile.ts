// import { Table, Model, Column, DataType, AllowNull, Default } from 'sequelize-typescript';

import { AllowNull, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Accounts, AccountType } from "./account";




@Table({ timestamps: true, tableName: 'profiles' })
export class Profiles extends Model {
   

	@AllowNull(false)
	@Column(DataType.STRING)
	businessName!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	jobTitle!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	businessType!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	address!: string;


    @AllowNull(false)
	@Column(DataType.STRING)
	phone!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	cardNumber!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	cvv!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	cardDate!: string;

    @AllowNull(true)
	@Column(DataType.STRING)
	ipi!: string;


    @AllowNull(true)
	@Column(DataType.STRING)
	proName!: string;


    @AllowNull(true)
	@Column(DataType.STRING)
	pkaTitle!: string;



	@Default(AccountType.USER)
	@Column(DataType.ENUM(AccountType.USER, AccountType.ARTIST))
	type!: AccountType;
	

	@ForeignKey(() => Accounts)
	@Column({ type: DataType.INTEGER, allowNull: false })
	account!: number;

}
