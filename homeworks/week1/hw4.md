## 跟你朋友介紹 Git

### Git ?
> Git ，就是一種版本控制系統。

版本控制又是什麼呢 ? 簡單來說，就是當我們要修改檔案的時候，又擔心改錯了回不去，這時候我們就會複製一個新的檔案，在新的檔案做修改，這種管理檔案的方式，就是版本控制 !

### 那要怎麼開始呢 ?
首先你先去問 h0w 哥，要怎麼在電腦建置文字使用者介面，順便測試他一下是不是已經搞懂了 ! 接著我們就可以來使用 git 了。

### 開始 Git
- 對`笑話總集`這個資料夾，使用版本控制
  1. 先用 CLI 指令，`cd` 切換到`笑話總集`
  2. `git init`，初始化 / 開始 git 設定
  3. 這時候`笑話總集`裡，會出現一個隱藏資料夾`.git`，代表這個資料夾已經被控制了
  4. `git status` ，可以查看目前版本狀態

- 某天想到新點子，想修改`笑話總集`裡，`笑話1.text`
  1. 修改笑話
  2. `git add 笑話1.text`，將檔案加入版本控制
  3. `git commit -m "名稱"`，建立一個新的版本
  4. 建立完後，可以用`git log`，查看自己建立的歷史紀錄

- 改完之後，怎麼可以只有自己看到，笑話就是要分享
  1. 先到 GitHub，開設一個專案
  2. 在`笑話總集`主分支使用`git remote add orign http://.....git`
  3. 然後用`git push -u origin master`，將笑話上傳到 GitHub
  4. 和大家分享
 
- 在不斷地上傳和修改之後，本地端的資料已經跟不上最新版本了
  1. 先用 `cd`，切換到`笑話總集`
  2. `git checkout master`，切換到主分支
  3. `git pull origin master`從 GitHub 拉檔案下來
  4. 此時，本地端的資料就和 GitHub 一樣了

