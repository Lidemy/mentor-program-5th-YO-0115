## 什麼是 Ajax？
> Ajax (Asynchronous JavaScript and XML)，指的是一套綜合了多項技術的瀏覽器端網頁開發技術。
> 而在這個技術裡最重要的是 Asynchronous，也就是「非同步」。

我們可以利用非同步這點，和 server 溝通交換資料，來達到網頁不用重新載入，就可以即時更新畫面。


## 用 Ajax 與我們用表單送出資料的差別在哪？
使用表單送出資料時，是透過 HTML 向網頁伺服器傳送一個請求，伺服器接收並處理傳來的表單，然後送回一個新的網頁並刷新。

而 AJAX 則是將需要處理的部分傳至伺服器建立一個請求，伺服器處理完畢後再將資料轉至 JavaScript 處理，進行局部內容的資料轉換，這樣不用換頁就能更新頁面內容。


## JSONP 是什麼？
JSONP，是在瀏覽器的同源政策下衍伸出來的東西。

它利用同源政策的漏洞，在 HTML 裡帶上 <script src = "要 GET 資料的網域名稱"></script> ，讀取網頁 JS 的資訊，藉此拿到資料。


## 要如何存取跨網域的 API？
用跨來源資源共用（Cross-Origin Resource Sharing，CORS）這個協定來取得跨網域 API。

只要 Server 端在 response header 加上 access-control-allow-origin: * 那就算是不同源的網域，也可以在 Server 端取得資訊了。

另外也可以用 node.js 來存取跨網域的 api，或是 JSONP。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為第四週是用 node.js 發出 request ，在由 server 直接回傳 response，這中間不會有任何限制。

而這週是透過瀏覽器去發 request 並由瀏覽器接收，所以必須按照瀏覽器的規則，也就會受到同源政策的影響。
