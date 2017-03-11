// @flow

import R from 'ramda'

const debug = require('debug')('buzz-util:upsert')

/*
 * Utils for upsert entities in mongoose
 */
export default async function upsert({ Model, key, entities }: {
  Model: any,
  key: string,
  entities: Array<any>
}): Promise<UpsertResult> {
  if (entities.length === 0) return {}
  debug(`Start to upsert ${entities.length} entities`)
  const bulk = Model.collection.initializeUnorderedBulkOp()
  entities.forEach(item => (
    bulk.find({ [key]: item[key] }).upsert().updateOne({
      $set: {
        ...R.omit(key, item),
      },
    })),
  )

  return new Promise((resolve, reject) => bulk.execute((err, response) => {
    if (err) return reject(err)
    const result = R.pick(['nInserted', 'nUpserted', 'nMatched', 'nModified', 'nRemoved'], response.toJSON())
    return resolve(result)
  }))
}
