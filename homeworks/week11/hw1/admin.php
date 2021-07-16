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
  } 

  if ($user === NULL || $user['role'] !== 'ADMIN') {
    header('Location: index.php');
    exit;
  }

  $sql = "SELECT id, nickname, username, role, created_at FROM YO_w9_users ORDER BY id ASC";
  $stmt = $conn->prepare($sql);
  
  $result = $stmt->execute();
  if (!$result) {
    header('Location: index.php');
    die('伺服器出錯'); 
  }
  $result = $stmt->get_result();
?>



<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>後台</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="board__data">
    <div class="board__header">
      <h1 class="board__title">使用者管理頁面</h1>
      <div class="board__btn">
        <a href="index.php">返回頁面</a>
        <a href="logout.php">登出</a>
      </div>
    </div>
    <table>
      <tr>
        <th style="width: 8%;">#</th>
        <th style="width: 23%;">nickname</th>
        <th style="width: 23%;">username</th>
        <th style="width: 20%;">role</th>
        <th style="width: 26%;">role_edit</th>
      </tr>
      <?php  
        while ($row = $result->fetch_assoc()) {
      ?>
        <tr>
          <td><?php echo escape($row['id']); ?></td>
          <td><?php echo escape($row['nickname']); ?></td>
          <td><?php echo escape($row['username']); ?></td>
          <td><?php echo escape($row['role']); ?></td>
          <td>
            <form class="role__info" method="POST" action="handle_update_role.php?id=<?php echo escape($row['id']); ?>">
              <div class="role__option">
                <label><input type="radio" name="role" value="ADMIN">管理員</label>
                <label><input type="radio" name="role" value="NORMAL">使用者</label>
                <label><input type="radio" name="role" value="BANNED">停權</label>
              </div>
              <input class="option__btn" type='submit' />
            </form>
          </td>
        </tr>
      <?php } ?> 
    </table>
  </main>
</body>
</html>