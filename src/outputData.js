// @flow

import fs from 'fs-extra'
import json2csv from 'json2csv'
import json2xls from 'json2xls'

/*
 * Export data to file, json, csv or xlsx
 */
export default async function outputData(filePath: string, data: Array<any>, format: 'json' | 'csv' | 'xlsx' = 'csv') {
  if (!['csv', 'json', 'xlsx'].includes(format)) throw new Error('format must be in csv, json, xlsx')
  if (format === 'csv') {
    const csvString = json2csv({ data, flatten: true })
    fs.outputFileSync(filePath, csvString)
  } else if (format === 'xlsx') {
    const csvString = json2xls(data)
    fs.outputFileSync(filePath, csvString, 'binary')
  } else {
    fs.outputJsonSync(filePath, data)
  }
}
