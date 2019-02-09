const fs = require('fs')
const es = require('event-stream')
const JSONStream = require('JSONStream')

const getSchools = require('./get-schools')
const {
  extractTable,
  format,
  getLocation,
  getThresholdsFromTable
} = require('./processors')
console.log(getSchools)
const generateBase = () => new Promise((resolve, reject) => {
  let writeToBaseFile = fs.createWriteStream(`./resources/base.json`)
  writeToBaseFile.on('finish', resolve)
  Promise.all([
    extractTable('./resources/thresholds_2018.pdf'),
    getSchools()
  ])
  .then(([table, {stream}]) => {
    stream.on('error', reject)
        stream
              .pipe(format())
              .pipe(getThresholdsFromTable(table))
              .pipe(getLocation())
              .pipe(es.mapSync(school => {
                console.log(school)
                console.log(`Done: ${school.name.full}`)
                return school
              }))
              .pipe(JSONStream.stringify())
              .pipe(writeToBaseFile)
  }).catch(err => console.log(err))
})
module.exports = generateBase
