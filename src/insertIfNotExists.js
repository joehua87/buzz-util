// @flow

import R from 'ramda'

/*
 * Useful for testing module validation. The drawback of this methods is this cannot update
 */
export default async function insertIfNotExists({ Model, key, entities }: {
  Model: any,
  key: string,
  entities: Array<any>
}): Promise<{
  exists: number,
  inserted: number,
}> {
  const ids = R.pluck(key, entities)
  const existEntities = await Model.find({ [key]: { $in: ids } }).select(key).lean()
  const existIds = R.pluck(key, existEntities)
  const mediasToInsert = entities.filter(x => !existIds.includes(x[key]))
  const response = await Model.create(mediasToInsert)
  return {
    exists: existIds.length,
    inserted: (response || []).length,
  }
}
