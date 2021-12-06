## Redux middleware 是什麼？
> Redux middleware 是 dispatch action 進入 reducer 之前，可以讓我們做一些事情的時間點。

在 Redux 中沒有限制 middleware 的數量，所以我們可以有很多個 middleware，並讓每個  middleware 自行判斷目前的任務是否是自己要處理的，如果不是就傳給下一個。 


## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
- CSR (Client-Side Rendering)
server 接收 request 後，只回傳相關資料，瀏覽器收到後，藉由 JavaScript 動態產生 HTML 來渲染畫面


- SSR (Server-Side Rendering)
server 接收 request 後，解析資料並回傳完整的 HTML，然後再由瀏覽器渲染完成。 

### 為甚麼需要 SSR ?
雖然 CSR 可以達到更新資料不換頁，讓使用者體驗更好，但是實際去看原始碼，就會發現 HTML 結構空空的，因為我們的資料都是由 JS 動態產生，這樣會導致 SEO 非常的不好。
 
為了解決這個問題，我們可以一開始進入網站的時候，利用 SSR 渲染畫面，讓自身的程式碼是完整的，之後需要更新資料的時候，在利用 CSR 動態產生畫面。


## React 提供了哪些原生的方法讓你實作 SSR？
用 React 提供的 ReactDOMServer 實作，通常用在 node.js


- 伺服器和瀏覽器都能使用的 :
    - renderToString()
    - renderToStaticMarkup()
    
- 只能在伺服器端使用的
    - renderToNodeStream()
    - renderToStaticNodeStream()


## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種
- Next.js : react 解決 SSR 問題的框架
- Gatsby.js : 一個基於 React 的靜態網頁生成器
- [ssr](http://doc.ssr-fc.com/) : 一個通用於 react 和 vue 的框架
