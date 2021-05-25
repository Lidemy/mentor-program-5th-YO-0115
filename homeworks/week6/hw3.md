## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
- **main** : 網頁主要資訊內容，每個頁面只能有一個。
- **aside**：網頁的側欄、附加內容。
- **article**：主要用於放置文章內容的區塊。

## 請問什麼是盒模型（box modal）

![](https://i.imgur.com/MQgHCGi.png)

可以把每一個元素標籤都當作是一個盒子，裡面包含了 margin、border、padding、內容。

margin，向外留白，決定外面元素起始位置。
padding，向內留白，決定裡面元素起始位置。
border，也佔有空間。
內容，文字或子元素放置的位置。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- block : 我就是老大，我要獨佔一整行，而且高瘦矮胖都可以。
- inline : 只佔據自己內容的大小，拒絕改變。
- inline-block : 繼承上面兩個的優點，只佔據自己內容的大小，而且高矮胖瘦都可以調整。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- static，自然排版，不會特別被定位，是預設值。
- relative，根據自己原本位置定位。
- absolute，根據往上找第一個 position 不是 static 做定位。
- fixed，根據 viewport 做定位。
