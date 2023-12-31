import { db } from '../SequelizeConnection'
import { DataTypes, Model } from 'sequelize'

export default class Brand extends Model {
  declare id: number
  declare name: string
  // declare imageURL: string
}

Brand.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
  // imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false,
  modelName: 'brand'
})
