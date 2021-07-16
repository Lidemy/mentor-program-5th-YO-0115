<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit;
  } 

  $sql = "SELECT * FROM YO_w11_article AS a WHERE a.is_deleted IS NULL  ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error);
  }
  $result = $stmt->get_result();
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
  <nav class="navbar">
    <div class="container">
      <div class="nav__logo">
       <a href="admin.php">YO's Blog</a> 
      </div>
      <ul class="nav__list">
        <div>
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="add_article.php">新增文章</a></li>
          <li><a href="logout.php">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <div class="bg"></div>
  <section class="banner">
    <div class="container">
      <h1 class="banner__title">存放我記憶體裡的技術</h1>
      <p class="banner__text">Welcome to my blog</p>
    </div>
  </section>
  <div class="container">
    <main class="posts">
      <?php 
        while ($row = $result->fetch_assoc()) {
      ?>
      <article class="post">
        <div class="post__head">
          <h2 class="post__title"><?php echo escape($row['title']); ?></h2>
          <span class="post__created-at">最後編輯 <?php echo escape($row['created_at']); ?></span> 
        </div>
        <p class="post__content"><?php echo escape($row['content']); ?></p>
        <div class="post__btn">
          <a href="read_more.php?id=<?php echo $row['id']; ?>" class="btn">查看</a>
          <a href="edit_article.php?id=<?php echo $row['id']; ?>" class="btn">編輯</a>
          <a href="handle_delete.php?id=<?php echo $row['id']; ?>" class="btn">刪除</a>
        </div>
      </article>
      <?php } ?>
    </main>
  </div>
  <footer>
    Copyright © 2021 YO's Blog All Rights Reserved.
  </footer>

  <script>
   
  </script>
</body>
</html>