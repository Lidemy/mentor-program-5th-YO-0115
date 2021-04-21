``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```


## 執行流程
1. 執行第 1 行，設定變數 i 是 0，檢查 i 是否 < arr.length
2. 是，繼續執行，開始進入第一圈迴圈 
3. 執行第 2 行，判斷 arr[0] 是否 <= 0
4. 是，結束函數，回傳 'invalid ; 不是，則進入下一圈迴圈
5. arr[0] = 3，3 沒有 <= 0，所以進入下一圈迴圈
6. 第一圈迴圈結束，跑回第 1 行，i++，i 變成 1，檢查 i 是否 < arr.length
7. 是，再次執行第 2 行 
8. 就這樣重複檢查判斷到了 arr[5]，其中都沒有符合回傳條件
9. 所以在次回到第 1 行，i++，i 變成 6，檢查 i 是否 < arr.length
10. 不是，結束整個迴圈，接著往下執行
11. 執行第 3 行，設定變數 i 是 2，檢查 i 是否 < arr.length
12. 是，繼續執行，開始進入第一圈迴圈 
13. 執行第 4 行，判斷 arr[2] 是否 !== arr[2-1] + arr[2-2]
14. 是，結束函數，回傳 'invalid' ; 不是，則進入下一圈迴圈
15. 8 == 5 + 3，不符合條件，所以進入下一圈迴圈
16. 就這樣重複檢查判斷直到 arr[4] !== arr[4-1] +arr[4-2]
17. 符合條件，回傳 'invalid'，並結束整個函數