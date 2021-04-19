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
2. 是，繼續執行，開始進入第一圈迴圈 ; 不是，結束迴圈
3. 執行第 2 行，判斷 arr[i] 是否 <= 0
4. 是，結束函數，回傳 'invalid ; 不是，則進入下一圈迴圈
5. 迴圈結束，跑回第 1 行，i++，i 變成 1，檢查 i 是否 < arr.length
6. 是，再次執行第 2 行 ; 不是，結束整個迴圈
7. 執行第 3 行，設定變數 i 是 2，檢查 i 是否 < arr.length
8. 是，繼續執行，開始進入第一圈迴圈 ; 不是，結束迴圈
9. 執行第 4 行，判斷 arr[i] 是否 !== arr[i-1] + arr[i-2]
10. 是，結束函數，回傳 'invalid ; 不是，則進入下一圈迴圈
11. 迴圈結束，跑回第 3 行，i++，i 變成 3，檢查 i 是否 < arr.length
12. 是，再次執行第 4 行 ; 不是，結束整個迴圈
13. 若是上面兩個迴圈都沒符和條件，則回傳 'valid'
14. 結束整個函數