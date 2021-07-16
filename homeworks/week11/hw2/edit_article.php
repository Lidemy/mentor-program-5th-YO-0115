<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit;
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
      <form class="post post-admin" method="POST" action="handle_update.php">
        <div class="post__head">
          <h1 class="post__title">編輯文章</h1>
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
          <input class="create__title" type="text" name="title" value="<?php echo escape($row['title']); ?>">
            <textarea name="content" rows="20"><?php echo escape($row['content']); ?></textarea>
        </div>
          <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>">
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