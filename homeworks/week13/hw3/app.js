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

document.querySelector('.game__list').addEventListener('click', (e) => {
  if (e.target.classList.contains('game__list-name')) {
    const gameName = e.target.innerText
    changeGame(gameName)
  }
})

function changeGame(gameName) {
  document.querySelector('.game__title').innerText = gameName
  document.querySelector('.streams').innerHTML = ''

  getStreams(gameName).then((data) => {
    const { streams } = data
    for (const stream of streams) {
      appendStream(stream)
    }
  })
    .catch((err) => console.log(err))
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

async function getGamesData() {
  const response = await fetch(`${API_URL}/games/top?limit=5`, {
    headers: new Headers({
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    })
  })

  let data
  try {
    data = await response.json()
  } catch (error) {
    console.log(error)
  }

  return data
}

async function getGames() {
  let data
  try {
    data = await getGamesData()
  } catch (error) {
    console.log(error)
  }

  const games = data.top
  for (const game of games) {
    const element = document.createElement('li')
    element.classList.add('game__list-name')
    element.innerText = game.game.name
    document.querySelector('.game__list').appendChild(element)
  }

  changeGame(games[0].game.name)
}

getGames()

function getStreams(gameName) {
  return fetch(`${API_URL}/streams?game=${encodeURIComponent(gameName)}`, {
    headers: new Headers({
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    })
  }).then((res) => res.json())
    .catch((error) => console.log('err: ', error))
}
