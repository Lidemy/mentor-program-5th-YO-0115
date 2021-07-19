/* eslint-disable */
import { getComments, addComments } from './api'
import { addCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getForm } from './templates'
import $ from 'jquery'

export function init(options) {
  let API = ''
  let siteKey = ''
  let containerElement = null
  let commentDOM = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  API = options.API

  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-form`
  commentsSelector = `.${commentsClassName}`
  formSelector = '.' + formClassName

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()

    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)

    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }

    addComments(API, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }

      nicknameDOM.val('')
      contentDOM.val('')

      addCommentToDOM(commentDOM, newCommentData, true)
    })
  })

  function getNewComments() {
    const commentsDOM = $(commentsSelector)

    $(`.${loadMoreClassName}`).hide()
    if (isEnd) {
      return
    }

    getComments(API, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }

      const comments = data.discussions
      for (let comment of comments) {
        addCommentToDOM(commentsDOM, comment)
      }

      const { length } = comments
      if (length <= 5) {
        isEnd = true
        $(`.${loadMoreClassName}`).hide()
        $(commentsSelector).append('<div class="loading">沒有了喔</div>')
      } else {
        lastId = comments[length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
