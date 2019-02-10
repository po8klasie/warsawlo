const fs = require('fs')

fs.readdirSync('./src').forEach(filename => {
  let school = {}
  try{
  school = JSON.parse(fs.readFileSync(`./src/${filename}`))
  }catch(e){
    console.log(filename)
    process.exit()
  }
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
  if(school.openDays){
    school.openDays.map(day => {
      if(day.for.trim() === 'dla uczniów klas III gimnazjum'){
        day.for = 'GIM'
      }else if(day.for.trim() === 'dla uczniów klas 8 SP'){
        day.for = 'SP'
      }else if(day.for.trim().length !== 0 && day.for.trim() !== 'GIM' && day.for.trim() !== 'SP'){
        console.log(school.name.full)
      }
    })
  }
  fs.writeFileSync(`./src/${filename}`, JSON.stringify(school, null, "\t"))
})
