<?php
   function escape($str) {
      return htmlspecialchars($str, ENT_QUOTES);
  }

  function getUserFromUsername($username) {
    global $conn;

    $sql = "SELECT * FROM YO_w11_user WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row; // id, username, nickname
  }
?>