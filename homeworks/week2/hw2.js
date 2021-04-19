function capitalize(str) {
	let resolve = ''
	let firstWord = str[0]
	resolve = firstWord.toUpperCase()

  for(let i=1; i<str.length; i++){
  	resolve += str[i]
  }
  return resolve
}

console.log(capitalize('hello'));
