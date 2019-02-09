const extractTable = require('./scripts/extract-table')

extractTable('./resources/open_days.pdf').then(result => {
  console.log(result)
})
