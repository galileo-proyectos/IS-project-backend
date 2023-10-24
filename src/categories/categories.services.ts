import Category from '../models/Category'
import NotFoundError from '../utils/NotFoundError'
import type { Model } from 'sequelize'

export async function readAll (): Promise<Model[]> {
  return await Category.findAll()
}

export async function readOne (id: number): Promise<Model> {
  const aisle = await Category.findOne({ where: { id } })

  if (aisle !== null) {
    return aisle
  } else {
    throw new NotFoundError('Aisle not found.')
  }
}
