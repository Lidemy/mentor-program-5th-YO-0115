<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>
     注意！此站為練習用網站，註冊時請勿使用真實的帳號密碼 
    </strong>
  </header>
  <main class="board">
    <div class="board__header">
      <h1 class="board__title">註冊</h1>
      <div class="board__btn">
        <a href="index.php">返回頁面</a>
      </div>
    </div>
    <?php
      if (!empty($_GET['errCode'])) {
        $err = $_GET['errCode'];
        $mas = 'Error';
        if ($err === '1') {
          $mas = '資料不齊全';
        } else if ($err === '2') {
          $mas = '帳號已被註冊' ;
        }
        echo '<h3 class="error">錯誤: ' . $mas . '</h3>';
      }
    ?>
    <form class="board__new-comment-form" method="POST" action="handle_register.php">
      <div class="board__nickname">
        <span>暱稱：</span>
        <input type="text" name="nickname" />
      </div>
      <div class="board__nickname">
        <span>帳號：</span>
        <input type="text" name="username" />
      </div>
      <div class="board__nickname">
        <span>密碼：</span>
        <input type="password" name="password" />
      </div>
      <input class="board__submit-btn" type="submit" value="送出" />
    </form>
  </main>
</body>
</html>