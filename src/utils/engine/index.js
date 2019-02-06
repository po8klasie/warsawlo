import Fuse from 'fuse.js'

import * as tests from './tests'
import transformParam from './transformParams'
import isEqual from 'lodash.isequal'

export default class Engine {
  constructor(data) {
    this.data = data

    this.byQuery = new Fuse(data, {
      caseSensitive: false,
      keys: [
        'name.full',
        'name.short',
        'name.nicks'
      ]
    })
    this.defaultFilters = {
      profiles: [],
      pointsRange: [0, 200]
    }
  }
  generateTests = (filters) => {
    console.log(filters, filters ==this.defaultFilters, this.defaultFilters===filters)
    if(filters == null){
      return []
    }
    return Object.keys({...filters})
      .filter(key => !isEqual(filters[key], this.defaultFilters[key]))
      .map(key => tests[key](filters[key]))
  }

  search = (query, filters) => new Promise((resolve, reject) => {
    console.log(this.data)
    if (query.trim().length === 0) {
      this.queryResult = this.data
    } else {
      this.queryResult = this.byQuery.search(query)
    }
    this.runTests = this.generateTests(filters)
    let url = ''
    let result = this.queryResult
    if (this.runTests.length !== 0) {
      console.log(this.runTests)
      result = this.queryResult.filter(school => this.runTests.every(test => test(school)))
    }
    resolve(result)



  })
}
