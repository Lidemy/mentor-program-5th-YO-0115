<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET['id'];

  $stmt = $conn->prepare("SELECT * FROM YO_w9_comments WHERE id=?");
  $stmt->bind_param('i', $id);

  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error); 
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

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
  <title>編輯留言</title>
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
      <h1 class="board__title">編輯留言</h1>
    </div>  
    <?php
      if (!empty($_GET['errCode'])) {
        $err = $_GET['errCode'];
        $mas = 'Error';
        if ($err === '1') {
          $mas = '資料不齊全';
        }
        echo '<h3 class="error mb">錯誤: ' . $mas . '</h3>';
      }
    ?>
    <form class="board__new-comment-form" method="POST" action="handle_update_comment.php">
      <textarea name="content" rows="5"><?php echo $row['content'] ?></textarea>
      <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
      <input class="board__submit-btn" type="submit" value="送出" />  
    </form>
  </main>
</body>
</html>