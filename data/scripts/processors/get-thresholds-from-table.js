const es = require('event-stream')
const formatRows = rows => {
  let schoolnames = []
  return rows.reduce((schools, row, i) => {
    let schoolname = row[1]
    let profile = row[2]
    let threshold = row[3]

    if(i == 0 || !schoolname) return schools
    if (!schoolnames.includes(schoolname)) {
      schoolnames.push(schoolname)
        schools.push({
          name: schoolname,
          profiles: []
        })
      }
    schools.filter(school => school.name == schoolname)[0].profiles.push([profile, threshold])
    return schools
}, [])}
const getThresholdsFromTable = rows => es.map((school, callback) => {
  const data = formatRows(rows)
  const matching = data.filter(dataSchool => dataSchool.name.toUpperCase() == school.name.full)
  if(matching.length > 0){
    let availableSubjects = new Set()
    let pointsRange = [200,0]
    school.profiles = {}
    school.profiles.detailed = matching[0].profiles.map(profile => {
      let subjects = profile[0].split('] ')[1]
      subjects = subjects.slice(0, subjects.indexOf('(')).trim().split('-')
      subjects.forEach(subject => availableSubjects.add(subject))
      let threshold = parseFloat(profile[1].replace(',', '.'))
      if(threshold > pointsRange[1]){
        pointsRange[1] = threshold
      }else if(threshold < pointsRange[0]){
        pointsRange[0] = threshold
      }
      return [subjects, threshold]
    })
    school.profiles['2018'].overview = {
      availableSubjects:  Array.from(availableSubjects),
      pointsRange
    }
  }
  callback(null, school)
})
module.exports = getThresholdsFromTable
