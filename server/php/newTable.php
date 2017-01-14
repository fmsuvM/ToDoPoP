<?php

if(isset($_POST['newUsername'])) 	      $newUsername=$_POST['newUsername'];
if(isset($_POST['newPassword'])) 	      $newPassword=$_POST['newPassword'];

if(empty($newUsername)||empty($newPassword)){
  echo '{"result":{"status":"failed"}}';
}else {

  $db = new PDO("sqlite:calendar.sqlite");
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);


   $db->exec("CREATE TABLE IF NOT EXISTS $newUsername(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title text,
     date text,
     location text
 )");
 $db->query("INSERT INTO users VALUES('$newUsername','$newPassword')");
echo '{"result":{"status":"ok"}}';
}
?>
