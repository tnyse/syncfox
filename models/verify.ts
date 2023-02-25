import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";


@Table({ timestamps: true, tableName: 'verify' })
export class Verify extends Model {
	@AllowNull(false)
	@Column(DataType.STRING)
	serviceID!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	code!: string;
}
