const inquirer = require('inquirer')
const Rx = require('rxjs')
const emoji = require('node-emoji')
const prompts = new Rx.Subject()

const answersMappings = {
  core: {
    'Keep existing files core': 'all',
    'Download new data and add preserved changes': 'changes'
  },
  processors: {
    'Detailed location': 'location',
    'Thresholds': 'thresholds',
    'Open days dates': 'events'
  }
}
answersMappings.core['Just download new data'] = false

module.exports = () => new Promise((resolve, reject) => {

  const config = {
    preserve: 'all',
    processors: []
  }

  const askForProcessors = () => {
    prompts.next({
      type: 'checkbox',
      name: `processors`,
      message: `What would you like to add to files?`,
      choices: Object.keys(answersMappings.processors).map(q => ` ${q}`)
    })
  }

  inquirer.prompt(prompts).ui.process.subscribe(({name, answer}) => {
    switch(name){
      case 'core':
        config.preserve = answersMappings.core[answer]
        if(config.preserve === false){
          prompts.next({
            type: 'confirm',
            name: `confirm-no-preserve`,
            message: `Are you sure about erasing files core?`,
            default: false
          })
        }else{
          askForProcessors()
        }
        break
      case 'confirm-no-preserve':
        if(!answer){
          prompts.complete()
          reject()
          return
        }
        askForProcessors()
      case 'processors':
      console.log(answer)
        config.processors = Array.isArray(answer) ? answer.map(a => answersMappings.processors[a.trim()]) : []
        prompts.next({
          type: 'confirm',
          name: `confirm-run`,
          message: `Are you sure?`,
          default: false
        })
        break
      case 'confirm-run':
      prompts.complete()
        if(answer === true){
          resolve(config)
        }
        reject()
    }
  })
  prompts.next({
    type: 'list',
    name: `core`,
    message: `Do you want to use existing files core?`,
    choices: Object.keys(answersMappings.core)
  })
})
// console.log(Object.keys(answersMappings.core))
