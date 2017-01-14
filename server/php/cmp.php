<html>
<head>
<title>CMP</title> <meta charset="UTF-8">
</head>
<body>

<h1> タスク一覧 </h1>

<table border=0 cellpadding=0 cellspacing=0>
<td width=50><br>ID</td>
<td width=80><br><b>タイトル</b></td>
<td width=80><br><b>日時</b></td>
<td width=150><br><b>場所</b></td>

<?php

if(isset($_POST['id'])) 	      $id=$_POST['id'];
if(isset($_POST['title'])) $title=$_POST['title'];
if(isset($_POST['date']))  $date=$_POST['date'];
if(isset($_POST['place']))     $place=$_POST['place'];


$db = new PDO("sqlite:calendar.sqlite");
$result=$db->query("SELECT * FROM tasks");
if(isset($title))	{
		$db->query("INSERT INTO tasks VALUES(null, '$title','$date','$place')");
}
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
	for($i = 0; $row=$result->fetch(); ++$i ){
		echo "<tr valign=center>";
		echo "<td >". $row['id']. "</td>";
		echo "<td >". $row['title']. "</td>";
		echo "<td >". $row['date']. "</td>";
		echo "<td >". $row['place']. "</td>";
		echo "</tr>";
	}
?>
