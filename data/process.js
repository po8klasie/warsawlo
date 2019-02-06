const fs = require('fs')

fs.readdirSync('./src').forEach(filename => {
  const school = JSON.parse(fs.readFileSync(`./src/${filename}`))
  // if(school.meta.public === true){
  //   school.meta.public = 'yes'
  // }else if(school.meta.public === false){
  //   school.meta.public = 'no'
  // }
  //
  // if(school.profiles){
  //   school.thresholds = {
  //     2018: school.profiles
  //   }
  //   delete school.profiles
  // }
  // if(!school.name.nicks){
  //   school.name.nicks = []
  // }
  if(school.thresholds){
    school.thresholds['2018'].detailed = school.thresholds['2018'].detailed.map(t => ({
      extensions: [...t[0]],
      threshold: t[1]
    }))
  }
  fs.writeFileSync(`./src/${filename}`, JSON.stringify(school, null, "\t"))
})
