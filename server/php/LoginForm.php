<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>Login form</title>
  </head>
  <body>

<?php
session_start();
 ?>
  <h2>ユーザ名とパスワードを入力してください</h2>
  <form action ="login_submit.php" method="post">
  <div>ユーザ名</div>
  <input type="text" name="username">
  <div>パスワード</div>
  <input type="password" name="password">
  <input type=submit value="送信">
  </form>

  </div>

  </body>
</html>
