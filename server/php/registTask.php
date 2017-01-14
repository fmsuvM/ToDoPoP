<?php

if(isset($_POST['id'])) 	      $id=$_POST['id'];
if(isset($_POST['title'])) $title=$_POST['title'];
if(isset($_POST['date']))  $date=$_POST['date'];
if(isset($_POST['location']))     $location=$_POST['location'];
if(isset($_POST['username']))     $username=$_POST['username'];

$db = new PDO("sqlite:calendar.sqlite");
$result=$db->query("SELECT * FROM $username");
if(empty($title)||empty($date)||empty($location)||empty('$username')){
	echo'{"results":{"response":"failed","task":"nothing"}}';
}	else if(isset($title))	{
		$db->query("INSERT INTO $username VALUES(null, '$title','$date','$location')");
echo '{"results":{"response":"ok","task":{"title":"' . $title . '","date":"' . $date . '","location":"' . $location .'"}}}' ;
}
?>
