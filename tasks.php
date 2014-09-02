<?php
// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

// script name:  tasks.php
// purpose:  to run generic or specific tasks during the installation process; sort of a wrapper
// for running scripts within DOS, Linux, etc.

require_once('includes/common.php');

$con =& MDB2::connect(unserialize(DSN), $dsn_options);
if (sizeof($_REQUEST) > 0) { 
	$task_chk = $con->queryRow("SELECT task_name,os_name,os_version,os_subversion,script FROM tasks WHERE task_name='". $_REQUEST['task_name'] ."'",null, MDB2_FETCHMODE_ASSOC); 
}
elseif (sizeof($argv) > 0) { 
	$task_chk = $con->queryRow("SELECT task_name,os_name,os_version,os_subversion,script FROM tasks WHERE task_name='". $argv[0] ."'",null, MDB2_FETCHMODE_ASSOC); 
}

echo $task_chk['script'];
?>