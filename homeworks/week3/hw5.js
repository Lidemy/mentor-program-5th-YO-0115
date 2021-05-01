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
  const arr = []
  for (let i = 1; i < lines.length; i++) {
    arr.push(lines[i].split(' '))
  }

  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i][2]) === 1) {
      if (BigInt(arr[i][0]) > BigInt(arr[i][1])) {
        console.log('A')
      } else if (BigInt(arr[i][0]) < BigInt(arr[i][1])) {
        console.log('B')
      } else {
        console.log('DRAW')
      }
    }

    if (Number(arr[i][2]) === -1) {
      if (BigInt(arr[i][0]) < BigInt(arr[i][1])) {
        console.log('A')
      } else if (BigInt(arr[i][0]) > BigInt(arr[i][1])) {
        console.log('B')
      } else {
        console.log('DRAW')
      }
    }
  }
}
