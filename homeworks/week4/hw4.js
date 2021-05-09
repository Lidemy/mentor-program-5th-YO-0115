const request = require('request')

const BASE_URL = 'https://api.twitch.tv/kraken'

request({
  method: 'GET',
  url: `${BASE_URL}/games/top`,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'ngq7mwdydvhjs7cfng2c8j80tmm7rk'
  }
}, (error, response, body) => {
  if (error) return console.log('操作失敗', error)

  let data
  try {
    data = JSON.parse(body)
  } catch (error) {
    console.log(error)
    return
  }

  const games = data.top
  for (let i = 0; i < games.length; i++) {
    console.log(games[i].viewers, games[i].game.name)
  }
})
