## 請以自己的話解釋 API 是什麼
> API 就是雙方互換資訊的一種媒介。

創建 API 的那方，可以決定什麼資訊要和對方交換，另一方就只能使用對方提供的功能。

就好比說，你去一家麵店，只能點店家菜單上有的東西，菜單上沒有的就無法取得，而菜單就是一種現實版的 API。

在現實生活流程 :
老闆在紙上寫下要賣的東西->顧客拿到菜單->寫下想點的餐品->菜單回傳到老闆手上->出餐->顧客取餐

轉換成網路形式的說法:
- 老闆就是創建 API 的人
- 紙代表 server
- 菜單代表 API 
- 顧客就是使用 API 的人

所以當我們要使用別人的功能時，電腦的運行流程就是:
獲取 API -> 選取想要的資訊 -> server 收到後 -> 去對方那裡取得資訊 ->對方把我們所需要的資訊回傳給我們


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- 202 : 伺服器已接受請求，但尚未處理。
- 431 : 伺服器不願處理請求，因為一個或多個頭欄位過大。
- 508 : 伺服器在處理請求時陷入無窮迴圈。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


平台 URL : https://happy-restaurant.platform.com
| 說明 | Method | Path | 參數 | 範例 |
| --- | ------ | ---- | ---- | --- |
| 獲取所有餐廳 | GET | /eat | _limit:限制回傳資料數量 |/eat?limit=5 |
| 獲取單一餐廳 | GET | /eat/:id | 無 | /eat/10 |
| 新增餐廳    | POST | /eat | name: 店名 | 無 |
| 刪除餐廳    | DELETE | /eat/:id | 無 | 無 |
| 更改餐廳資訊 | PATCH | /eat/:id | name: 店名 | 無 |




