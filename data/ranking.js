const fs = require('fs')
const fse = require('fs-extra')
const Fuse = require('fuse.js')
const schools = []
const notFound = []
fs.readdirSync('./src').forEach(filename => {
  schools.push({
    name: filename.replace('.json', ''),
    no: filename.replace('.json', '').trim().split(' ')[0]
  })
  })

const ranking = fse.readJSONSync('./resources/ranking.json')

ranking.forEach(school => {
  let noFromRanking = school.nazwa.trim().split(' ')[0]
  let sql = schools.filter(a => a.no === noFromRanking)[0]
  if(!sql){
    console.log(`Not found - ${school.nazwa}`);
    return
  }
  
  fse.readJson(`./src/${sql.name}.json`).then(file => {
  let s = file
  s.ranking = {
    archive: {
      '2016': school['2016'] === '-' ? null : school['2016'],
      '2017': school['2017'] === '-' ? null : school['2017'],
      '2018': school['2018'] === '-' ? null : school['2018'],
    },
    exam: {
      basic: school["matura-podstawa"],
      extended: school["matura-podstawa"]
    },
    contests: school["olimpiady"],
    examAverage: school["wsk"],
    label: null,
    place: school.miejsce
  }
  if(school.znak.includes('gold')){
    s.ranking.label = 'gold'
  }else if(school.znak.includes('silver')){
    s.ranking.label = 'silver'
  }else if(school.znak.includes('brown')){
    s.ranking.label = 'bronze'
  }
  fse.writeJson(`./src/${sql.name}.json`, s, {
    spaces: '\t'
  }).then(() => {
  console.log('ok!')
  }).catch(err => {
  console.error(err)
})
})
})