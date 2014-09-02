<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 
 

require_once('includes/common.php'); 	
 
if ($_SESSION['username'] != '') 
{
	$body = FastDeploy::list_profiles();
	echo $body;
}	
else {
	$error['class'] = 'You do not appear to be authenticated'; 
	         header("Location: index.php"); break;	
}
?>