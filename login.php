<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

require_once('includes/common.php');

$_SESSION['uid'] = ''; 
$_SESSION['username'] = ''; 
$_SESSION['email'] = ''; 
$_SESSION['first_name'] = ''; 
$_SESSION['last_name'] = ''; 	

//return $result; 
$auth = new fdAuth(AUTHMECH); // check the logon now...

?>