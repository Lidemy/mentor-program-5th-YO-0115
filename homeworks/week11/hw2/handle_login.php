<?php
  session_start();
  require_once("conn.php");

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM YO_w11_user WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    header('Location: login.php?errCode=2');
    exit();
  }

  // 查到有使用者
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header('Location: admin.php');
  } else {
    header('Location: login.php?errCode=2');
  }
?>