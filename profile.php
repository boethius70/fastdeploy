<?php
// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

// script name:  profile.php
// purpose:  to create generic server / workstation profiles for use by multiple machines

require_once('includes/common.php');

$OSes = array(); 
$ret = loadPlugins(); 
sort($ret,SORT_REGULAR); // sort the array ... 
	array_push($OSes,"<SELECT name=navi onChange=\"go();\">
			<OPTION VALUE=\"\">--- choose a base OS ---></OPTION>"); 
foreach ($ret as $col => $key) { 
	if ($key['deployable'] == "yes") { // don't bother to display if the deployable option is set to "no"
		if ($key['os_subversion'] != '') { // handle subversions of an OS (e.g., "Windows XP >> Professional <<")
			array_push($OSes,'<OPTION VALUE=\'javascript:dojo.widget.byId("docpane").setUrl("add.php?os_name='. $key['os_name'] .'&os_version='. $key['os_version'] .'&os_subversion='. $key['os_subversion'] .'&op=profile_create");\'>'. $key['os_name'] .' '. $key['os_subversion'] .' '. $key['os_version'] .'</OPTION>');
		}
		else { 
			array_push($OSes,'<OPTION VALUE=\'javascript:dojo.widget.byId("docpane").setUrl("add.php?os_name='. $key['os_name'] .'&os_version='. $key['os_version'] .'&op=profile_create");\'>'. $key['os_name'] .' '. $key['os_version'] .'</OPTION>');
		}
	}
}
	array_push($OSes,"</SELECT>");
	$select = implode ("",$OSes);


$template=new Smarty;
$template->left_delimiter = '{{';
$template->right_delimiter = '}}';   
$template->assign("css",CSS);
$template->assign("js",JS);
$template->assign("select_os",$select); 
$template->assign("footer",FOOTER_TMP);     
$template->assign("header",HEADER_TMP); 
$template->assign("body",$body); 
$template->assign("user",$_SESSION['username']); 
$template->display("profile.html");

?>