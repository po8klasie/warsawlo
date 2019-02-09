const hyperquest = require('hyperquest')
const es = require('event-stream')
const JSONStream = require('JSONStream')
const fs = require('fs')
const Rx = require('rxjs')
const _ = require('highland')
const apiUrl = 'https://api.um.warszawa.pl/api/action/datastore_search/?resource_id=1cae4865-bb17-4944-a222-0d0cdc377951'

module.exports = () => new Promise((resolve, reject) => {
  let url = `${apiUrl}&filters={`
  url += `"${encodeURIComponent("Typ placówki")}":"${encodeURIComponent("Liceum ogólnokształcące")}",`
  url += `"${encodeURIComponent("Kategoria uczniów")}":"${encodeURIComponent('Dzieci lub młodzież')}"`
  url += '}'

  hyperquest(url)
  .pipe(JSONStream.parse('result.total'))
  .pipe(es.mapSync(total => {
    let numberOfRequests = Math.ceil(total / 100)
    let streamsArray = []
    let missingData = []
    for(let i=0; i < numberOfRequests; i++){
      streamsArray.push(
        _(hyperquest(`${url}&offset=${i*100}`))
        .through(JSONStream.parse('result.records.*'))
        .map(school => {
          if(!"Ulica" in school | !"Nr domu" in school)
          missingData.push(school['Nazwa placówki'])
          return school
        })
      )
    }
    console.log(streamsArray)
    resolve({stream: _(streamsArray).merge(), missingData})
  }))
})
