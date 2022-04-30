import { execaSync } from 'execa'
import conf from '../config/commandString.js'
import { log } from '../util/logger.js'

export class npmConfig {
  constructor(range) {
    this.range = range || 'global'
    this.config = {}
    this.init()
  }

  init() {
    try {
      if(this.range === 'global') {
        const { stdout } = execaSync(conf.confList + ' --json')
        this.config = JSON.parse(stdout)
        log.success('初始化成功！')
      }
    } catch(e) {
      log.error('init config is failure')
    }
  }
}

export var configInstance = new npmConfig()
