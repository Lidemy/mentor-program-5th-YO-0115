<?php
  require_once('conn.php');
  require_once('utils.php');

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
       <a href="index.php">YO's Blog</a> 
      </div>
      <ul class="nav__list">
        <div>
          <li class="list__mark"><a href="article_list.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <!-- <li><a href="register.php">註冊</a></li> -->
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
    <main class="article">
      <h1 class="article__list">文章列表</h1>
      <?php while ($row = $result->fetch_assoc()) { ?>
        <ul>
          <li class="list__info">
            <a href="read_more.php?id=<?php echo $row['id']; ?>">
              <div class="list__content">
                <h2 class="post__title list__title"><?php echo escape($row['title']); ?><h2>
                <span class="post__created-at"><?php echo escape($row['created_at']); ?></span> 
              </div>
            </a>
          </li>
        </ul>
      <?php } ?>
    </main>
  </div>
  <footer>
    Copyright © 2021 YO's Blog All Rights Reserved.
  </footer>
</body>
</html>