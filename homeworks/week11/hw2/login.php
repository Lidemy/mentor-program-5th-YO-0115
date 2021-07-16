<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YO 部落格</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <section class="container">
    <div class="cards">
      <form class="card" method="POST" action="handle_login.php">
        <div class="card__head">
          <h1 class="card__title">登入</h1>
          <div class="card__head-btn">
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
              $mas = '帳號密碼輸入錯誤';
            }
            echo '<h3 class="error">錯誤: ' . $mas . '</h3>';
          }
        ?>
        <div class="card__content">
          <label>
            帳號 : <input type="text" name="username">
          </label>
          <label>
            密碼 : <input type="password" name="password">
          </label>
        </div>
          <input class="card__content-btn" type="submit" value="送出">
        </div>
      </form>
    </div>
  </section>
  <footer class="footer">
    Copyright © 2021 YO's Blog All Rights Reserved.
  </footer>
</body>
</html>