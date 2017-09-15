#!/usr/bin/env node

const spawn = require('child_process').spawn

const commands = process.argv.slice(2)

const children = []

function main() {
  return runAllCommandsUntilOneExits(commands)
}


function runAllCommandsUntilOneExits(commands) {
  return Promise
    .race(commands.map(runCommand))
    .catch(err => {
      console.error('An error occurred:')
      console.error(err)
      process.exit(1)
    })
    .then(() => {
      children.forEach(child => child.kill())
    })
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', command], { stdio: 'inherit' })
    child.on('exit', (code, signal) => {
      if (code === 0 || signal === 'SIGINT' || signal === 'SIGTERM') {
        resolve()
      } else {
        reject(code || signal)
      }
    })
    children.push(child)
  })
}

main()
