import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    field: "uuid"
  })
  uuid?: string;

  @Column({
    type: DataType.STRING,
    field: "first_name"
  })
  first_name?: string;

  @Column({
    type: DataType.STRING,
    field: "last_name"
  })
  last_name?: string;

  @Column({
    type: DataType.STRING,
    field: "userName"
  })
  userName?: string;

  @Column({
    type: DataType.INTEGER,
    field: "userName_verified"
  })
  userName_verified?: number;

  @Column({
    type: DataType.DATE,
    field: "created_at"
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    field: "updated_at"
  })
  updated_at?: Date;
}
