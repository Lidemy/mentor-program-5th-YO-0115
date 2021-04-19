function join(arr, concatStr) {
	let resolve = ''
	for(let i=0; i<arr.length-1; i++) {
		resolve += arr[i] + concatStr
	}
	return resolve + arr[arr.length-1]
}

function repeat(str, times) {
  	let resolve = ''
  	for(let i=1; i<=times; i++) {
  		resolve += str
  }
  return resolve
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
