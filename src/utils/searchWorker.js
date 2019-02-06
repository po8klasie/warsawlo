/* eslint-disable */
import * as Comlink from 'comlinkjs'
import Engine from 'utils/engine'

class MyClass {
  constructor(data){
    this.engine = new Engine(data)
  }
  search = (query, filters) => this.engine.search(query, filters)
}
Comlink.expose(MyClass, self);
