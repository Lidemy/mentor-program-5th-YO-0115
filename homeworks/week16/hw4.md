下列程式碼會輸出什麼 ?
``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

> this 的值，只會跟怎麼呼叫有關，和它建立在哪裡無關 (箭頭函式除外)

在 this 的判斷上有一個小撇步，那就是我們自行將呼叫的函式轉換成 `call`的形式來看。

舉例來說:
`obj.inner.hello()` 可以看成 `obj.inner.hello.call(obj.inner)`，而 call 的第一個參數便是 this 的值，`obj.inner` 的 value 是 2，所以這題答案就是 2。

`obj2.hello() => obj2.hello.call(obj2)`，obj2 = obj.inner，所以 value = 2

`hello() => hello.call()`，因為沒有任何參數傳入，所以是 undefined