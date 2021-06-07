const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage = '系統不穩定，請再試一次'

document.querySelector('.btn').addEventListener('click', (e) => {
  const request = new XMLHttpRequest()
  request.open('GET', apiUrl, true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.responseText).prize
      } catch (err) {
        alert(errorMessage)
        return
      }
      getPrize(data)
    } else {
      alert(errorMessage)
    }

    request.onerror = function() {
      alert(errorMessage)
    }
  }
  request.send()
})

function getPrize(data) {
  const div = document.createElement('div')

  if (data === 'FIRST') {
    div.classList.add('prize-first')
    div.innerHTML = ` 
      <div class="card__prize">
      <p class="card__prize-titel">恭喜你中頭獎了！日本東京來回雙人遊！</p>
      <button class="btn btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    `
  } else if (data === 'SECOND') {
    div.classList.add('prize-second')
    div.innerHTML = ` 
      <div class="card__prize">
      <p class="card__prize-titel">二獎！90 吋電視一台！</p>
      <button class="btn btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    `
  } else if (data === 'THIRD') {
    div.classList.add('prize-third')
    div.innerHTML = ` 
      <div class="card__prize">
      <p class="card__prize-titel">恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</p>
      <button class="btn btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    `
  } else if (data === 'NONE') {
    div.classList.add('prize-none')
    div.innerHTML = ` 
      <div class="card__prize">
      <p class="card__prize-titel">銘謝惠顧</p>
      <button class="btn btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    `
  } else {
    div.classList.add('prize-boom')
    div.innerHTML = ` 
      <div class="card__prize">
      <p class="card__prize-titel">系統不穩定，請再試一次</p>
      <button class="btn btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    `
  }
  const section = document.querySelector('.section')
  const bg = document.querySelector('.bg')
  section.appendChild(div)
  bg.classList.add('hide')
}
