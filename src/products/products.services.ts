import NotFoundError from '../utils/NotFoundError'
import type { Model, WhereOptions } from 'sequelize'
import Product from '../models/Product'
import { Op } from 'sequelize'

interface ReadFilters {
  name: string | null
  categoryIds: number[] | null
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

  if (filters.categoryIds !== null) {
    sqWhere.categoryId = {
      [Op.in]: filters.categoryIds
    }
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

export async function readOne (code: string): Promise<Product> {
  const product = await Product.findOne({ where: { code }, include: [{ all: true }] })

  if (product !== null) {
    return product
  } else {
    throw new NotFoundError('Product not found.')
  }
}
