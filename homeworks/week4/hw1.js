const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
    if (error) return console.log('操作失敗', error)
    const obj = JSON.parse(body)
    for (let i = 0; i < obj.length; i++) {
      console.log(obj[i].id, obj[i].name)
    }
  }
)
