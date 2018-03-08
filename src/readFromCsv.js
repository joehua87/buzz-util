// // @flow

import fs from 'fs'
import csv from 'csvtojson'
import iconv from 'iconv-lite'
import chardet from 'chardet'

const debug = require('debug')('buzz-util:readFromCsv')

/*
 * If use autoDetect, performance may be drop down, it deppends on chardet
 */
export default function readFromCsv(
  csvFilePath: string,
  {
    autoDetect = true,
    encoding = 'utf8',
    ...rest
  }: {
    autoDetect: boolean,
    encoding: string,
  } = {},
): Promise<Array<any>> {
  const stream = fs.createReadStream(csvFilePath)
  const _encoding = autoDetect ? chardet.detectFileSync(csvFilePath) : encoding
  debug(`File ${csvFilePath} have encoding ${_encoding}`)
  const items = []
  return new Promise((resolve, reject) => {
    csv({ delimiter: 'auto', ...rest })
      .fromStream(
        stream.pipe(iconv.decodeStream(_encoding)),
      )
      .on('json', (jsonObj) => {
        items.push(jsonObj)
      })
      .on('done', (error) => {
        if (error) reject(error)
        else resolve(items)
      })
  })
}
