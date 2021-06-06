## 什麼是 DOM？
>DOM (Document Object Model)，翻成中文就是「文件物件模型」。

而 DOM 就是把 HTMT 的各個標籤、文字、圖片，都定義成一個文件，呈現出一個樹狀的結構。以 document 為起點，一個節點就是一個標籤，這樣延伸下去。

JavaScript 就是透過 DOM 提供的 API 來對 HTML 做存取與操作。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
DOM 事件傳遞機制的順序，是當 target 事件發生時，事件先會從根結點開始往下傳遞到 target 事件，接著再從 target 事件往上回傳到根結點。

我們所說的捕獲，就是 DOM 事件一開始從根節點往下傳遞到 target 事件的階段，而冒泡，也就是 target 事件往上回傳到根節點的階段。


## 什麼是 event delegation，為什麼我們需要它？
> Event Delegation，事件委派。

事件委派，是透過冒泡機制 ，把子節點的事件統一回傳到父節點上，由父節點統一監聽控管事件，藉此避免過多的監聽器，而這也是為什麼我們需要它的原因。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
- event.preventDefault() : 取消瀏覽器預設行為。
- event.stopPropagation(): 阻止事件繼續傳遞，但是在同一個節點上有不同的 listener，那還是會繼續執行。