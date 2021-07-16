<?php 
  session_start();
  require_once('conn.php');

  if (empty($_POST['title']) || empty($_POST['content'])) {
    header('Location: edit_article.php?errCode=1&id=' . $_POST['id']);
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  date_default_timezone_set("Asia/Taipei");
  $created_at = date('Y-m-d h:i:s', time());  


  $sql = "UPDATE YO_w11_article SET title=?, content=?, created_at=? WHERE id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssis', $title, $content, $created_at, $id, $username);
  
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>