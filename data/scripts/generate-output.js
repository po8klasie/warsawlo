const fs = require('fs')
const es = require('event-stream')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const generateOutput = () => new Promise((resolve, reject) => {
  let promises = fs.readdirSync('./src').map(filename => readFile(`./src/${filename}`))
  Promise.all(promises).then(values => {
    let output = values.map(school => JSON.parse(school))
    fs.writeFile('./data/data.json', JSON.stringify(output), err => {
      if(err)
        reject(err)
      resolve()
    })
  })
})
module.exports = generateOutput
