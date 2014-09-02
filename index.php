<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

require_once('includes/common.php');

$handle = &fopen('includes/config.php','r'); // see if the config file is there first...

if ($handle) { // open if there is a config.php file present
	if($_SESSION['username'] != '' && isset($_SESSION['username']))
	{
	 	//require_once("main.php"); 
 		$display = Main(); 	
 		echo $display; 
	}
	elseif ($_SESSION['username'] == "") { // if not, display login prompt
		$show = showlogin(); 
		echo $show; 
	}
}
else { // start the setup process if there is no config file present...
	header("Location: install/install.php"); break;
}
?>