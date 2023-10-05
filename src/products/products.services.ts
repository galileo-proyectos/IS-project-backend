import NotFoundError from '../utils/NotFoundError'
import type { Model, WhereOptions } from 'sequelize'
import { Product } from '../models/Models'
import { Op } from 'sequelize'

interface ReadFilters {
  brandId: number | null
  aisleId: number | null
  fromPrice: number | null
  toPrice: number | null
}

export async function readAll (filters: ReadFilters): Promise<Array<Model<Read.Product, Read.Product>>> {
  const sqWhere: WhereOptions = {}

  if (filters.brandId !== null) {
    sqWhere.brandId = filters.brandId
  }

  if (filters.aisleId !== null) {
    sqWhere.aisleId = filters.aisleId
  }

  if (filters.fromPrice !== null && filters.toPrice !== null) {
    sqWhere.price = {
      [Op.between]: [filters.fromPrice, filters.toPrice]
    }
  }

  return await Product.findAll({
    where: sqWhere
  })
}

export async function readOne (code: string): Promise<Model<Read.Product, Read.Product>> {
  const product = await Product.findOne({ where: { code } })

  if (product !== null) {
    return product
  } else {
    throw new NotFoundError('Product not found.')
  }
}
