// import { Table, Model, Column, DataType, AllowNull, Default } from 'sequelize-typescript';

import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";



export enum AccountStatus {
	ACTIVE = 'ACTIVE',
	SUSPENDED = 'SUSPENDED',
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
	surname!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	join!: string;

	
	@Default(AccountStatus.ACTIVE)
	@Column(DataType.ENUM(AccountStatus.ACTIVE, AccountStatus.SUSPENDED))
	status!: AccountStatus;
}
