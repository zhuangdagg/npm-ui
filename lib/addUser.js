
import spawn from 'cross-spawn'

export function login(params, socket) {
  let { username, password, email } = params
  let success = new RegExp(username)
  const user = spawn('npm', ['addUser'])

  user.stdout.on('data', (buf) => {
    let prompt = buf.toString('utf8')
    process.stdout.write(prompt)
    if('Username: ' === prompt) {
      writeIn(user, username)
    } else if (/Password/.test(prompt)) {
      writeIn(user, password)
    } else if (/Email/.test(prompt)) {
      writeIn(user, email)
    } else if (/authenticator/.test(prompt)) {
      socket.emit('OTPassword', { type: 'next'})
      socket.once('OTPassword', (arg) => {
        let { OTPassword } = arg
        writeIn(user, OTPassword)
      })
    } else if(success.test(prompt)) {
      socket.emit('login', { msg: prompt })
    }
  })

  user.stderr.on('data', (err) => {
    let prompt = err.toString('utf8')
    console.log({err: prompt})
  })

  user.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}


function writeIn(child, text) {
  child.stdin.write(text + '\n')
  process.stdout.write(text + '\n')
}