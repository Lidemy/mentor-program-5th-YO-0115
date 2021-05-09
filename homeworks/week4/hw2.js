const request = require('request')

// node.js 內建模組
const process = require('process')

const arg = process.argv[2]
const str1 = process.argv[3]
const str2 = process.argv[4]

if (arg === 'list') {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
      if (error) return console.log('操作失敗', error)
      const obj = JSON.parse(body)

      for (let i = 0; i < obj.length; i++) {
        console.log(obj[i].id, obj[i].name)
      }
    }
  )
}

if (arg === 'read') {
  request(
    'https://lidemy-book-store.herokuapp.com/books',
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
      if (error) return console.log('操作失敗', error)
      const obj = JSON.parse(body)

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].id === str1) return console.log(obj[i].name)
      }
    }
  )
}

if (arg === 'delete') {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${str1}`,
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
      if (error) return console.log('操作失敗', error)
      console.log(body)
    }
  )
}

if (arg === 'create') {
  request.post(
    'https://lidemy-book-store.herokuapp.com/books',
    {
      form: {
        name: `${str1}`
      }
    },
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
      if (error) return console.log('操作失敗', error)
      console.log(body)
    }
  )
}

if (arg === 'update') {
  request.patch(
    `https://lidemy-book-store.herokuapp.com/books/${str1}`,
    {
      form: {
        name: `${str2}`
      }
    },
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode >= 300) return console.log('stausCode', response.statusCode)
      if (error) return console.log('操作失敗', error)
      console.log(body)
    }
  )
}
