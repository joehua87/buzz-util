// @flow

import { expect } from 'chai'
import createMongoUri from '../createMongoUri'

describe('Create mongo uri', () => {
  it('auth = false', () => {
    const mongoUri = createMongoUri({
      auth: false,
      host: 'localhost',
      name: 'test',
    })
    // console.log(mongoUri)
    expect(mongoUri).to.equal('mongodb://localhost/test')
  })

  it('auth = true', () => {
    const mongoUri = createMongoUri({
      auth: true,
      host: 'localhost',
      name: 'test',
      user: 'test',
      pass: 'pass',
    })
    // console.log(mongoUri)
    expect(mongoUri).to.equal('mongodb://test:pass@localhost/test?authSource=test')
  })

  it('auth = true, throw error if not have user or pass', () => {
    try {
      createMongoUri({
        auth: true,
        host: 'localhost',
        name: 'test',
        user: 'test',
      })
      throw new Error('Not throwing error! :)')
    } catch (err) {
      expect(err.message).to.equal('When auth=true, require user & pass')
    }
  })
})
