/* eslint-disable */
import $ from 'jquery'

export function getComments(API, siteKey, before, cb) {
  let url = `${API}/api_comments.php?site_key=${siteKey}`

  if (before) {
    url += `&before=${before}`
  }

  $.ajax({
    url
  }).done((data) => {
    cb(data)
  })
}

export function addComments(API, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${API}/api_add_comments.php`,
    data
  }).done((data) => {
    cb(data)
  })
}
