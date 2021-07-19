const API_URL = 'https://api.twitch.tv/kraken'
const CLIENT_ID = 'ngq7mwdydvhjs7cfng2c8j80tmm7rk'
const STREAM_TEMPLATE = ` <div class="stream">
  <img src="$preview" />
  <div class="stream__data">
    <div class="stream__data-avatar">
      <img src= "$logo" />
    </div>
    <div class="stream__data-intro">
      <div class="intro__title">
        $title
      </div>
      <div class="intro__channel">
        $name
      </div>
    </div>
  </div>
</div>`

// 更改 top 遊戲列表
getGames((games) => {
  for (const game of games) {
    const element = document.createElement('li')
    element.classList.add('game__list-name')
    element.innerText = game.game.name
    document.querySelector('.game__list').appendChild(element)
  }

  // 顯示第一個遊戲實況名稱
  changeGame(games[0].game.name)
})

document.querySelector('.game__list').addEventListener('click', (e) => {
  if (e.target.classList.contains('game__list-name')) {
    const gameName = e.target.innerText
    changeGame(gameName)
  }
})

function changeGame(gameName) {
  document.querySelector('.game__title').innerText = gameName
  document.querySelector('.streams').innerHTML = ''

  getStreams(gameName, (streams) => {
    for (const stream of streams) {
      appendStream(stream)
    }
  })
}

function appendStream(stream) {
  const element = document.createElement('div')
  document.querySelector('.streams').appendChild(element)
  element.outerHTML = STREAM_TEMPLATE
    .replace('$preview', stream.preview.large)
    .replace('$logo', stream.channel.logo)
    .replace('$title', stream.channel.status)
    .replace('$name', stream.channel.name)
}

function getGamesData() {
  return fetch(`${API_URL}/games/top?limit=5`, {
    headers: new Headers({
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    })
  }).then((res) => res.json())
}

async function getGames(cb) {
  let games
  try {
    games = await getGamesData().then((json) => json.top)
  } catch (err) {
    console.log('err: ', err)
  }
  cb(games)
}

function getStreams(gameName, cb) {
  fetch(`${API_URL}/streams?game=${encodeURIComponent(gameName)}`, {
    headers: new Headers({
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    })
  }).then((res) => res.json())
    .then((json) => cb(json.streams))
    .catch((error) => console.log('err: ', error))
}
