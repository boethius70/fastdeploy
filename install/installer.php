<?php
// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:

//   http://www.fastdeploy.com/copyright 

function & eval_lib($d, $f) {
	return file_exists($d ."/". $f) ? require_once($d ."/". $f) : null; 
}

function server_type () { 
	// function: server_type 
	// purpose:  to determine if running server is Windows or UNIX-type 
	
	$check_server = $_SERVER['SERVER_SOFTWARE'];
	if (ereg("Win32", $check_server)) { // this is probably a really poor test and needs to be run against a lot more servers 
				      // e.g., IIS, etc. 
		return $server = "Windows"; 
	}
	else { 
		return $server = "UNIX"; 
	}
}
// this is a basic error trap to deal with the lack of certain basic pre-requisites, like PEAR. 

$libdirs = array(__FILE__,"/usr/share/php","/usr/share/pear"); // this is probably a pretty standard php include path
$libfiles = array('PEAR/Registry.php'); 		   // should I have more?

$count = 0; 
$ar = array(); 
for ($a=0; $a < sizeof($libdirs); $a++) { 
	for ($b=0; $b < sizeof($libfiles); $b++) { 
		if (eval_lib($libdirs[$a],$libfiles[$b])) {
			require_once($libdirs[$a] ."/". $libfiles[$b]); // redundant?
			$count++; 
		}
		else {
			array_push ($ar,$libfiles[$b]); 
		}
	}
}	
$cfg['appliance'] = 0; // flip this bit if you will be running this inside a VM appliance - activates DHCP config options
define("APPLIANCE", $cfg['appliance']); 

