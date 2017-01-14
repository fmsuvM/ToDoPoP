<?php
  session_start();
if(isset($_POST['username'])) $username=$_POST['username'];
if(isset($_POST['password'])) $password=$_POST['password'];

if(empty($username)||empty($password)){
echo 'missing';//未入力の場合
}else{

  $db = new PDO("sqlite:calendar.sqlite");
$sql =  "SELECT count(*) FROM users WHERE username='$username' and password ='$password'";
$stmt = $db -> query($sql);
$count = $stmt ->fetchColumn();

if( $count  >0 ){
echo '{"result":{"status":"ok","name":"' . $username. '"}}' ;

}else{
echo '{"result":{"status":"failed"}}';
}
}

?>
