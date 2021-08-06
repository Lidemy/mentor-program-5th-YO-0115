下列程式碼會輸出什麼 ?
``` js
var a = 1
function fn(){
  console.log(a) // 1. undefined
  var a = 5
  console.log(a) // 2. 5
  a++
  var a
  fn2()
  console.log(a) // 4. 20
  function fn2(){
    console.log(a) // 3. 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 5. 1
a = 10
console.log(a) // 6. 10
console.log(b) // 7. 100
```


在開始執行程式碼前，JS 引擎會先把要執行的檔案全部掃過一次，並紀錄變數、參數、函式各自的記憶體位置，而後再從頭一行一行的執行程式碼

### 執行順序 (下列以寬鬆模式來舉例)
```
// 首先產生一個執行環境，然後開始執行程式碼

global EC
VO {
  a: undefined
  fn: function
}
```

```
// 當程式碼來到了 fn()，進入 fn，生成執行環境，開始執行

fn EC
AO {
  a: undefined
  fn2: function
}

第一個 console 因為此時的 a 尚未賦值，所以是 undefined
```
```
// 程式碼來到了 var = 5

fn EC
AO {
  a: 5
  fn2: function
}

第二個 console，a = 5
```
```
// a++
// var a (沒有做事)

fn EC
AO {
  a: 6
  fn2: function
}
```
```
// fun2()，進入 fun2，並生成執行環境，開始執行

fn2 EC
AO {

}

第三個 console，因為 fun2 沒有宣告變數 a，所以往上一層找，找到目前 a = 6
```
```
// a = 20
// b = 100

fn EC
AO {
  a: 20
  fn2: function
}

global EC
VO {
  a: undefined
  fn: function
  b: 100
}

因為 fn2 沒有宣告 a，所以當賦值給 a 時，
會向上搜尋 a 的所在位置，並改變了 fn 的 a。

而 fn2 對 b 賦值也是一樣的道理，
先往上一層找，fn 找不到，便往 global 找，
但 global 也沒有宣告變數 b，所以就直接在 global 宣告變數 b 並賦值為 100
```
``` 
// 執行完 fn2 後

fn EC
AO {
  a: 20
  fn2: function
}

此時 fn 的 a 已被改變為 20，所以第四個 console 為 20
```
```
// fn 執行完畢，回到 global

global EC
VO {
  a: 1
  fn: function
  b: 100
}

第五個 console，找到了全域變數 a 並賦值為 1
```
```
// a = 10

global EC
VO {
  a: 10
  fn: function
  b: 100
}

第六個 console 為 10
```
```
global EC
VO {
  a: 10
  fn: function
  b: 100
}

第七個 console，因為在 fn2 的時候有宣告了一個全域變數 b，
所以值為 100
```
