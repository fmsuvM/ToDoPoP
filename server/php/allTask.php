<?php
if(isset($_POST['username'])) 	      $username=$_POST['username'];
if(isset($_POST['username'])) {

$db = new PDO("sqlite:calendar.sqlite");
$result=$db->query("SELECT * FROM $username");
//配列にデータベースを追加
$ary = array();
$result -> setFetchMode(PDO::FETCH_ASSOC);
while($rows = $result ->fetch()){
  array_push($ary,$rows);
}
//配列をJSONデータとして出力する
echo '{ "contents": ';
echo json_encode($ary,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
echo '}';
}
?>
