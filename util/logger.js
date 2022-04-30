import chalk from 'chalk'

export function log(msg, title, type) {
  let color = {
    success: chalk.bold.green,
    warn: chalk.bold.yellow,
    error: chalk.bold.red,
    info: chalk.bold.white
  }
  console.log(color[type](msg))
}

let attr = {};
['success', 'warn', 'info', 'error'].forEach(type => {
  attr[type] = (msg, title) => {
      log(msg, title, type)
    }
})
Object.setPrototypeOf(log, attr)