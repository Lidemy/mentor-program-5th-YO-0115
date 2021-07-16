<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  /*
    1. 從 cookie 裡面讀取 PHPSESSID(token)
    2. 從檔案裏面讀取 session id 內容
    3. 放到 $_SESSION
  */
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
  } 

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }

  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    "SELECT " .
      "c.id AS id, c.content AS content, c.created_at AS created_at, " .
      "u.nickname AS nickname, u.username AS username " . 
    "FROM YO_w9_comments AS c " .
    "LEFT JOIN YO_w9_users AS u ON c.username = u.username " .
    "WHERE c.is_deleted IS NULL " .
    "ORDER BY c.id DESC " .
    "LIMIT ? OFFSET ?" 
  );
  $stmt->bind_param('ii', $items_per_page, $offset);
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
        <?php } else if ($username && isAdmin($user)) {  ?>
          <span class="update-nickname">編輯暱稱</span>
          <a href="admin.php">後台</a>
          <a href="logout.php">登出</a>
        <?php } else { ?>
          <span class="update-nickname">編輯暱稱</span>
          <a href="logout.php">登出</a>
        <?php } ?>
      </div>
    </div>
    <form class="hide update-form" method="POST" action="handle_update_user.php">
      <div class="board__nickname">
        <input type="text" name="nickname" placeholder="新的暱稱" />
        <input class="board__submit-btn" type="submit" value="送出" />
      </div>
    </form>
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
      <?php if ($username && !hasPermission($user, 'create', NULL)) { ?>
        <div class="board__nickname">
          <span><?php echo '<h2>HI！' . escape($nickname) . ' 不想給你留言喔' . '</h2>' ?></span>
        </div>
        <textarea name="content" rows="5"></textarea>
      <?php } else if ($username) { ?>
        <div class="board__nickname">
          <span><?php echo '<h2>HI！' . escape($nickname) . '</h2>' ?></span>
        </div>
        <textarea name="content" rows="5"></textarea>
        <input class="board__submit-btn" type="submit" value="送出" />
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
              <?php echo escape($row['nickname']); ?>
              (@<?php echo escape($row['username']); ?>)
            </span>
            <span class="card__time">
              <?php echo escape($row['created_at']); ?>
            </span>
            <?php if (hasPermission($user, 'update', $row)) { ?>
              <a href="update_comment.php?id=<?php echo escape($row['id']); ?>">編輯</a>
              <a href="handle_delete_comment.php?id=<?php echo escape($row['id']); ?>">刪除</a>
            <?php } ?> 
          </div>
          <p class="card__content"><?php echo escape($row['content']); ?></p>
        </div>
      </div>
      <?php } ?>
    </section>
    <hr />
    <?php
      $stmt = $conn->prepare("SELECT count(id) AS count FROM YO_w9_comments WHERE is_deleted IS NULL");
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $items_per_page);
    ?>
    <div class="page__info `mb">
      <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
      <span><?php echo $page ?> / <?php echo $total_page ?></span>
    </div>
    <div class="paginator">
      <?php if ($page != 1) { ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
      <?php } ?>
    </div>
  </main>

  <script>
    document.querySelector('.update-nickname').addEventListener('click', () => {
      const form = document.querySelector('.update-form')
      form.classList.toggle('hide')
    })
  </script>
</body>
</html>