if ($count < 1) {
	$return_error = "<HTML><HEAD><TITLE>Fastdeploy : Minimum pre-requisites not met</TITLE>
	<STYLE>
	FONT { font: normal 90% 'Trebuchet MS', 'Lucida Grande', Arial, sans-serif; }
	.bluebox { border : solid 1px #000000; background-color : lightgrey} 
	A:visited { color : black; }
	</STYLE>
	</HEAD>
	<BODY BGCOLOR=#FFFFFF> 
	<CENTER>
	<TABLE WIDTH=342 CELLSPACING=0 BORDER=0 CELLPADDING=0> 
	<TR><TD><A HREF=\"/install/install.php\"><IMG SRC=\"../images/fastdeploy-logo-1-narrow.png\" BORDER=0></A></TD></TR>
	</TABLE>
	<TABLE WIDTH=342 CELLSPACING=0 BORDER=0 CELLPADDING=0 CLASS=\"bluebox\"> 
	<TR><TD>
	<FONT>
	<CENTER>
	<H3>PEAR toolkit required!</H3>
	</CENTER>
	<HR NOSHADE>
	Sorry, but at a minimum you <b>must</b> have PHP's PEAR toolkit installed.  There are two methods to
	get this installed: 
	<OL>
		<LI> Use your operating system's tools to install it; e.g., 
			(in CentOS, RHEL, or RH-derivative OSes): <BR>
			yum -y install php-pear<BR><BR>
		In Debian and Debian-derivative distributions: 
			apt-get install php-pear<BR><BR>
			Other operating systems will be different of course and they may not have a packaged copy of PEAR available. 
			</LI>
		<LI> Run the go-pear script to install PEAR manually:<BR><BR>
		# lynx -source http://pear.php.net/go-pear | php -q
		</LI> 		
	</OL>
	No clues still?  Try these support resources: 
	<UL>
		<LI> User community support:  <A HREF=\"http://www.fastdeploy.com/forum\">Fastdeploy Forums</A></LI>
		<LI> Instant Messenger - Yahoo/AIM: serverminds MSN: sales@serverminds.com </LI> 
		<LI> <A HREF=\"http://secure.serverminds.com/whmcs/contact.php\">Email contact form</A></LI>
	</UL> 
	</FONT>
	</TD></TR>
	<TR><TD ALIGN=MIDDLE BGCOLOR=#1276A9><FONT COLOR=WHITE><BR><B><A HREF=\"/install/install.php\">Installed PEAR?  Click here to try again</A><BR></TD></TR>
	</TABLE>
	</CENTER>
	</BODY>
	</HTML>
	"; 
	echo $return_error;
	exit; 
}

require_once ("../includes/Smarty/Smarty.class.php"); // including this in the Fastdeploy code for now... this is to make the installer 
					    // as pre-requisite-independent as possible.  Let's not make it hard for users to 
					    // use this!
					 
class FD_Installer { 

	function FD_Installer() {
		
	}
	function run_template($num,$body,$error,$vars,$hidden,$desc) { 
		$template=new Smarty;
		$template->left_delimiter = '{{';
		$template->right_delimiter = '}}';   
		$template->template_dir='templates/language/English'; // we'll have a "preload" or interim stage script eventually that lets us choose our language
		$template->assign("title","Fastdeploy :: Automated Operating System Install Services :: Installation ");
		$template->assign("css","css/installer.css");
		$template->assign("js","js/installer.js");
		$template->assign("step","steps.html"); 
		$number = $num; 
		$next_number = $num+1; 
		$template->assign("step_url","step=$next_number"); 
		$template->assign("step_back_url","step=$back_number"); 
		$template->assign("number",$number); 
		$template->assign("step_description",$desc); 
		$template->assign("body",$body); 
		$template->assign("error",$error); 
		$template->assign("hidden",$hidden);
		if ($num != "9") { // don't display this on the last page
			$template->assign("next_button","<input type=submit value=\"Next\">"); 
		}
		if (is_array($vars)) { // this allows us to throw whatever bucket of template assignable values we want at the script
			foreach ($vars as $col => $val) { 
				$template->assign($col,$val); 	
			}	
		}
		$template->assign("user",$_SESSION['username']); 
		$template->display("main.html");
	}
	
	function pearTest($package) { 
		require_once 'PEAR/Registry.php'; 
		$peartest = new PEAR_Registry(); 
		return $peartest->packageExists($package); 
	}
	
	function validate_email($email_raw) {
		    // replace any ' ' and \n in the email
		    $email_nr = eregi_replace("\n", "", $email_raw);
		    $email = eregi_replace(" +", "", $email_nr);
		    $email = strtolower( $email );
		    // do the eregi to look for bad characters
		    	if( !eregi("^[a-z0-9]+([_\\.-][a-z0-9]+)*". "@([a-z0-9]+([\.-][a-z0-9]+))*$",$email) ){
			      	// okay not a good email
			      	$feedback = 'Error: "' . $email . '" is not a valid e-mail address!';
			      	return 0;
			} 
			/* else {
			      	// okay now check the domain
			      	// split the email at the @ and check what's left
			      	$item = explode("@", $email);
			      	$domain = $item["1"];
				if ( ( gethostbyname($domain) == $domain ) ) {
			         		if ( gethostbyname("www." . $domain) == "www." . $domain ) {
		               			$feedback = 'Error: "' . $domain . '" is most probably not a valid domain!';
		               			return $feedback;
		             		}
		        		
		           		$feedback = "valid";
		           		return array(1,$feedback);
		        		} 
		        		else {
		        			$feedback = "valid";
		        			return array(1,$feedback); 
		        		}	*/
		    
		        	else { 
		        		return 1; 
		        			
		      	}
    	}
	
	function DB_Test($db) { 
		// check for MySQL or PostgreSQL - checks by running copy NOT by installed packages
		$mysql_db_test_exec = system('ps -ef | grep -i mysqld | grep -v grep | wc -l'); 
		if ($mysql_db_test_exec == 0) { 
			$pgsql_db_test_exec = system('ps -ef | grep -i postgres | grep -v grep | wc -l'); 	
			if ($pgsql_db_test_exec == 0) { 
				$db_test_exec = 0; 	
			}
			else {
				$db_test_exec = 1;	
				$db = "PostgreSQL"; 
			}
			
		}
		else { 
			$db_test_exec = 1; 
			$db = "MySQL"; 	
		}
		return array($db_test_exec,$db); 
	}
	function draw_hidden($name,$value) { 
		return '<input type="hidden" name="' . $name . '" value="' . $value . '">';
	}
	
	function create_hidden() { // used to create hidden fields based on received $_POST values - cribbed from oSCommerce
		reset($_POST);
		$hiddens = array(); // full array of all hidden values
	      	while (list($key, $value) = each($_POST)) {
	        		if (($key != 'x') && ($key != 'y')) {
	          		if (is_array($value)) {
	            			for ($i=0; $i<sizeof($value); $i++) {
	              				array_push($hiddens,FD_Installer::draw_hidden($key . '[]', $value[$i]));
	            			}
	          		} 
	          		else {
	            			array_push($hiddens,FD_Installer::draw_hidden($key, $value));
	          		}
	        		}	
	      	}
	      	return implode ("\n",$hiddens); 
	}
	
	function DB_Setup() {
		$error_code_return = array();
		foreach ($_REQUEST as $col => $val) { 
			if ($val == "") { 
				$error_result = 0; // immediately error out
				array_push($error_code_return,"Field ". $col ." empty "); 
			}
			elseif ($val != "") {
				if ($col == "db") { $db = $val; }
				if ($col == "dbhost") { $dbhost = $val; }
				if ($col == "dbuser") { $dbuser = $val; }
				if ($col == "dbpassword") { $dbpassword = $val; }
				if ($col == "db_setup_username") { $db_setup_username = $val; }
				if ($col == "db_setup_password") { $db_setup_password = $val; }
			}
		}
		$dsn = array('phptype' => 'mysql',
			'username' => $db_setup_username,
			'password' => $db_setup_password,
			'hostspec' => $dbhost,
			); 
		require_once('MDB2.php'); 
		$con =& MDB2::connect($dsn);
		if (PEAR::isError($con)) {
		    	array_push($error_code_return,$con->getMessage());
		}
		else { 
			// let's create the database first... verify it doesn't exist first...
			
			$check_access = $con->query("CREATE DATABASE ". $db .""); 
			// now let's add the user... 
			$user_access = $con->query("GRANT SELECT,INSERT,UPDATE,DELETE,INDEX ON ". $db .".* TO '". $dbuser ."'@'localhost' IDENTIFIED BY '". $dbpassword ."'"); 
			// now let's import the schema
			$schema = exec ('mysql -u '. $db_setup_username .' --password='. $db_setup_password .' '. $db .'< ../scripts/sql/fastdeploy.mysql'); 
			$run_privileges = exec ('mysql -u '. $db_setup_username .' --password='. $db_setup_password .' -e "FLUSH PRIVILEGES" '); 
			$error_result = 1; 
			
		}
		$error_code_return=implode("<BR>", $error_code_return); 
		return (array($error_result,$error_code_return)); 	
	}
	
	function web_check() { 
		// none of this will apply in windoze environments... needs to be more portable
		$web_running_check = exec("ps -ef | grep -i http | grep -v grep | grep -v root | awk '{ print $1 }' | wc -l"); 	
		$web_user_check = exec("ps -ef | grep -v grep | grep -v root | grep -i -m1 httpd | awk '{ print $1 }'"); 
		// some OSes don't use httpd as the binary name
		$apache_web_running_check = exec("ps -ef | grep -i apache2 | grep -v grep | grep -v root | awk '{ print $1 }' | wc -l"); 
		$apache_web_user_check = exec("ps -ef | grep -v grep | grep -v root | grep -i -m1 apache2 | awk '{ print $1 }'"); 
		
		if ($web_user_check != "") { 
			$local_web_user_check = exec("grep -i ". $web_user_check ." /etc/passwd"); 
		}
		elseif ($apache_web_user_check != "") { 
			$local_web_user_check = exec("grep -i ". $apache_web_user_check ." /etc/passwd"); 
		}
		
		list ($username,$passwd,$uid,$gid,$gecos,$home,$shell) = split(":",$local_web_user_check); 	
		if (($web_running_check > 0) || ($apache_web_running_check > 0)){ 
			if ($web_running_check > 0) { 
				return (array(1,$web_user_check,$uid)); 
			}
			elseif($apache_web_running_check > 0) {
				return (array(1,$apache_web_user_check,$uid)); 
			}
		}	
	}
	
	function path_check() {
		return getcwd(); // return the current path to the calling script
	}
	
	function create_config() { // create Fastdeploy config.php file
		$filename = $_REQUEST['basename'] ."/includes/config.php"; 
		$config_content = '<?php
// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

$cfg["db"] = "'. $_REQUEST['db'] .'"; // your database name
$cfg["dbhost"] = "'. $_REQUEST['dbhost'] .'"; // your database server name/IP
$cfg["dbuser"] = "'. $_REQUEST['dbuser'] .'"; // a database user who has SELECT, CREATE, DELETE privs on this DB
$cfg["dbpassword"] = "'. $_REQUEST['dbpassword'] .'";  // this database users password
$cfg["dbtype"] = "mysql"; // MySQL only for now; support for postgres, oracle forthcoming

// operating system mirror directories - i.e., where we want to store 
// lots and lots and lots of OS files (50+ gigs; the more the better); 
$cfg["mirror_server"] = "'. $_REQUEST['mirror_server'] .'"; // take your pick
$cfg["mirror_dir"] = "'. $_REQUEST['mirror_dir'] .'"; // some local NFS/NAS/SAN filesystem slice; WWW server user needs write access!

// tftp and netboot config options
$cfg["baseurl"] = "'. $_REQUEST['baseurl'] .'"; // FastDeploy servers base Web server URL
$cfg["tftpboot"] = "'. $_REQUEST['tftpboot'] .'"; // used by the TFTP server (must be writeable by web server user)
$cfg["configfiles"] = "'. $_REQUEST['basename'] .'/configs/"; // used to write Kickstart, Debian, etc. files (must be writeable by web server user)
$cfg["configfiles_url"] = "'. $_REQUEST['baseurl'] .'/configs/"; // used by pxelinux.cfg/default, etc. files to load Kickstart/Preseed etc. 
							         // by http://, ftp:// etc. 
$cfg["templates"] = "'. $_REQUEST['basename'] .'/files/"; // OS script template script files (Kickstart, Pre-seed, Unattended, etc. scripts)							     
$cfg["bootconfig"] = "'. $_REQUEST['tftpboot'] .'/pxelinux.cfg/"; // second-stage boot loader file location; stores server-/mac address-specific files here.
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
$cfg["email"] = "'. $_REQUEST['email'] .'"; // this definition attempts to follow the ISO 639.2 convention
$cfg["email_message"] = "'. $_REQUEST['email_message'] .'";

// anonymous stats option 
$cfg["anonstats"] = "'. $_REQUEST['anonstats'] .'"; // send anonymous statistics (OS name, OS version, binary hash based on the session ID) to FastDeploy

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
'; 
			
		if (file_exists($filename)) { // verify the file's there first off - it normally wouldn't be on a first install
			if (is_writable($filename)) { 
				if (!$handle = fopen($filename,'w')) { 
					echo 'Cannot open filename: '. $filename .'<BR>';
					exit;
				}	
				if (fwrite ($handle, $config_content) === FALSE) {
					echo "Unable to write to file $filename"; 
					exit;
				}
				return ("Configuration file written successfully"); 
				fclose($handle); 
			}
			else {
				// can't open the file for some reason, even though it exists
				echo 'Cannot open filename: '. $filename .'<BR>';
				exit;
				
			}
		}
		else {
			if (!$handle = fopen($filename,'a')) { 
					echo 'Cannot open filename: '. $filename .'<BR>';
					exit;
			}	
			if (fwrite ($handle, $config_content) === FALSE) {
					echo "Unable to write to file $filename"; 
					exit;
			}
			return ("Configuration file written successfully"); 
			fclose($handle); 
		}
	}
	
	function change_local_configs() { 
		/**
		 * function: change_local_configs()
		 * purpose:  Alters local files used by Fastdeploy that might have server-specific information in them. 
		 * An example would be files/generic/centos-5-lamp.cfg
		 *
		*/
		require_once('File/SearchReplace.php'); // used to do easy textual search-and-replace and it's used by FD anyway
		// better chown the directory if at all possible
		$dir = $_REQUEST['basename'] .'/files/generic';
   		if (is_dir($dir)) { 
   			if ($dh = opendir($dir)) {
		        		while (($file = readdir($dh)) !== false) {
		            		if (preg_match("/\.cfg/",$file)) { // only pickup *.cfg files
		            			//echo "File: ". $file ."<BR>"; 
		            			$change_cfg = new File_SearchReplace("http://10.187.55.10/mirrors",$_REQUEST['mirror_server'], $_REQUEST['basename'] .'/files/generic/'. $file); 
						$change_cfg->doSearch();
						$change_cfg = new File_SearchReplace("http://10.50.1.91/mirrors",$_REQUEST['mirror_server'],  $_REQUEST['basename'] .'/files/generic/'. $file); 
						$change_cfg->doSearch();
						$change_cfg = new File_SearchReplace("http://beta.fastdeploy.com/mirrors",$_REQUEST['mirror_server'],  $_REQUEST['basename'] .'/files/generic/'. $file); 
						$change_cfg->doSearch();
		            		}
		        		}
		        		closedir($dh);
			}	   		
   		}
   		
   		$modules_dir = $_REQUEST['basename'] .'/modules';
   		if (is_dir($modules_dir)) { 
   			if ($modules_dh = opendir($modules_dir)) {
		        		while (($modules_file = readdir($modules_dh)) !== false) {
		            		if (preg_match("/\.php/",$modules_file)) { // only pickup *.php module files
		            			$base_OS_name = preg_replace('/\.php/','',$modules_file); 
		                   			$change_modules = new File_SearchReplace("\"os_mirror_local\" => 1","\"os_mirror_local\" => ". $_REQUEST['os_mirror_local_'. $base_OS_name .''] ."", $_REQUEST['basename'] .'/modules/'. $modules_file); 
						$change_modules->doSearch();
						// deal with already toggled mirrors as well...
						$change_modules = new File_SearchReplace("\"os_mirror_local\" => 0","\"os_mirror_local\" => ". $_REQUEST['os_mirror_local_'. $base_OS_name .''] ."", $_REQUEST['basename'] .'/modules/'. $modules_file); 
						$change_modules->doSearch();			
		            		}
		        		}
		        		closedir($modules_dh);
			}	   		
   		}
   		// now let's change the local mirror options used in all of the modules
   		$cwd_change = new File_SearchReplace("currentworkingdirectory",$_REQUEST['basename'],$_REQUEST['basename'] ."/includes/common.php");
		$cwd_change->doSearch(); 
		// deal with potential development dirs as well.  NEED BETTER BUILD PREP! :)
		
   		$cwd_change = new File_SearchReplace("/www/fastdeploy.com/fastdeploy/trunk",$_REQUEST['basename'],$_REQUEST['basename'] ."/includes/common.php");
		$cwd_change->doSearch(); 
   		$cwd_change = new File_SearchReplace("/var/www/html/fastdeploy/trunk",$_REQUEST['basename'],$_REQUEST['basename'] ."/includes/common.php");
		$cwd_change->doSearch(); 
	}
		
	function check_libs() {
		$prereqs = array("HTML_QuickForm" => FD_Installer::pearTest('HTML_QuickForm'),
				"File_SearchReplace" => FD_Installer::pearTest('File_SearchReplace'),
				"MDB2" => FD_Installer::pearTest('MDB2'), 
				"HTML_QuickForm_advmultiselect" => FD_Installer::pearTest('HTML_QuickForm_advmultiselect'),
				"Database Server" => FD_Installer::DB_Test(),  
				  
			); 
			
		foreach ($prereqs as $key => $val) { 
			if ($val == '0') { $return_code = "<font color='red'>Not installed</font>"; $error_not_installed = "1"; } // need language/internationalization sensitivity here...
			elseif ($val == '1') { $return_code = "Installed"; $error_installed = "0"; } 
			if ($key == "Database Server") {
				if ($val[0] == '1') { 
					$error_installed = "0";
					$return_code = "Installed :: ". $val[1] .""; 
				}
				else {
					$error_not_installed = "1";
					$return_code = "<font color='red'>Not Installed</font>";
				}
			}
			
			$body .= "<tr><td align=right><B>". $key  ."</B></TD><TD ALIGN=right STYLE='background-color : lightgrey'>". $return_code ."</TD></TR>"; 
		}
		//echo "NI:". $error_not_installed ."<BR>";
		if ($error_not_installed) {
				$body .= "
				<INPUT TYPE=HIDDEN VALUE=\"1\" NAME=not_installed>
				<tr><td COLSPAN=2 STYLE='background-color : lightgrey' align=LEFT WIDTH=500>
				If you're not sure how to install these necessary PHP PEAR libraries, you may want to try
				any of the following methods: 
				<OL><LI> Install from a distribution-specific package; e.g., <BR>
				    # yum -y install php-pear-MDB2 
				    </LI>
				    <LI> Use PEAR from a command-line to install the package: 
				    <BR>
				         # pear install MDB2 && pear install MDB2_Driver_mysql && pear install HTML_QuickForm
				    <BR>
				    </LI> 
				    <LI> Use PEAR's Web or command-line interface.  You'll probably want to make sure PEAR is updated first and run
				    through go-pear.org to verify it's all installed and updated properly: 
				    <BR>
				    # lynx -source http://pear.php.net/go-pear | php -q
				    <BR>
				    </LI>
				    <LI> Use Fastdeploy's DEB/RPM repository:  
				    For Debian - add to /etc/apt/sources.list:  <BR>
				    <BR>
				    echo '# Fastdeploy
				   deb http://www.serverminds.com/debian stable main contrib non-free' >> /etc/apt/sources.list 
				  <BR>
				   ...then...
				  <BR>
				   apt-get install fastdeploy 
				   <BR>
				   ...and this will take care of all the dependencies for you automatically.		    	
				    </LI> 
				   </OL>
				"; 
		}
		return $body; 
	}
	
	function create_dir_structure () {
		/**
		 * function: change_dir_structure()
		 * purpose:  Create tftpboot installer directory structure
		*/
		// this should "just work" because the web_check function check ran during step_5 so the web server user should have the perms to create
		$ARCHES = array("i386","x86_64","ia64"); 
		
		for ($a = 0; $a < sizeof ($ARCHES); $a++) { 
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Debian/4');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Debian/3_1');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/CentOS/4_4');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/CentOS/4_5');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/CentOS/5');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Fedora/4');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Fedora/5');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Fedora/6');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Fedora/7');			
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/RedHat/4/Enterprise');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/RedHat/5/Enterprise');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/VMware/3');
			system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/'. $ARCHES[$a] .'/Ubuntu/6_10');
		}
		
		for ($b = 0; $b < sizeof ($ARCHES); $b++) { 
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Debian/4'); // debian/ubuntu pool CPU archs inside the pool dir - not needed 
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Debian/3_1');
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/CentOS/4_4/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/CentOS/4_5/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/CentOS/5/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Fedora/4/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Fedora/5/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Fedora/6/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Fedora/7/'. $ARCHES[$b]);			
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/RedHat/4/Enterprise/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/RedHat/5/Enterprise/'. $ARCHES[$b]);
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/VMware/3/ESX');
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Ubuntu/6_10');
			system ('mkdir -p '. $_REQUEST['mirror_dir'] .'/Windows'); // all Windows OS images will generically go in here
		}
		// populate the TFTPBOOT directory
		system ('cp -a '. $_REQUEST['basename'] ."/tftpboot/* ". $_REQUEST['tftpboot'] .""); 
		// for Windows only 
		system ('mkdir -p '. $_REQUEST['tftpboot'] .'/installer/i386/wininst'); // CPU arch. not important here - may be in the future?
	}
	
	function create_admin_user() {
		/**
		 * function: create_admin_user()
		 * purpose:  Create Fastdeploy admin user
		*/
		$error_code_return = array();
		foreach ($_REQUEST as $col => $val) { 
			if ($val == "") { 
				$error_result = 0; // immediately error out
				array_push($error_code_return,"Field ". $col ." empty "); 
			}
			elseif ($val != "") {
				if ($col == "db") { $db = $val; }
				if ($col == "dbhost") { $dbhost = $val; }
				if ($col == "dbuser") { $dbuser = $val; }
				if ($col == "dbpassword") { $dbpassword = $val; }
				if ($col == "db_setup_username") { $db_setup_username = $val; }
				if ($col == "db_setup_password") { $db_setup_password = $val; }
			}
		}
		$dsn = array('phptype' => 'mysql',
			'username' => $db_setup_username,
			'password' => $db_setup_password,
			'hostspec' => $dbhost,
			);
		require_once('MDB2.php'); 
		$con =& MDB2::connect($dsn);
		if (PEAR::isError($con)) {
		    	array_push($error_code_return,$con->getMessage());
		}
		else {
			// now let's add the user... 
			$user_access = $con->query("INSERT INTO ". $db .".users (`customer_id`, `password`, `email`, `first_name`, `last_name`, `fd_group`) VALUES ('". $_REQUEST['adminuser'] ."', '". md5($_REQUEST['adminpass']) ."', '". $_REQUEST['email'] ."', 'Fastdeploy', 'Admin', 'admin')"); 
		}
	
	}
	
	function create_rsyncd() { 
		/**
		 * function: change_rsyncd()
		 * purpose:  Create rsyncd.conf example for use with this server. 
		*/
		$rsyncd_conf = 'rsyncd.conf';
		$rsyncd_content = "use chroot = true
read only = true
uid = nobody
gid = nobody
transfer logging = true
timeout = 600

#Repository mirror
[installs]
        path = ". $_REQUEST['mirror_dir'] ."
        comment = Repository mirror
";
	
			if (!$handle = fopen($_REQUEST['basename'] .'/'. $rsyncd_conf,'w')) { 
				echo 'Cannot open filename: '. $rsyncd_conf .'<BR>';
				exit;
			}	
			if (fwrite ($handle, $rsyncd_content) === FALSE) {
				echo "Unable to write to file $filename"; 
				exit;
			}
			return ("Configuration file written successfully"); 
			fclose($handle); 
	
	}
	
	function netcalc ($ip,$netmask) { 
		require_once("../includes/SubnetCalc.php"); // nifty php script from sourceforge
		
		$bin_nmask=dqtobin($netmask);
		$bin_wmask=binnmtowm($bin_nmask);
		if (ereg("0",rtrim($bin_nmask, "0"))) {  //Wildcard mask then? hmm?
			$bin_wmask=dqtobin($netmask);
			$bin_nmask=binwmtonm($bin_wmask);
			if (ereg("0",rtrim($bin_nmask, "0"))){ //If it's not wcard, whussup?
				return 0; 
			}
		}
		
		$cdr_nmask=bintocdr($bin_nmask);
		$bin_host=dqtobin($ip);
		$bin_bcast=(str_pad(substr($bin_host,0,$cdr_nmask),32,1));
		$bin_net=(str_pad(substr($bin_host,0,$cdr_nmask),32,0));
		$bin_first=(str_pad(substr($bin_net,0,31),32,1));
		$bin_last=(str_pad(substr($bin_bcast,0,31),32,0));
		$host_total=(bindec(str_pad("",(32-$cdr_nmask),1)) - 1);
		
		if ($host_total <= 0){  //Takes care of 31 and 32 bit masks.
			$bin_first="N/A" ; $bin_last="N/A" ; $host_total="N/A";
			if ($bin_net === $bin_bcast) $bin_bcast="N/A";
		}
		
		return array(bintodq($bin_net),bintodq($bin_bcast));
		
	}
	
	function build_initrd() {
		/* function:  build_initrd 
		
		   purpose:  this builds a custom initrd for the Windows boot so we can have an embedded custom URL to retrieve config
		   options from.  Perhaps we can pass a kernel boot option via syslinux to avoid this?
		*/ 
		system("gunzip -c ". $_REQUEST['tftpboot'] ."/installer/i386/wininst/rootfd.cgz > ". $_REQUEST['tftpboot'] ."/installer/i386/wininst/rootfd.cpio"); 
		system("cd ". $_REQUEST['tftpboot'] ."/installer/i386/wininst; mkdir -p tmp; cd tmp; cpio -i < ../rootfd.cpio"); 
		$initrd_change = new File_SearchReplace("http://10.187.55.10",$_REQUEST['baseurl'],$_REQUEST['tftpboot'] ."/installer/i386/wininst/tmp/etc/rc.d/rc.K");
		$initrd_change->doSearch();
		// and deal with other potential URLs embedded inside the cpio image... (lazy me... I should prep certain files for the installer)
		$initrd_change = new File_SearchReplace("http://10.50.1.90",$_REQUEST['baseurl'],$_REQUEST['tftpboot'] ."/installer/i386/wininst/tmp/etc/rc.d/rc.K");
		$initrd_change->doSearch();
		$initrd_change = new File_SearchReplace("http://beta.fastdeploy.com",$_REQUEST['baseurl'],$_REQUEST['tftpboot'] ."/installer/i386/wininst/tmp/etc/rc.d/rc.K");
		$initrd_change->doSearch();
		// will this command-line apply universally to all linux or xBSD or Solaris or...? distributions?  Probably not.
		system("cd ". $_REQUEST['tftpboot'] ."/installer/i386/wininst/tmp; find . -print | cpio -ocBO ../rootfd.cpio; cd ..; rm -rf tmp; "); 
		system("gzip -9c ". $_REQUEST['tftpboot'] ."/installer/i386/wininst/rootfd.cpio > ". $_REQUEST['tftpboot'] ."/installer/i386/wininst/rootfd.cgz ; rm -rf rootfd.cpio"); 
	}
	
	function create_dhcpd_config() { 
		
		$stripped_host = preg_replace("/http:\/\//", "", $_REQUEST['baseurl']); 
		$dhcp_range_start = $_REQUEST['dhcp_range_start_octet1'] .'.'. $_REQUEST['dhcp_range_start_octet2'] .'.'.$_REQUEST['dhcp_range_start_octet3'] .'.'.$_REQUEST['dhcp_range_start_octet4'];
		$dhcp_range_end = $_REQUEST['dhcp_range_end_octet1'] .'.'. $_REQUEST['dhcp_range_end_octet2'] .'.'.$_REQUEST['dhcp_range_end_octet3'] .'.'.$_REQUEST['dhcp_range_end_octet4'];
		$dhcp_subnetmask = $_REQUEST['dhcp_subnetmask_octet1'] .'.'. $_REQUEST['dhcp_subnetmask_octet2'] .'.'.$_REQUEST['dhcp_subnetmask_octet3'] .'.'.$_REQUEST['dhcp_subnetmask_octet4'];
		$dhcp_router =$_REQUEST['dhcp_gateway_octet1'] .'.'. $_REQUEST['dhcp_gateway_octet2'] .'.'.$_REQUEST['dhcp_gateway_octet3'] .'.'.$_REQUEST['dhcp_gateway_octet4'];
		$dhcp_dns1 = $_REQUEST['dhcp_dns1_octet1'] .'.'. $_REQUEST['dhcp_dns1_octet2'] .'.'.$_REQUEST['dhcp_dns1_octet3'] .'.'.$_REQUEST['dhcp_dns1_octet4'];
		
		$ipnetwork = FD_Installer::netcalc($dhcp_router,$dhcp_subnetmask); 
		$dhcpd_content = "option domain-name-servers ". $dhcp_dns1 .";
default-lease-time 600;
max-lease-time 7200;
filename \"pxelinux.0\";
next-server ". $stripped_host .";

subnet ". $ipnetwork[0] ." netmask ". $dhcp_subnetmask ." {
  option subnet-mask ". $dhcp_subnetmask .";
  option broadcast-address ". $ipnetwork[1] .";
  range ". $dhcp_range_start ." ". $dhcp_range_end .";
  option routers ". $dhcp_router .";
}"; 
	$dhcpd_conf = "dhcpd.conf"; 
	if (!$handle = fopen($_REQUEST['basename'] .'/'. $dhcpd_conf,'w')) { 
		echo 'Cannot open filename: '. $dhcpd_conf .'<BR>';
		exit;
	}	
	if (fwrite ($handle, $dhcpd_content) === FALSE) {
		echo "Unable to write to file $filename"; 
		exit;
	}
	return ("Configuration file written successfully"); 
	fclose($handle); 
	}
	
	function finish_final() {
		// final step (?)
		$hidden = FD_Installer::create_hidden(); 
		$body = "fastdeploy_setup_9.html";	
		// what we need now - 
		// 1.  Verified directory structure - mirror dir, etc.
		// 2.  Altered Linux-based Windows initrd image to reflect the Fastdeploy server's IP/hostname
		// 3.  Creation of TFTPBOOT structure - copy of tftpboot relevant files as well (menus, graphics etc.).
		// 4.  Rsync setup for Windows install process.
		// 5.  Guidance for Windows image preparation.
		// 6.  Guidance for mirroring process. 
		// 7.  Links to mirrors and mirror creation tool. 
		// 8.  Generic config files need to be pointed to the newly created Fastdeploy server. 
		FD_Installer::create_dir_structure(); // create tftpboot directory structure - this is necessary for rsync and general mgmt. of the file mirrors to work right
		FD_Installer::change_local_configs(); //  modify the local configuration files.
		FD_Installer::create_rsyncd(); // create the rsyncd.conf config file as an example for running the local rsync server for the Windows process
		FD_Installer::build_initrd(); // modify the Windows boot image to search-and-replace with the new server name/IP address. 
		if ($_REQUEST['dhcpd_toggle']) {
			FD_Installer::create_dhcpd_config(); 
		}
		$desc = FD_Installer::create_config(); 
		FD_Installer::run_template('9',$body,$return_code,$_POST,$hidden,$desc);	
	}
	
	function step_1() {
		
		$body = "fastdeploy_setup_1.html";	
		FD_Installer::run_template('1',$body);
	}
	
	function step_2() {
		$body = FD_Installer::check_libs(); 
		$desc = "Prerequisites";
		
		// ($num,$body,$error_not_installed,$vars,$hidden,$desc)
		
		FD_Installer::run_template('2',$body,$error,NULL,NULL,$desc);
	}
	
	function step_3() { 
		if ($_REQUEST['not_installed']) {
			$body = FD_Installer::check_libs(); 
			$desc = "Prerequisites";
			FD_Installer::run_template('2',$body,$error,NULL,NULL,$desc); 	
		}
		else {
			$hidden = FD_Installer::create_hidden(); 
			$body = "fastdeploy_setup_3.html";	
			$desc = "Database setup";
			FD_Installer::run_template('3',$body,$error,$vars,$hidden,$desc);
		}
	}
	
	function step_4() {
		$check = FD_Installer::DB_Setup(); 
		$path_check = FD_Installer::path_check(); 
		$url_path = parse_url($_SERVER['HTTP_REFERER']); 
		// 'URL Referer: '. $url_path['query'] .'<BR>';
		if (preg_match('/5/',$url_path['query'])) { // move on if we've been here before 
			$body = "fastdeploy_setup_4.html";	
			$hidden = FD_Installer::create_hidden(); 
			$desc = "Path setup";
			FD_Installer::run_template('4',$body,$error,$path_str,$hidden,$desc); // HTML_QuickForm is a lot more appealing now! :)
		}
		elseif ($_POST['basename'] == "") { 
			if ($check[0])  { // move on if there are no errors 
				$path_str = array("basename" => preg_replace("/\/install/","",$path_check)); // let's get our "root" or base path
				$body = "fastdeploy_setup_4.html";	
				$hidden = FD_Installer::create_hidden(); 
				$hidden .= FD_Installer::draw_hidden('database_setup','1'); 
				$desc = "Path setup";
				FD_Installer::run_template('4',$body,$error,$path_str,$hidden,$desc); 
			}
			else { 
				$body = "fastdeploy_setup_3.html";	
				$desc = "Database setup";
				FD_Installer::run_template('3',$body,$check[1],$_POST,$hidden,$desc); 		
			}	
		}
	}
	
	function step_5() {
		
 		$hidden = FD_Installer::create_hidden(); 
 		 
		if (sizeof($_REQUEST) >= 3) { // don't bother to proceed if there aren't enough $_POST vars...
			if (($_REQUEST['basename'] != "") && ($_REQUEST['mirror_dir'] != "") && ($_REQUEST['tftpboot'] != "")) { 
				$perm_check = FD_Installer::web_check(); 
				// now we're going to check filesystem permissions to verify the script has write permission
				// if it doesn't, we're going to get mad and throw a bunch of errors
				$file_mirrors = stat($_REQUEST['mirror_dir']);
				$file_tftpboot = stat($_REQUEST['tftpboot']); 	
				$file_fastdeploy = stat($_REQUEST['basename']); 
				
				if (($perm_check[2] != $file_mirrors['uid']) || ($perm_check[2] != $file_tftpboot['uid']) || ($perm_check[2] != $file_fastdeploy['uid'])) { 
					require_once('templates/language/English/installer_errors.php'); // a bunch of language-specific labels for error messages
					if ($perm_check[2] != $file_mirrors['uid']) {
						$return_code .= $install_error_strings["ERR_MIRRORS_PERM"]."<BR>"; 
					}
					if ($perm_check[2] != $file_tftpboot['uid']) {
						$return_code .= $install_error_strings["ERR_TFTPBOOT_PERM"]."<BR>"; 
					}
					if ($perm_check[2] != $file_fastdeploy['uid']) {
			
						$return_code .= $install_error_strings["ERR_FASTDEPLOY_PERM"]."<BR>"; 
					}
					$desc = "Path setup";
					$body = "fastdeploy_setup_4.html";	
					FD_Installer::run_template('4',$body,$return_code,$_POST,$hidden,$desc);			
				} //
				else { // permissions look good - let's proceed!
					$myurl = preg_replace('/\/install\/install\.php?.*/','',$_SERVER['HTTP_REFERER']); 
					$vars = array("baseurl" => $myurl, "mirror_server" => $myurl ."/mirrors");
					$desc = "URL setup";  
					$body = "fastdeploy_setup_5.html";  //
					FD_Installer::run_template('5',$body,$error,$vars,$hidden,$desc);
				}
			}
			else { // while the $_REQUEST array is big enough, some of the important form fields are blank!... error!
				require_once('templates/language/English/installer_errors.php'); // a bunch of language-specific labels for error messages
				
				if ($_REQUEST['basename'] == "") { 
					$return_code .= $install_error_strings["ERR_FASTDEPLOY"]."<BR>"; 
		
				}
				if ($_REQUEST['tftpboot'] == "") { 
					$return_code .= $install_error_strings["ERR_TFTPBOOT"] ."<BR>"; 
				}
				if ($_REQUEST['mirrors'] == "") { 
					$return_code .= $install_error_strings["ERR_MIRRORS"] ."<BR>"; 
				}
				$body = "fastdeploy_setup_4.html";	
				$desc = "Path setup";
				FD_Installer::run_template('4',$body,$return_code,$_POST,$hidden,$desc);				
			}
			
			
		}
		else {
			require_once('templates/language/English/installer_errors.php'); // a bunch of language-specific labels for error messages
			if ($_REQUEST['basename'] == "") { 
				$return_code .= $install_error_strings["ERR_FASTDEPLOY"]."<BR>"; 
			}
			if ($_REQUEST['tftpboot'] == "") { 
				$return_code .= $install_error_strings["ERR_TFTPBOOT"]."<BR>"; 
			}
			if ($_REQUEST['mirror_dir'] == "") { 
				$return_code .= $install_error_strings["ERR_MIRRORS"]."<BR>"; 
			}
			$desc = "Path setup";
			$body = "fastdeploy_setup_4.html";	
			FD_Installer::run_template('4',$body,$return_code,$_POST,$hidden,$desc);		
		}
		
	}

	function step_6() {
		
		$hidden = FD_Installer::create_hidden(); 
		// for URL configuration
		if ((APPLIANCE) || ($_REQUEST['baseurl'] != "") && ($_REQUEST['mirror_server'] != "")) { 
			// we should have some error checking for the URL formatting here
			$desc = "Email and other setup info";
			$body = "fastdeploy_setup_6.html";	
			FD_Installer::run_template('6',$body,$return_code,$_POST,$hidden,$desc);		
			
		}
		else {
			require_once('templates/language/English/installer_errors.php'); // a bunch of language-specific labels for error messages
			if ($_REQUEST['baseurl'] == "") { 
				$return_code = $install_error_strings["ERR_BASEURL"]; 
			}
			if ($_REQUEST['mirror_server'] == "") { 
				$return_code .= $install_error_strings["ERR_MIRROR_SERVER"]; 
			}
			$body = "fastdeploy_setup_5.html";	
			$desc = "URL setup"; 
			FD_Installer::run_template('5',$body,$return_code,$_POST,$hidden,$desc);
		}
		
	}
	
	function step_7() {
		$hidden = FD_Installer::create_hidden(); 
		// email check
		if ($_REQUEST['email'] != "") { 		
			$check_email = FD_Installer::validate_email($_REQUEST['email']);
		}
		else {
			$check_email = 0; 
		}
		// admin username check
		if ($_REQUEST['adminuser'] == "") { 
			$admin_err = 0; 
		}
		else {
			$admin_err = 1;
		}
		// admin check 
		if ($_REQUEST['adminpass'] == "") { 
			$pass_err = 0; 
		}
		elseif ($_REQUEST['adminpass'] != $_REQUEST['adminpassconfirm']) { 
			$pass_err = 0; 
		}
		else {
			$pass_err = 1; // password's match
		}
		
		// for choosing which OS(es) to mirror
		// what about CPU architectures?
	
		if (($pass_err) && ($check_email) && ($admin_err)) {
			FD_Installer::create_admin_user();
			$body = "fastdeploy_setup_7.html";	
			$desc = "Choose installable operating systems"; 
			FD_Installer::run_template('7',$body,$return_code,$_POST,$hidden,$desc);		
		}
		else {
			require_once('templates/language/English/installer_errors.php'); // a bunch of language-specific labels for error messages
	
			if ($check_email == "0") {
				$return_code .= $install_error_strings["ERR_EMAIL"];
			}
			if ($pass_err == "0") { 
				$return_code .= "<BR>". $install_error_strings["ERR_PASSWORD_ERROR"];
			}
			if ($admin_err == "0") {
				$return_code .= "<BR>". $install_error_strings["ERR_ADMIN_ERROR"];
			}
			$body = "fastdeploy_setup_6.html";	
			$desc = "Email and other setup info";
			
			FD_Installer::run_template('6',$body,$return_code,$_POST,$hidden,$desc);		
		}	
	}
	// rsync setup...?  windows image prep?
	function step_8() {
		$hidden = FD_Installer::create_hidden();
		if (APPLIANCE) { // only run this step if I think it's an appliance like VMware or Xen or hardware..?
			list($octet1,$octet2,$octet3,$octet4) = split('\.',$_SERVER['SERVER_ADDR']); 
			$dns = "/etc/resolv.conf"; // probably? solaris?  BSD?
			$dns_fh = fopen($dns,"r");
			while (!feof($dns_fh)) { // so we can read the DNS server into the octet array below
				$data = fgets($dns_fh); 
				list ($one,$two) = split(" ",$data); 
				if ($one == "nameserver") {
					list($dns_octet1,$dns_octet2,$dns_octet3,$dns_octet4) = split("\.",$two); 
				}	
			}
			fclose($dns_fh); 
			$octets = array("dhcp_range_start_octet1" => $octet1,
				"dhcp_range_start_octet2" => $octet2,
				"dhcp_range_start_octet3" => $octet3,
				"dhcp_range_start_octet4" => "100", // start at 100 - good number :)
				      "dhcp_range_end_octet1" => $octet1,
				      "dhcp_range_end_octet2" => $octet2,
				      "dhcp_range_end_octet3" => $octet3,
				      "dhcp_range_end_octet4" => "200",
				      "dhcp_subnetmask_octet1" => "255",
				      "dhcp_subnetmask_octet2" => "255",
				      "dhcp_subnetmask_octet3" => "255",
				      "dhcp_subnetmask_octet4" => "0",
				      "dhcp_gateway_octet1" => $octet1,
				      "dhcp_gateway_octet2" => $octet2,
				      "dhcp_gateway_octet3" => $octet3,
				      "dhcp_gateway_octet4" => "1",
				      "dhcp_dns1_octet1" => $dns_octet1,
				      "dhcp_dns1_octet2" => $dns_octet2,
				      "dhcp_dns1_octet3" => $dns_octet3,
				      "dhcp_dns1_octet4" => $dns_octet4,
				    ); 
				      
				      
			$desc = "DHCP server setup";
			$body = "fastdeploy_setup_dhcp.html";	
			FD_Installer::run_template('8',$body,$return_code,$octets,$hidden,$desc);	
		}
		else { 
			FD_Installer::finish_final(); 		
		}
	}
	
	function step_9() {
		
			FD_Installer::finish_final(); 
	}
}

?>

