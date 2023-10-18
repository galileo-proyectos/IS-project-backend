import NotFoundError from '../utils/NotFoundError'
import type { Model, WhereOptions } from 'sequelize'
import { Product } from '../models/Models'
import { Op } from 'sequelize'

interface ReadFilters {
  name: string | null
  categoryId: number | null
  brandId: number | null
  fromPrice: number | null
  toPrice: number | null
}

export async function readAll (filters: ReadFilters): Promise<Array<Model<Read.Product, Read.Product>>> {
  const sqWhere: WhereOptions = {}

  if (filters.name !== null) {
    sqWhere.name = {
      [Op.like]: `%${filters.name}%`
    }
  }

  if (filters.categoryId !== null) {
    sqWhere.categoryId = filters.categoryId
  }

  if (filters.brandId !== null) {
    sqWhere.brandId = filters.brandId
  }

  if (filters.fromPrice !== null && filters.toPrice !== null) {
    sqWhere.price = {
      [Op.between]: [filters.fromPrice, filters.toPrice]
    }
  }

  return await Product.findAll({
    where: sqWhere,
    limit: 50,
    include: [{ all: true }]
  })
}

export async function readOne (code: string): Promise<Model<Read.Product, Read.Product>> {
  const product = await Product.findOne({ where: { code }, include: [{ all: true }] })

  if (product !== null) {
    return product
  } else {
    throw new NotFoundError('Product not found.')
  }
}
