## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
- **VARCHAR**：可以設置長度，當一個欄位的值是不固定長的時候可以用
- **TEXT**：不能設置長度，當不確定屬性有多長時，可以用這個

不過 VARCHAR 的索引速度會比 TEXT 快上很多，所以能用 VARCHAR 的地方就不要用 TEXT。


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
> Cookie 就是 server 儲存在瀏覽器上的資訊，藉此來分辨發 request 的瀏覽器是誰。

在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的呢？

就是藉由 server 回傳的 response 中帶上 set-cookie 這項參數，來記錄 server 想儲存在瀏覽器上的資訊，而當瀏覽器發送 request 時候，在把 cookie 放進 HTTP request 裡面一起傳送給 server，這樣就可以輕易地知道發出訊息的是誰了。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 在一開始還沒設 token 的時候，只要駭客知道 cookie 是什麼，就算不用註冊登入，也可以隨便用個 username 去留言。
2. 註冊的時候沒有額外的驗證身分機制，這樣每個人都可以擁有無限多的帳號。
3. 資料庫管理者可以看到大家的帳號密碼，甚至可以編寫他人的留言內容。
