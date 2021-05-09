const request = require('request')

request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'ngq7mwdydvhjs7cfng2c8j80tmm7rk'
    }
  },
  (error, response, body) => {
    if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
    if (error) return console.log('操作失敗', error)
    const obj = JSON.parse(body)

    for (let i = 0; i < obj.top.length; i++) {
      console.log(obj.top[i].viewers, obj.top[i].game.name)
    }
  }
)
