## hw1：好多星星
我在寫這題的時候卡了一陣子，一直以為是自己條件下錯了或是 console 錯地方
``` js
function solve(lines) {
  let result = ''
  for(let i=1; i<=lines; i++) {
    for(let j=1; j<=i; j++){
      result += "*"
    }
    console.log(result)
  }
}
```
後來發現原來是變數下錯地方
``` js
function solve(lines) {
  for(let i=1; i<=lines; i++) {
    let result = ''
    for(let j=1; j<=i; j++){
      result += "*"
    }
    console.log(result)
  }
}
```
有嘗試用 debugger 去看程式碼，但不懂的是為甚麼變數在外面，會記錄 '*'，所以會越加越多，而放在迴圈裡每一圈都會重新來過，直到我在討論區上寫好問題準備要發文的時候，突然就懂了。
## hw2：水仙花數
``` js
for(let i=n; i<=m; i++) {
    if (i < 10) {
      console.log(i)
    } else if (i === Narcissistic(i)) {
      console.log(i)
    }
  }
 ```
我的寫法是，在主要輸出的函式，判斷水仙花數，所以有點不知道要怎麼命名函式的名字。

不只是這一題，我在寫其他題目的時候也是，總是再看檢討影片的時候，默默地改掉自己的命名，這點對我來說是一個需要克服的事情!
## hw3：判斷質數
```js
function solve(lines) {
  for(let i=l; i<=lines[0]; i++) {
    if (Number(lines[i]) === 1) {
      console.log('Composite') 
    } else {
        console.log(isPrime(Number(lines[i])))
    }
  }
}
```
這題剛開始一直 AC 不了，然後我也不知道怎麼改的，突然就 AC 了，出於好奇心，比對一下自己的程式碼，原來 let i = 1 寫成了 l ，怎麼可以這麼自然的隱藏在裡面 !
## hw4：判斷迴文
這題我嘗試著用內建函式的寫法，我對內建函式很不熟，錯了好多次，連 **reverse** 都拼了 3 次才對，也透過這題知道了這個函式只能用在陣列。
## hw5：聯誼順序比大小
這題花我超級久的時間，從一開始如何輸入資料，好不容易想通，信心滿滿的去 submit ，結果怎麼用怎麼錯，後來本想去討論區問，然後看到已經有人發問，才發現原來要把 Number 改成 BigInt。

另外的收穫是，看著同學的程式碼，發現我的實在太冗長了，希望我之後可以越來越進步。



