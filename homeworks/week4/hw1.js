const request = require('request')

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

request(
  `${API_ENDPOINT}/books?_limit=10`,
  (error, response, body) => {
    if (error) return console.log('操作失敗', error)
    let data
    try {
      data = JSON.parse(body)
    } catch (error) {
      console.log(error)
      return
    }
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].id, data[i].name)
    }
  }
)
