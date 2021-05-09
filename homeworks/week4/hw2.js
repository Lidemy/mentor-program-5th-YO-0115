const request = require('request')

// node.js 內建模組
const process = require('process')

const action = process.argv[2]
const params = process.argv[3]
const params2 = process.argv[4]

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

switch (action) {
  case 'list':
    listBooks()
    break
  case 'read':
    readBook(params)
    break
  case 'delete':
    deleteBook(params)
    break
  case 'create':
    createBook(params)
    break
  case 'update':
    updateBook(params, params2)
    break
  default:
    console.log('Available commands: list, read, delete, create and update')
}

function listBooks() {
  request(
    `${API_ENDPOINT}/books?_limit=20`,
    (error, response, body) => {
      if (error) return console.log('操作失敗', error)

      let data
      try {
        data = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }

      for (let i = 0; i < data.length; i++) {
        console.log(data[i].id, data[i].name)
      }
    }
  )
}

function readBook(id) {
  request(
    `${API_ENDPOINT}/books/${id}`,
    (error, response, body) => {
      if (error) return console.log('操作失敗', error)

      let data
      try {
        data = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      console.log(data)
    }
  )
}

function deleteBook(id) {
  request.delete(
    `${API_ENDPOINT}/books/${id}`,
    (error, response, body) => {
      if (error) return console.log('操作失敗', error)
      console.log('刪除成功')
    }
  )
}

function createBook(name) {
  request.post({
    url: `${API_ENDPOINT}/books`,
    form: {
      name
    }
  },
  (error, response, body) => {
    if (error) return console.log('操作失敗', error)
    console.log('新增成功')
  })
}

function updateBook(id, name) {
  request.patch({
    url: `${API_ENDPOINT}/books/${id}`,
    form: {
      name
    }
  },
  (error, response, body) => {
    if (error) return console.log('操作失敗', error)
    console.log('更新成功')
  })
}
