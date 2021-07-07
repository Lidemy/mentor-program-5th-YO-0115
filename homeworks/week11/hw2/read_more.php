<?php
session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  } 

  $id = $_GET['id'];

  $sql = "SELECT * FROM YO_w11_article WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);

  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
      <article class="post post-read" method="POST" action="handle_update.php">
        <div class="post__head">
          <h1 class="post__title"><?php echo escape($row['title']); ?></h1>
          <div class="post__head-btn">
            <?php if ($row['username'] === $username) { ?>
              <a href="admin.php">返回頁面</a>
            <?php } else { ?>
              <a href="<?php echo $_SERVER['HTTP_REFERER']?>">返回首頁</a>
            <?php } ?>
          </div>
        </div>
        <hr />
        <p class="read__content"><?php echo escape($row['content']); ?></p>
        <div class="post__time">
          <span class="post__created-at"><?php echo escape($row['created_at']); ?></span> 
        </div>
      </article>
    </div>
  </section>
  <footer class="footer">
    Copyright © 2021 YO's Blog All Rights Reserved.
  </footer>
</body>
</html>