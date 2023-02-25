// import { Table, Model, Column, DataType, AllowNull, Default } from 'sequelize-typescript';

import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";



export enum AccountStatus {
	ACTIVE = 'ACTIVE',
	SUSPENDED = 'SUSPENDED',
}



export enum AccountType {
	USER = 'USER',
	ARTIST = 'ARTIST',
}


@Table({ timestamps: true, tableName: 'accounts' })
export class Accounts extends Model {

	@AllowNull(false)
	@Column(DataType.STRING)
	password!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	email!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	username!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	join!: string;

	
	@Default(AccountStatus.ACTIVE)
	@Column(DataType.ENUM(AccountStatus.ACTIVE, AccountStatus.SUSPENDED))
	status!: AccountStatus;



	@Default(AccountType.USER)
	@Column(DataType.ENUM(AccountType.USER, AccountType.ARTIST))
	type!: AccountType;
	


	@Default(false)
	@Column(DataType.BOOLEAN)
	verified!: boolean;
}
