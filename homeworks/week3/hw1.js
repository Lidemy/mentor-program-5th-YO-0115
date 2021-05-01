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
  for (let i = 1; i <= lines; i++) {
    let result = ''
    for (let j = 1; j <= i; j++) {
      result += '*'
    }
    console.log(result)
  }
}
