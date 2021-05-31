// 轉譯
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
// input 按下 enter 增加項目
document.querySelector('.list__input').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const msg = document.querySelector('.list__input').value
    if (msg.trim()) {
      const li = document.createElement('li')
      li.classList.add('list__item')
      li.innerHTML = ` 
        <button class="btn item__checkbox">
          <div class="icon-check"></div>
        </button>
        <p class="item__content">${escapeHtml(msg)}</p>
        <button class="item__delete">del</button>
      `
      document.querySelector('.list').appendChild(li)
      document.querySelector('.list__input').value = ''
    } else {
      alert('沒事做嗎?')
      e.preventDefault()
    }
  }
})

document.querySelector('.list').addEventListener('click', (e) => {
  const { target } = e
  // 按下 del 刪除
  if (target.classList.contains('item__delete')) {
    target.parentNode.remove()
    return
  }

  // 勾選任務
  const box = e.target.closest('.item__checkbox')
  const icon = e.target.closest('.icon-check')
  if (box) {
    box.classList.remove('item__checkbox')
    box.parentNode.classList.add('finished')
  } else if (icon) {
    icon.parentNode.classList.add('item__checkbox')
    icon.parentNode.parentNode.classList.remove('finished')
  }
})
