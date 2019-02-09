const program = require('commander')

program
  .version('0.0.1')
  .option('-g, --generate-base', 'Generate base files')
  .option('-r, --reset', 'Resets')
  .option('-o, --generate-output', 'Generate output file')
  .parse(process.argv)

if(program.generateBase){
  require('./generate-base')().catch(err => console.log(err))
}
if(program.reset){
  require('./reset')().catch(err => console.log(err))
}
if(program.generateOutput){
  require('./generate-output')().catch(err => console.log(err))
}
