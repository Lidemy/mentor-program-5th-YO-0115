function reverse(str) {
	let resolve = ''
	for(let i=str.length-1; i>=0; i--) {
		resolve += str[i]
	}
	console.log(resolve)
}

reverse('hello');