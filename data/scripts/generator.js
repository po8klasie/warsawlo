const fs = require('fs-extra')

module.exports = class Generator{
  constructor(config){
    this.prepareTmpDir()
  }
  prepareTmpDir(){
    return fs.emptyDir('./tmp')
  }
}
