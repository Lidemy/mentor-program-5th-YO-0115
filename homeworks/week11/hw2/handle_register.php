<?php
  session_start();
  require_once("conn.php");

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: register.php?errCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO YO_w11_user(username, password) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $password);

  $result = $stmt->execute();
  if (!$result) {
    $code = $conn->error;
    if ($code === 1062) {
      header('Locstion: register.php?errCode=2');
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username;
  header('Location: admin.php');
?>