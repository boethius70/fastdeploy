<?php
// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

$cfg["db"] = "fastdeploy"; // your database name
$cfg["dbhost"] = "localhost"; // your database server name/IP
$cfg["dbuser"] = "fastdeploy"; // a database user who has SELECT, CREATE, DELETE privs on this DB
$cfg["dbpassword"] = "fastdeploy";  // this database users password
$cfg["dbtype"] = "mysql"; // MySQL only for now; support for postgres, oracle forthcoming

// operating system mirror directories - i.e., where we want to store 
// lots and lots and lots of OS files (50+ gigs; the more the better); 
$cfg["mirror_server"] = "http://mirrors.fastdeploy.com/mirrors"; // take your pick
$cfg["mirror_dir"] = "/home/mirrors"; // some local NFS/NAS/SAN filesystem slice; WWW server user needs write access!

// tftp and netboot config options
$cfg["baseurl"] = "http://new.fastdeploy.com"; // FastDeploy servers base Web server URL
$cfg["tftpboot"] = "/tftpboot"; // used by the TFTP server (must be writeable by web server user)
$cfg["configfiles"] = "/www/new.fastdeploy.com/configs/"; // used to write Kickstart, Debian, etc. files (must be writeable by web server user)
$cfg["configfiles_url"] = "http://new.fastdeploy.com/configs/"; // used by pxelinux.cfg/default, etc. files to load Kickstart/Preseed etc. 
							         // by http://, ftp:// etc. 
$cfg["templates"] = "/www/new.fastdeploy.com/files/"; // OS script template script files (Kickstart, Pre-seed, Unattended, etc. scripts)							     
$cfg["bootconfig"] = "/tftpboot/pxelinux.cfg/"; // second-stage boot loader file location; stores server-/mac address-specific files here.
						    // maybe we can add option(s) for pxegrub as well here (?)
// template and style-oriented options
$cfg["css"] = "css/fastdeploy.css";
$cfg["js"] = "js/fastDeployCommon.js";

// web user and group - not used at present...
$cfg["www_user"] = "apache"; 
$cfg["www_group"] = "apache";                    

// language and locale settings (more than English later)                                        
$cfg["language"] = "English"; // this definition attempts to follow the ISO 639.2 convention

// email options 
$cfg["email"] = "fd@serverminds.com"; // this definition attempts to follow the ISO 639.2 convention
$cfg["email_message"] = "";

// anonymous stats option 
$cfg["anonstats"] = "yes"; // send anonymous statistics (OS name, OS version, binary hash based on the session ID) to FastDeploy

// authentication mechanism for accounts and logons
$cfg["authmech"] = "mysql";

// adjust php session timeout (minutes)
$cfg["sess_timeout"] = "20";

// generic text to fill out the main page
$cfg["mainpage_body"] ="<BR>
<B>Welcome!</B>
<BR><BR>
Welcome to FastDeploy, a system to automatically deploy operating systems
and relevant applications. 	
<BR><BR>
<B>How do I get started?</B>
<BR><BR>
We include support for several standard operating system distributions so just
pick one on the left-hand menu, enter the options you want to automatically 
configure, then boot your server or workstation off the network and FastDeploy
will handle the rest.
<BR><BR>
<B>How does it work?</B>
<BR><BR>
Pretty simple, actually.  We take your configuration options and write them to
template versions of scriptable install processes such as Kickstart (RedHat, 
CentOS, Fedora Core, etc.), Pre-seeding (Ubuntu, Debian, etc.), and Unattended 
Windows install. 
<BR>";	

$cfg["header_text"] = "";
$cfg["title"] = "Fastdeploy Automated Deployment System";
$cfg["header_logo"] = "fastdeploy-logo-2.png"; 
?>
