<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// This script is designed to enable sites to perform easy/simple automated server installations
// using a variety of automated (scripted, imaged, etc.) methods.
// Copyright (c) 2006, James Antoniou III
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//    * Neither the name of the University of California, Berkeley nor the
//      names of its contributors may be used to endorse or promote products
//      derived from this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

//require_once('includes/common.php');
require_once('includes/Smarty.class.php'); // our chosen HTML templating engine

function createSetupDirs() {
	// create mirror, tftpboot, and deployment script files directories
	system ('mkdir -p ' . MIRROR_DIR);
	system ('mkdir -p ' . CONFIGFILES);
	system ('mkdir -p ' . TFTPBOOT);

	// create directory structure used by the pxelinux.cfg/default and MAC-specific files
	// eventually this should be populated out of a plugin-type API that determines which
	// operating systems are available for install
	
	$OSes = array(); 
	$ret = loadPlugins(); 
	foreach ($ret as $col => $key) { 
		if ($key['deployable'] == "yes") { // don't bother to setup the mirror and installer trees if the deployable option is set to "no"
			//array_push($OSes,'<div dojoType="TreeNode" title="'. $key['os_friendly_name'] .'" object="add.php?os_name='. $key['os_name'] .'&os_version='. $key['os_version'] .'"></div>');
			system ('mkdir -p '. TFTPBOOT .'/installer/i386/'. $key['os_name'] .'/'. $key['os_version']); 
			
		}
	}
	system ('chown -R ' . WWW_USER .':'. WWW_GROUP .' '. TFTPBOOT); 

}

function checkConfig() { 
	/* function : checkConfig
	
	   purpose:  to check the configuration of the system and return a report of the config
	   values to let the user know what values, if any, need to be resolved before setting up 
	   the system.
	   
	   returns:  an array of the config options that will likely be used to display back to the
	   user using other functions. 
	   
	*/	
	
	/* what do I need to know?
	
		MySQL or Postgres or Oracle DB installed
		Installed OS
		Modules installed (
		PEAR modules installed
		TFTP server
	*/ 
	

	$pear_config = PEAR_Guess();
	$os_vals = checkOS(); 
	$os = $os_vals[0];
	$version = $os_vals[1];
	$values = array();
	array_push($values,$os); // feed back the guessed OS as well
	foreach ($pear_config as $col => $val) { 
		array_push($values,$val); 
	}
	//echo "Quotes: ". $mq . "<BR>";
	array_push($values,$magic_quotes_gpc); 
	return $values;
}

function PEAR_Guess() { 
	/* function : PEAR_Guess()
	
	   purpose:  to determine which PEAR modules required by FastDeploy are or are not installed.
	   Maybe there's a better way to do this internally to the PEAR module itself?
	   
	   returns:  an array of the available/unavailable PEAR modules.
	   
	*/	
	// this isn't very portable to Windoze :)
	$mdb2 = exec("pear list | grep -i MDB2 | grep -v grep | grep -vi MDB2_Driver | awk '{print $1}'");
	$mdb2_ver = exec("pear list | grep -i MDB2 | grep -v grep | awk '{print $2}'");
	$quickform = exec("pear list | grep -i html_quickform | grep -v grep | grep -iv html_quickform_advmultiselect | awk '{print $1}'");
	$quickform_ver = exec("pear list | grep -i html_quickform | grep -v grep | grep -iv html_quickform_advmultiselect | awk '{print $2}'");
	$filesearch = exec("pear list | grep -i file_searchreplace | grep -v grep | awk '{print $1}'");
	$filesearch_ver = exec("pear list | grep -i file_searchreplace | grep -v grep | awk '{print $2}'");
	$quickform_advmultiselect = exec("pear list | grep -i html_quickform_advmultiselect | grep -v grep | awk '{print $1}'");
	$quickform_advmultiselect_ver = exec("pear list | grep -i html_quickform_advmultiselect | grep -v grep | awk '{print $2}'");
	
	if ($mdb2 == "") { $mdb2 = 0; } else { $mdb2 = 1; }
	if ($quickform == "") { $quickform = 0; } else { $quickform_name = 1; }
	if ($filesearch == "") { $filesearch = 0; } else { $filesearch_name = 1; }
	if ($quickform_advmultiselect == "" ) { $quickform_advmultiselect = 0; } else { $quickform_advmultiselect_name = 1; }
	return array(
	"mdb2" => $mdb2,
	"filesearch" => $filesearch,
	"quickform" => $quickform,
	"quickform_advmultiselect" => $quickform_advmultiselect
	);
}

