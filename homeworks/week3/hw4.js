const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const str = lines[0].split('').reverse().join('')
  if (str === lines[0]) {
    console.log('True')
  } else {
    console.log('False')
  }
}
