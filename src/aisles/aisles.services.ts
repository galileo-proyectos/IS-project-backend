import NotFoundError from '../utils/NotFoundError'
import type { Model } from 'sequelize'
import { Aisle } from '../utils/Models'

export async function readAll (): Promise<Model[]> {
  return await Aisle.findAll()
}

export async function readOne (id: number): Promise<Model> {
  const aisle = await Aisle.findOne({ where: { id } })

  if (aisle !== null) {
    return aisle
  } else {
    throw new NotFoundError('Aisle not found.')
  }
}
