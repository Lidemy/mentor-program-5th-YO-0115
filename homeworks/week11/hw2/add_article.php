<?php
  session_start();
  require_once('conn.php');

  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit;
  } 
?>
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
    <div class="posts post-margin">
      <form class="post post-admin" method="POST" action="handle_add.php">
        <div class="post__head">
          <h1 class="post__title">新增文章</h1>
          <div class="post__head-btn">
            <a href="admin.php">返回頁面</a>
          </div>
        </div>
        <?php
          if (!empty($_GET['errCode'])) {
            $err = $_GET['errCode'];
            $mas = 'Error';
            if ($err === '1') {
              $mas = '有欄位未填寫';
            }
            echo '<h3 class="error">錯誤: ' . $mas . '</h3>';
          }
        ?>
        <div class="create__content">
          <input class="create__title" type="text" name="title" placeholder="今天要下什麼標題呢?">
            <textarea name="content" rows="20" placeholder="想寫點什麼"></textarea>
        </div>
          <input class="create__content-btn" type="submit" value="送出">
        </div>
      </form>
    </div>
  </section>
  <footer class="footer">
    Copyright © 2021 YO's Blog All Rights Reserved.
  </footer>
</body>
</html>