<?php

if(isset($_POST['triggerTitle'])) 	      $triggerTitle=$_POST['triggerTitle'];
if(isset($_POST['triggerDate'])) 	      $triggerDate=$_POST['triggerDate'];
if(isset($_POST['username'])) 	      $username=$_POST['username'];

if(empty($triggerTitle)||empty($triggerDate)||empty($username)){
  echo 'missing';
}else {

  $db = new PDO("sqlite:calendar.sqlite");
  $sql =  "SELECT count(*) FROM $username WHERE title='$triggerTitle' and date ='$triggerDate'";
  $stmt = $db -> query($sql);
  $count = $stmt ->fetchColumn();

  if( $count  >0 ){

  if(isset($triggerTitle)&&isset($triggerDate))	{
      $db->query("DELETE from $username where title = '$triggerTitle' and date = '$triggerDate'");
  }
  echo '{"result":{"status":"ok"}}' ;
}else{
  echo '{"result":{"status":"failed"}}';
}
}
?>
