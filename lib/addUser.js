
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
      socket.emit('login', { data: prompt, stdout: prompt})
      socket.once('OTPassword', (arg) => {
        let { OTPassword } = arg
        writeIn(user, OTPassword)
      })
    } else if(success.test(prompt)) {
      socket.emit('login', { data: prompt, stdout: prompt })
    }
  })

  let prompt = ''
  user.stderr.on('data', (err) => {
    prompt += err
  })
  user.stderr.on('end', (arg) => {
    socket.emit('loginError', { stderr: prompt.toString('utf8')})
    process.stderr.write(prompt)
    prompt = ''
  })

  user.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}


function writeIn(child, text) {
  child.stdin.write(text + '\n')
  process.stdout.write(text + '\n')
}