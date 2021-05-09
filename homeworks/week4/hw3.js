const request = require('request')
const process = require('process')

const country = process.argv[2]

request(
  `https://restcountries.eu/rest/v2/name/${country}`,
  (error, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      const obj = JSON.parse(body)

      for (let i = 0; i < obj.length; i++) {
        console.log(
        `國家 : ${obj[i].name} \n首都 : ${obj[i].capital} \n貨幣 : ${obj[i].currencies[0].code} \n國碼 : ${obj[i].callingCodes[0]}`
        )
        if (i === obj.length - 1) return
        console.log('================')
      }
    } else {
      console.log('「找不到國家資訊」。')
    }
  }
)
