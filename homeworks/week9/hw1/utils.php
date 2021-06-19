<?php
  require_once("conn.php");

  function generateToken() {
    $s = '';
    for ($i=0; $i<=16; $i++) {
      $s .= chr(rand(65, 90));
    }
    return $s;
  }

  function getUserFromUsername($username) {
    global $conn;

    $sql = sprintf("SELECT * FROM YO_w9_users WHERE username='%s'", $username);
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; // id, username, nickname
  }
?>