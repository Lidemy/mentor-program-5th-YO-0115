<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['role'])) {
    header('Location: admin.php?errCode=1');
    die('Error');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_GET['id'];
  $role = $_POST['role'];

  if (!$user || $user['role'] !== 'ADMIN') {
    header('Location: admin.php');
    exit;
  }

  $sql = "UPDATE YO_w9_users SET role=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>
