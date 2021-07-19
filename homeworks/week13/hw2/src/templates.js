export const cssTemplate = `
  body {
    background: black;
  }
  .wrapper {
    padding: 10% 10%;
  }
  .container {
    padding: 24px 20px;
    border-radius: 3px;
    box-shadow: 1px 1px 10px 4px white;
    color: white;
    max-width: 900px;
  }
  .form-control {
    border : none;
    box-shadow: none;
  }
  .form-control:focus {
    border: none;
    box-shadow: none;
  }
  .btn,
  .btn:focus {
    background: white;
    border: none;
    box-shadow: none;
  }
  .btn:hover {
    background: black;
    color: white;
    box-shadow: 1px 1px 5px 3px white; 
  }
  .comments {
    margin: 16px 8px;
  }
  .comment__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid white;
  }
  .card-header {
    color: gold;
    font-size: 1.25rem;
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .comment__time {
    padding: 8px 16px;
    color: #B2B0B0;
    font-size: 10px;
  }
  .card-body {
    margin-bottom: 1.8rem;
  }
  .card-body p{
    white-space: pre-line;
    word-break: break-word;
    line-height: 1.8rem;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .load-more {
    width: 30%;
  }
`

export function getForm(className, commentsClassName) {
  return ` 
    <div class="row">
      <form class="${className}">
        <div class="mb-3 form__title">
          <label class="form-label">暱稱</label>
          <input name="nickname" type="text" class="form-control" placeholder="你誰 ?">
        </div>
        <div class="mb-3 form__title">
          <label class="form-label">留言</label>
          <textarea name="content" class="form-control" rows="3" placeholder="想說啥 ?"></textarea>
        </div>
        <button type="submit" class="btn">新增留言</button>
      </form>
      <div class="${commentsClassName}">
      </div>
    </div>
  `
}

export function getLoadMoreButton(className) {
  return `<div class="loading"><button type="submit" class="${className} btn load-more">載入更多</button></div>`
}
