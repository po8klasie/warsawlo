const generateConfig = require('./generate-config')
const fs = require('fs-extra')
const chalk = require('chalk')
const log = console.log
const ProgressBar = require('progress');
const fetchSchools = require('./fetch-schools')
const _ = require('highland')
const processors = require('./processors')
generateConfig().then(async (config) => {
  log('\n Starting...')

  await fs.emptyDir('./backup')
  await fs.copy('./src', './backup')
  log(chalk.green('success'), 'Created backup directory')

  if(config.preserve === false){
    await fs.emptyDir('./src')
    log(chalk.green('success'), 'Cleaned src directory')
    const { stream } = await fetchSchools()
    log(chalk.green('success'), 'Downloaded schools data')

    const runProcess = (p) => _.flatMap(_.wrapCallback((school, cb) => {
      p(school).then(result => cb(null, result)).catch(err => cb(err))
    }))
    const processes = [
      processors.format,
      ...config.processors.map(p => processors[p])
    ].map(runProcess)
    log(chalk.blue('info'), 'Running customized processes')
    _(stream).through(...processes)
    .filter(school => school.name && school.nam.full
    )
    .each(school => {
      fs.writeJson(`./src/${school.name.full}.json`, school).then(() => {
        log(chalk.green('success'), `Saved: ${school.name.full}`)
        push(null, school)
        next()
      }).catch(err => {
        push(err)
        next()
      })
    }).done(() => log(chalk.green('success'), 'Done!'))

  }else if(config.preserve === 'changes'){
      //TODO
  }
}).catch(log)
