## 請列出 React 內建的所有 hook，並大概講解功能是什麼
### 基礎 hook
- useState 
 `const [state, setState] = useState(initialState);`
 
     他會回傳一個 state 的值，以及更新 state 的 function，每當 state 的資料改變，就會重新 render 一次畫面，也就是說，當 setState 回傳的資料與目前的 state 相同時，後續的 render 就會被跳過。
 
     initialState，是首次 render 的時候會回傳的值。

- useEffect
     useEffect 是當瀏覽器畫面全部繪製完成後才會執行。
     
     而在 useEffect 的預設中，只要瀏覽器 render 畫面就會觸發，但其實沒有必要這樣做，所以 useEffect 提供了第二個為 array 的參數，他可以設定為某個值改變的時候才執行。
     
     若是想要 useEffect 只執行一次，那可以傳一個空 array 做為第二參數，那他之後就都不會再被執行到了。
    
- useContext
    接收一個 context object 並回傳該 context 目前的值，而 context 的值是取決於上層 component 距離最近 <MyContext.Provider> 的 value prop。

### 額外的 hook
- useReducer
    是 useState 的替代方案，當 state 需要處理的邏輯變複雜時，可以使用。
    
- useCallback
    會回傳一個 callback，只有當 callback 所依賴的 array 值改變的時候，它才會更新，可以利用這個特性來避免不必要的 render，通常搭配 memo 使用。
    
- useMemo
    讓 react 記住 function 的回傳值，這樣如果有一個複雜的程式被重新 render，而值又沒有改變的時候， 就可以避免在重新運算。
    
- useRef
    會回傳一個帶有 .current 屬性的 object，當 current 值改變時不會觸發 re-render。
    
- uerImperativeHandle
    可以利用這個向子物件取得 ref 的值，但是它必須透過 forwardRef 拿到 ref object。
    
- useLayoutEffect
    和 useEffect 差不多，差別在於它會在瀏覽器 render 畫面前執行。
    
- useDebugValue
   會在 react DevTools 中顯示自定義的 hook 標籤，而如果有時候需要顯示比較複雜的程式，這時可以傳入第二個參數為一個函式，這樣它就只會在 react DevTools 開啟時才執行。
   

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
Lifecycle Methods 可以分為三大類外加例外處理的方法。

>當開頭是 ->
will，表示在某個事件發生之前會執行。
did ，則表示某個事件發生之後會執行。

### Mounting
- constructor()
    - 透過指定一個 this.state 物件來初始化內部的 state
    - 為 event handler 方法綁定 instance
    
- static getDerivedStateFromProps()
    會在每一次跑 render() 前執行，執行後會回傳一個物件來更新 state，或是回傳 null 表示不需要更新任何 state。
    
- render()
    它是 class component 中唯一必要的方法，當 render() 被呼叫的時候，它會檢查 this.props 和 this.state 並回傳下列類別之一
    - React element
    - Array 和 fragment 
    - Portal
    - String 和 number
    - Boolean 或 null

- componentDidMount()
    會在元件被卦載到 DOM 後被執行，非常適合用在綁定 DOM 事件和遠端請求資料。

### Updating
- static getDerivedStateFromProps()
    同上
    
- shouldComponentUpdate()
    用來優化效能的方法，每當 props 或是 state 有更新時，react 會在  render() 前，先執行 shouldComponentUpdate() 決定是否真的需要 render()

- render()
    同上
    
- getSnapshotBeforeUpdate()
    在畫面實際 render 之前被調用，而它的回傳值會當成一個參數給 componentDidUpdate() 使用。
    
- componentDidUpdate()
    在初次 render 的時候不會執行，之後會在元件更新完成、執行完 render後被執行。而每一次元件更新時，React 確保 componentDidUpdate() 只會被執行一次。

### Unmounting
- componentWillUnmount()
    在元件要 Unmount 前執行，它會清理任何和這個元件有關的東西，像是清除計時器、網路請求、移除 event listener 等。

### Error Handling 
- static getDerivedStateFromError()
    會在某個錯誤被一個子元件拋出後被呼叫。它會接收該錯誤為其參數並回傳一個值以更新 state。
    
- componentDidCatch()
    會在某個錯誤被一個子元件拋出後被呼叫，並接受兩個參數
    - error - 被拋出的錯誤。
    - info -  一個有 componentStack key 的 object，這個 key 包含有那一個 component 拋出錯誤的資訊。 
    

## 請問 class component 與 function component 的差別是什麼？
class component render  method 是每一次 render 都會執行到，而其他的 lifecycle 不會，所以隨時都可以用 `this.props.onChange` 拿到最新的屬性。

但 function component 的每一次渲染，都會把整個 function 執行一遍，所以每一次都是新的 function call。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
兩者差別在於，uncontrolled component 資料由 DOM 控制，controlled component 資料由 react 控制。

- uncontrolled component - 透過 ref 來取值
- controlled component - 透過 useState 來保存資料，setState 設置資料。
