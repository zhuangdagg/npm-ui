import { execa, execaSync } from 'execa'
try {
  let res = execaSync('npm --version')
  console.log(res)
} catch (err) {
  console.log('\n------------\n')
  console.log(err)
}

