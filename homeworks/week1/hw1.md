## 交作業流程
1. 先 `git clone 網址` ，下載屬於自己的作業檔案
2. `cd mentor-program-5th-YO-0115`，利用 CLI 指令來到資料夾
3. 開始版本控制
4. `git checkout -b week1`，開一個新分支，並來到新分支
5. 寫作業
6. `git add .`，加入以修改過後的作業
7. `git commit -am '名稱'`，commit 自己修改後的作業
8. `git push origin week1`，將作業 push 到 github
9. 發 pull request
10. 上學習系統發 PR

## 作業改完後

1.  `git checkout master`，先在本地端切回主分支
2.  `git pull origin master`，從 github 下載檔案，同步本地端
3.  `git branch -d wee1`，刪除本地端分支