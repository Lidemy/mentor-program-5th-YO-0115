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
  const temp = lines[0].split(' ')
  const n = Number(temp[0])
  const m = Number(temp[1])
  for (let i = n; i <= m; i++) {
    if (i < 10) {
      console.log(i)
    } else if (i === narcissistic(i)) {
      console.log(i)
    }
  }
}

function digitsCount(n) {
  let result = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    result++
  }
  return result
}

function narcissistic(n) {
  const digits = digitsCount(n)
  let sum = 0
  while (n !== 0) {
    const num = n % 10
    n = Math.floor(n / 10)
    sum += num ** digits
  }
  return sum
}
