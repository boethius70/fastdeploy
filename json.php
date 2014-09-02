<?php

// Serverminds Fastdeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

require_once('includes/common.php');


if ($_REQUEST['op'] == "OSes") { 
	$disp = Fastdeploy::json_menu(); 
	echo $disp; 
}
?>