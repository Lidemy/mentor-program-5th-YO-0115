## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
雜湊和加密最大的差別就是，
>雜湊過後的密碼無法還原，
但加密過後的密碼卻可以解密

但是雜湊卻也不是完全的安全，因為雜湊和加密不一樣，它並不是一對一，有可能兩組以上的密碼對應相同的雜湊值，這種情形就叫做「雜湊碰撞」，但發生機率蠻低的。

那我們為甚麼要將密碼經過雜湊後再存入資料庫呢?

因為這樣才能預防駭客偷取資料時，沒辦法靠著資料庫，直接獲取使用者的密碼，也可以防止管理者隨意取用使用者資料。


## `include`、`require`、`include_once`、`require_once` 的差別

他們作用都是用來引入資料的，差別就是執行方式的不同
- include: 會將指定的文件讀入並且執行裡面的程序，但若出錯，只會報錯，接著繼續執行接下來的程式碼 
 
- require: 會將目標文件的內容讀入，並且把自身替代成這些讀入的內容，但若出錯，會報錯，然後停止運行程式

- include_once: 作用和 include 差不多，只差在它會事先檢查資料是否已經傳輸過，若是有傳送過的資料，就不會再次引入

- require_once: 作用和 require 差不多，只差在它會事先檢查資料是否已經傳輸過，若是有傳送過的資料，就不會再次引入


## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL Injection 是利用 SQL 語法的漏洞下去做攻擊

例如 : 用判斷式加註解的方式
``` sql
SELECT * FROM users WHERE username='%s' and password='%s';

username = ' or 1=1#
password = 123

# 這樣不管密碼正不正確，都可以成功執行，因為 1=1 是 true，而 # 後面會被解讀為註解。
```

或是用字串拼接的方式，來改變內容
``` sql
INSERT INTO comment(nickname, content) VALUES('%s', '%s');

content = '), ((SELECT username FROM users WHERE id=1), (SELECT password FROM users WHERE id=1))#

# 藉由改變 content 的內容，來取得 id=1 的 username 和 password
```


那要如何防範這種行為的發生呢?

最直接的方法就是，避免使用者輸入的變數，不能夠直接被結合到 SQL 查詢語法中。
所以我們可以針對使用者輸入的變數來做檢查和阻擋，或是強迫使用參數化語句來傳遞使用者輸入的內容。而目前公認最有效阻擋攻擊的便是，Prepared Statement。

它執行原理就是，當資料傳輸進去時，它會先在資料庫中進行編譯，在將參數套入執行。

以 php 為例
``` php
<?PHP
    $stmt = $conn->prepare("INSERT INTO comments(nickname, content) VALUE(?, ?)");
    $stmt->bind_param("ss", $nickname, $content);
    $stmt->execute();
?>
```


##  請說明 XSS 的攻擊原理以及防範方法
XSS 主要是透過執行 JS 來達到攻擊的效果，主要攻擊有分為三種:

- Stored XSS
- Reflected XSS
- DOM-Based XSS

### Stored XSS
Stored XSS 儲存型 XSS。

最常見的就是利用留言板功能，輸入一段程式碼，例: `<script>alert('攻擊訊息')</script>`
然後把這段資訊儲存在後端，這樣一來，當其他使用者拜訪此網站的時候，瀏覽器便會將它當成一般的程式碼執行，藉此達到攻擊效果。

### Reflected XSS
Reflected XSS 反射型 XSS。

攻擊方式為將攻擊的程式碼藏在 URL 網址列中，並透過 GET 參數傳遞，但此種攻擊方式要使用者點擊拜訪網站才有效果，所以駭客會引導使用者去點擊。

### DOM-Based XSS
這種攻擊方式和前兩種不同的地方在，它是利用前端來攻擊。

攻擊方式是，如果前端有用 .html() 或 .innerHTML()，那駭客便可以在這上面注入 JS 語法，最常見的就是利用 img 不受同源限制的影響，在上面帶上攻擊程式，藉此偷取使用者的 cookie。

### 防範方式
只要在任何可以輸入資料的地方，進行跳脫字元 escape，讓使用者輸入的任何訊息轉換為純文字，而不是可以使用的程式碼，那便可以有效阻擋駭客的攻擊。

不過有一點需要注意的是，通常在輸出的時候進行跳脫就好，在資料庫中的資料儲存原本的文字，這樣比較方便查詢資料



## 請說明 CSRF 的攻擊原理以及防範方法
它的原理是利用連結 (隱藏圖片或隱藏表單)，塞入目標 domain，讓使用者在不知情的情況下發送 reqest。

舉例來說，如果小名造訪了 a 網站卻沒有登出，然後又不小心造訪由駭客設計過的網站，這樣駭客便可以藉由小名在 a 網站的 session 紀錄，來發送的 request ，讓 a 網站誤以為是本人操作的。

### 防範方法普遍有兩種：
- 檢查 referer 欄位


request 的 header 裡面有個欄位叫做 referer，代表這個 request 是從哪個地方過來的，通過檢查可以知道這是不是合法的 domain。

但這個方式還是有缺點的，不是每個瀏覽器都會帶上 referer，再者有些使用者可能會關閉自動帶 referer 的這個功能，而一旦檢查的程式出現 bug 那駭客也可以輕易偽造 referer 欄位。  



- 加入驗證token

1.  CSRF token

我們可以在 form 裡面加上一個 hidden 的欄位，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中，這樣駭客就不知道 session 是什麼了。

但是如果 server 接受 cross origin 的 request，那駭客依舊可以輕易取得 session。

2.  Double Submit Cookie

和上面的方式一樣，只是它的參照值是存在 cookie 裡，這方法利用的是 cookie 只會從相同 domain 帶上來，攻擊者無法從不同 domain 帶上此 cookie。

缺點是駭客如果掌握了我們底下任何一個 subdomain，就可以幫我們寫 cookie。

3.  Client 端生成的 Double Submit Cookie

和上述方法一致，只是將 CSRF token 改為 client 產生並儲存，而此 cookie 只是要確保駭客無法取得，所以沒有安全性上的問題。

4. SameSite cookie

此方法是由瀏覽器為 cookie 在多加一層驗證，且不允許跨站請求。

啟用功能 :

原本設置 Cookie 的 header 
`Set-Cookie: session_id=ewfewjf23o1;`

只要在後面多加一個 SameSite 就好
`Set-Cookie: session_id=ewfewjf23o1; SameSite`
