const request = require('request')
const process = require('process')

const name = process.argv[2]

const API_ENDPOINT = 'https://restcountries.eu/rest/v2'

request(
  `${API_ENDPOINT}/name/${name}`,
  (error, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      let data
      try {
        data = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }

      for (let i = 0; i < data.length; i++) {
        console.log('================')
        console.log(`國家 : ${data[i].name}`)
        console.log(`首都 : ${data[i].capital}`)
        console.log(`貨幣 : ${data[i].currencies[0].code}`)
        console.log(`國碼 : ${data[i].callingCodes[0]}`)
      }
    } else {
      console.log('「找不到國家資訊」。')
    }
  }
)
