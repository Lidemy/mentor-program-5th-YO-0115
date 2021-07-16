<?php
  require_once("conn.php");

  function getUserFromUsername($username) {
    global $conn;

    $sql = "SELECT * FROM YO_w9_users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row; // id, username, nickname, role
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  // %action: update, delete, create
  function hasPermission($user, $action, $comment) {
    if ($user === NULL) return false;

    if ($user['role'] === 'ADMIN') {
      return true;
    }

    if ($user['role'] === 'NORMAL') {
      if ($action === 'create') return true;
      return $comment['username'] === $user['username'];
    }

    if ($user['role'] === 'BANNED') {
      if ($action === 'create') return false;
      return $comment['username'] === $user['username'];
    }
  }

  function isAdmin($user) {
    return $user['role'] === 'ADMIN';
  }
?>