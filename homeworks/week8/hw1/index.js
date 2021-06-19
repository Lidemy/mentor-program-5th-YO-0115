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
      switch (data) {
        case 'FIRST':
          renderPrize('prize-first', '恭喜你中頭獎了！日本東京來回雙人遊！')
          break
        case 'SECOND':
          renderPrize('prize-second', '二獎！90 吋電視一台！')
          break
        case 'THIRD':
          renderPrize('prize-third', '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！')
          break
        case 'NONE':
          renderPrize('prize-none', '銘謝惠顧')
          break
        default:
          renderPrize('prize-boom', '系統不穩定，請再試一次')
      }
    } else {
      alert(errorMessage)
    }

    request.onerror = function() {
      alert(errorMessage)
    }
  }
  request.send()
})

function renderPrize(classname, text) {
  const div = document.createElement('div')
  div.classList.add(classname)
  div.innerHTML = ` 
      <div class="card__prize">
      <p class="card__prize-titel">${text}</p>
      <button class="btn btn__prize" onclick="javascript:window.location.reload()">我要抽獎</button>
      </div>
    `
  const section = document.querySelector('.section')
  const bg = document.querySelector('.bg')
  section.appendChild(div)
  bg.classList.add('hide')
}
