export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}

export function escape(toOutput) {
  return toOutput.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27')
    .replace(/\//g, '&#x2F')
}

export function addCommentToDOM(container, comment, isPrepend) {
  if (!comment.created_at) {
    const present = new Date()
    const y = present.toLocaleDateString().slice(0, 4)
    const m = (present.getMonth() + 1 < 10 ? '0' : '') + (present.getMonth() + 1)
    const d = (present.getDate() < 10 ? '0' : '') + present.getDate()
    const time = present.toTimeString().slice(0, 8)
    comment.created_at = `${y}-${m}-${d} ${time}`
  }
  const html = `
    <div class="comment__head">
      <div class="card-header">
      ${escape(comment.nickname)}
      </div>
      <div class="comment__time">
      ${comment.created_at}
      </div>
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${escape(comment.content)}</p>
      </blockquote>
    </div>
   `

  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}
