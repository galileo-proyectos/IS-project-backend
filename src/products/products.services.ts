import * as ProductCost from './products.const'
import * as ProductDB from './products.db'

import { Product } from '../utils/Sequelize';

export async function readAll() {
  return await Product.findAll();
}
