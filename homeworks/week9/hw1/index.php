<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $result = $conn->query("SELECT * FROM YO_w9_comments ORDER BY id DESC");
  if (!$result) {
    die('Error: ' . $conn->error); 
  }
  /*
    1. 從 cookie 裡面讀取 PHPSESSID(token)
    2. 從檔案裏面讀取 session id 內容
    3. 放到 $_SESSION
  */
  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
  } 
?>

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
      <h1 class="board__title">Comments</h1>
      <div class="board__btn">
        <?php if (!$username) { ?>
          <a href="register.php">註冊</a>
          <a href="login.php">登入</a>
        <?php } else { ?>
          <a href="logout.php">登出</a>
        <?php } ?>
      </div>
    </div>
    <?php
      if (!empty($_GET['errCode'])) {
        $err = $_GET['errCode'];
        $mas = 'Error';
        if ($err === '1') {
          $mas = '資料不齊全';
        }
        echo '<h3 class="error">錯誤: ' . $mas . '</h3>';
      }
    ?>
    <form class="board__new-comment-form" method="POST" action="handle_add.php">
      <?php if ($username) { ?>
        <div class="board__nickname">
          <span><?php echo '<h2>HI！' . $nickname . '</h2>' ?></span>
        </div>
        <textarea name="content" rows="5"></textarea>
        <input class="board__submit-btn" type="submit" />
      <?php } else { ?>
        <div class="board__nickname">
          <span>請先登入</span>
        </div>
        <textarea name="content" rows="5"></textarea>
      <?php } ?>
    </form>
    <hr />
    <section>
      <?php
        while ($row = $result->fetch_assoc()) {
      ?>
        <div class="card">
        <div class="card__avatar"></div>
        <div class="card__body">
          <div class="card__info">
            <span class="card__author">
              <?php echo $row['nickname']; ?>
            </span>
            <span class="card__time">
              <?php echo $row['created_at']; ?>
            </span>
          </div>
          <p class="card__content"><?php echo $row['content']; ?></p>
        </div>
      </div>
      <?php } ?>
    </section>
  </main>
</body>
</html>