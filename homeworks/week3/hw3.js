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
  for (let i = 1; i <= lines[0]; i++) {
    if (Number(lines[i]) === 1) {
      console.log('Composite')
    } else {
      console.log(isPrime(Number(lines[i])))
    }
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return 'Composite'
  }
  return 'Prime'
}
