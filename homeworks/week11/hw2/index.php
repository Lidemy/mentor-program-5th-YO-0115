<?php
  require_once('conn.php');
  require_once('utils.php');

  $page = 1;
    if (!empty($_GET['page'])) {
      $page = intval($_GET['page']);
    }

  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $sql = "SELECT * FROM YO_w11_article AS a WHERE a.is_deleted IS NULL  ORDER BY id DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii',$items_per_page, $offset);
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
       <a href="index.php">YO's Blog</a> 
      </div>
      <ul class="nav__list">
        <div>
          <li><a href="article_list.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="register.php">註冊</a></li>
          <li><a href="login.php">登入</a></li>
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
      <?php while ($row = $result->fetch_assoc()) { ?>
      <article class="post">
        <div class="post__head">
          <h2 class="post__title"><?php echo escape($row['title']); ?><h2>
          <span class="post__created-at">最後編輯 <?php echo escape($row['created_at']); ?></span> 
        </div>
        <p class="post__content"><?php echo escape($row['content']); ?></p>
        <div class="post__btn">
          <a href="read_more.php?id=<?php echo $row['id']; ?>" class="btn">read more</a>
        </div>
      </article>
      <?php } ?>
      <?php
        $stmt = $conn->prepare("SELECT count(id) AS count FROM YO_w11_article WHERE is_deleted IS NULL");
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <a href="index.php?page=1" class="btn">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>" class="btn">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>" class="btn">下一頁</a>
          <a href="index.php?page=<?php echo $total_page ?>" class="btn">最後一頁</a>
        <?php } ?>
      </div>
    </main>
  </div>
  <footer>
    Copyright © 2021 YO's Blog All Rights Reserved.
  </footer>
</body>
</html>