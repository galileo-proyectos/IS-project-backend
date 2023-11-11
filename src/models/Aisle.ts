import { db } from '../SequelizeConnection'
import { DataTypes, Model } from 'sequelize'

export default class Aisle extends Model {
  declare id: number
  declare name: string
}

Aisle.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false,
  modelName: 'aisle'
})