function checkOS() {
	/* function : checkOS
	
	   purpose:  makes simple assumptions of the installed OS based on the existence of certain files.
	   
	   returns:  an array of the "guessed" OS and version number
	   
	*/	
	//$handle = fopen('includes/config.php','r'); // see if the config file is there first...
	$OSes = array("RedHat" => "redhat-release", // we'll use this to determine both RHEL and RH-based dists (CentOS, Whitebox, etc.) 
		    "Debian" => "debian_version",
		    "Ubuntu" => "lsb-release",
		    "SUSE-Linux" => "SuSE-release",
		    "SUSE-Linux-ES" => "sles-release",
		    "Gentoo" => "gentoo-release",
		    "Slackware" => "slackware-version"
		    ); // add others as necessary
		    
	foreach ($OSes as $key => $col) {
		if (file_exists('/etc/'. $col)) {
		//if (fopen('/etc/'. $col, 'r')) { 
			return array($key,exec('cat /etc/'. $col));	
		}
	}
	
}

$template=new Smarty;
$template->left_delimiter = '{{';
$template->right_delimiter = '}}';  
$sets = checkConfig(); 
foreach ($sets as $col => $val) {
	//echo "Col: ". $col ." Val: ". $val ."<BR>";	
	if ($col == "mdb2") {
		if ($val) { 
			$template->assign("mdb2", "yesbox");
			$template->assign("mdb2_toggle", "Yes!"); 
		}
		else {
			$template->assign("mdb2", "nobox");
			$template->assign("mdb2_toggle", "No!"); 
		}
	}
	
	if ($col == "filesearch") {
		if ($val) { 
			$template->assign("filesearch", "yesbox");
			$template->assign("filesearch_toggle", "Yes!"); 
		}
		else {
			$template->assign("filesearch", "nobox");
			$template->assign("filesearch_toggle", "No!"); 
		}
	}
	if ($col == "quickform") {
		if ($val) { 
			$template->assign("quickform", "yesbox");
			$template->assign("quickform_toggle", "Yes!"); 
		}
		else {
			$template->assign("quickform", "nobox");
			$template->assign("quickform_toggle", "No!"); 
		}
	}
	if ($col == "quickform_advmultiselect") {
		if ($val) { 
			$template->assign("quickform_advmultiselect", "yesbox");
			$template->assign("quickform_advmultiselect_toggle", "Yes!"); 
		}
		else {
			$template->assign("quickform_advmultiselect", "nobox");
			$template->assign("quickform_advmultiselect_toggle", "No!"); 
		}
	}
	if ($val == "RedHat") { 
		$tftp_guess = exec("rpm -q -a | grep -i tftpd | grep -v grep | awk '{print $1}'");
		if ($tftp_guess != "") { 
			$template->assign("tftp","yesbox");
			$template->assign("tftp_toggle", "Yes!"); 
		}
	}
	if (($val == "Debian") || ($val == "Ubuntu")) { 
		$tftp_guess = exec("dpkg -l | grep -i tftpd | grep -v grep | awk '{print $2}'");
		if ($tftp_guess != "") { 
			$template->assign("tftp","yesbox");
			$template->assign("tftp_toggle", "Yes!"); 
		}
		else {
			$template->assign("tftp","nobox");
			$template->assign("tftp_toggle", "No!");
			$template->assign("tftp_refresh","<a id=check href=\"check.php?i=tftp\" class=\"fixLayer\">Check again</a>"); 
		}
	}
	
}


$template->assign("title","Fastdeploy :: Automated Operating System Install Services");
$template->assign("css",CSS);
$template->assign("footer",FOOTER_TMP); 
$template->assign("header",HEADER_TMP); 
$template->assign("version",$version); 
$template->assign("os",$os); 
$template->assign("body",$body); 
$template->assign("user",$_SESSION['username']); 
$template->assign("include",$include); 
$template->display("setup.html");	




?>