function capitalize(str) {
	let result = ''
	let firstWord = str[0]
	result = firstWord.toUpperCase()

  for(let i=1; i<str.length; i++){
  	result += str[i]
  }
  return result
}

console.log(capitalize('hello'));
