<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

// purpose:  This script is a "front-end" for adding/editin servers
// to the deployment mechanism. 
 
require_once('includes/common.php'); 	
 
if ($_SESSION['username'] != '') 
{
	if ($_REQUEST['op'] != "") {
		$body = FastDeploy::server_op($_REQUEST['op']); 					 	     
	}
	else {
		$body = FastDeploy::server_op("add"); 
	}
	echo $body;
}	
else {
	$error['class'] = 'You do not appear to be authenticated'; 
	         header("Location: index.php"); break;	
}
?>