<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

// ** COMMON REQUIREMENTS - PLEASE DON'T CHANGE UNLESS YOU REALLY WANT TO REWRITE THIS
// ** ENTIRE APPLICATION!
if (!isset($_SESSION)) { // why bother to start it if it's already started?
	session_start(); // this will be used across ALL scripts that need or use session variables - don't delete!
	session_cache_expire($cfg['sess_timeout']); 
}

define (CWD,'/www/new.fastdeploy.com');  // to make it universally accessible from all script directories without path consideration

require_once(CWD .'/includes/Smarty/Smarty.class.php'); // our chosen HTML templating engine, bundled w/Fastdeploy
require_once(CWD .'/includes/FastdeployClasses.php'); // standard classes usable by all scripts
include_once('HTML/QuickForm.php'); // our chosen form validation library
require_once('HTML/QuickForm/Renderer/ArraySmarty.php'); // used to render HTML_QuickForm to Smarty templates
require_once('HTML/QuickForm/advmultiselect.php'); // used to render advanced multi-select SELECT menus within QuickForm objects
require_once(CWD .'/includes/config.php'); // the common config file - don't remove this! ever!
require_once('File/SearchReplace.php'); // used for file search-and-replace (OS template files mainly)
require_once('MDB2.php'); // Standard PEAR DB library; used for all database abstraction

define("DB", $cfg['db']); 
define("DBHOST",$cfg['dbhost']);
define("DBUSER",$cfg['dbuser']);
define("DBPASSWORD",$cfg['dbpassword']);
define("DBTYPE",$cfg['dbtype']);
define("CSS",$cfg['css']);
define("JS",$cfg['js']);
define("MIRROR_SERVER",$cfg['mirror_server']);
define("MIRROR_DIR",$cfg['mirror_dir']);

// where tftpboot and kickstart, pre-seed, etc. etc. files are written 
define("BASEURL",$cfg['baseurl']); 
define("TFTPBOOT",$cfg['tftpboot']);
define("CONFIGFILES",$cfg['configfiles']);
define("CONFIGFILES_URL",$cfg['configfiles_url']); 
define("TEMPLATES",$cfg['templates']);
define("BOOTCONFIG",$cfg['bootconfig']);

// define header and footer template files
define("HEADER_TMP",$cfg['header_tmp']);
define("FOOTER_TMP",$cfg['footer_tmp']);

// web user and group
define("WWW_USER",$cfg['www_user']);
define("WWW_GROUP",$cfg['www_group']);

// language and locale settings (more than English later)
define("LANGUAGE",$cfg['language']); 

// email options 
define("EMAIL",$cfg['email']); // what email address update/status messages will be sent from
define("EMAIL_MESSAGE",$cfg['email_message']); // text body of the emails sent out by FastDeploy

// anonymous stats option 
define("ANONSTATS",$cfg['anonstats']); // send anonymous statistics (OS name, OS version, binary hash based on the session ID) to FastDeploy

// authentication mechanism
define("AUTHMECH",$cfg['authmech']); // choose an authentication mechanism

// generic header text
define("HEADER_TEXT",$cfg['header_text']); 
define("MAINPAGE_BODY",$cfg['mainpage_body']); 
define("TITLE",$cfg['title']); 
define("HEADER_LOGO",$cfg['header_logo']); 

define("DSN",serialize(array('phptype' => DBTYPE,  // we are serializing this because this is the only way to declare arrays as constants
	'username' => DBUSER,
	'password' => DBPASSWORD,
	'hostspec' => DBHOST,
	'database' => DB))); 

if ((sizeof($_GET) > 0) && ($_GET['os_name'] != "")) { // the latter is done to avoid problems including these files in other scripts
	if ($_GET['os_subversion'] != "") { // handle subversions (e.g., "Windows XP Professional" or "Redhat Enterprise Linux" etc.)
		define("CLASSFILE_OS",$_GET['os_name'] ."_". $_GET['os_version'] ."_". $_GET['os_subversion'] .".php");
		define("CLASS_OS","OS_". $_GET['os_name'] ."_". $_GET['os_version'] ."_". $_GET['os_subversion'] ."_Deploy");
		define("OPSYS",$_GET['os_name'] ."_". $_GET['os_version'] ."_". $_GET['os_subversion']);
		include('modules/language/'. $_GET['os_name'] .'_'. $_GET['os_version'] .'_'. $_GET['os_subversion'] .'_'. LANGUAGE .'.php'); // kludge to correct a variable scoping problem  
	}
	else {
		define("CLASSFILE_OS",$_GET['os_name'] ."_". $_GET['os_version'] .".php");
		define("CLASS_OS","OS_". $_GET['os_name'] ."_". $_GET['os_version'] ."_Deploy");
		define("OPSYS",$_GET['os_name'] ."_". $_GET['os_version']);
		include('modules/language/'. $_GET['os_name'] .'_'. $_GET['os_version'] .'_'. LANGUAGE .'.php'); // kludge to correct a variable scoping problem  
	}
}									                 // with the $form_strings form label array
elseif ((sizeof($_POST) > 0)  && ($_POST['os_name'] != "")) { // the latter is done to avoid problems including these files in other scripts
	if ($_POST['os_subversion'] != "") { // handle subversions (e.g., "Windows XP Professional" or "Redhat Enterprise Linux" etc.)
		define("CLASSFILE_OS",$_POST['os_name'] ."_". $_POST['os_version'] ."_". $_POST['os_subversion'] .".php");
		define("CLASS_OS","OS_". $_POST['os_name'] ."_". $_POST['os_version'] ."_". $_POST['os_subversion'] ."_Deploy");
		define("OPSYS",$_POST['os_name'] ."_". $_POST['os_version'] ."_". $_POST['os_subversion']);
		include('modules/language/'. $_POST['os_name'] .'_'. $_POST['os_version'] ."_". $_POST['os_subversion'] .'_'. LANGUAGE .'.php'); // kludge to correct a variable scoping problem  
	}
	else {
		define("CLASSFILE_OS",$_POST['os_name'] ."_". $_POST['os_version'] .".php");
		define("CLASS_OS","OS_". $_POST['os_name'] ."_". $_POST['os_version'] ."_Deploy");
		define("OPSYS",$_POST['os_name'] ."_". $_POST['os_version']);
		include('modules/language/'. $_POST['os_name'] .'_'. $_POST['os_version'] .'_'. LANGUAGE .'.php'); // kludge to correct a variable scoping problem  
	}											  // with the $form_strings form label array
}		

// ** Commonly used functions 

function showlogin() {
     if ($_REQUEST['result'] == "err_login") { 
    	$result = "Login unsuccessful : Your login name does not exist"; 
    }
    elseif ($_REQUEST['result'] == "err_pass") { 
    	$result = "Login unsuccessful : Your password is incorrect"; 
    } 
    $template=new Smarty;
    $template->left_delimiter = '{{';
    $template->right_delimiter = '}}';  
    $template->assign("title","Fastdeploy :: Automated Operating System Install Services");
    $template->assign("css",CSS);
    $template->assign("js",JS);
    $template->assign("result", $result); 
    $template->assign("user",$_SESSION['username']); 
    $template->display("login.html");
}

function Main() {
    $template=new Smarty;
    $template->left_delimiter = '{{';
    $template->right_delimiter = '}}';   
    $body = "Welcome to FastDeploy!<HR NOSHADE COLOR=#CCCC99>"; 
    $template->assign("title",TITLE);
    $template->assign("css",CSS);
    $template->assign("js",JS);
    $template->assign("include",""); 
    $template->assign("tree_items_os",FastDeploy::json_menu()); 
    $template->assign("tree_items_manage",FastDeploy::manage_menu()); 
    $template->assign("tree_items_tools",FastDeploy::tools_menu());      
    $template->assign("header_text",HEADER_TEXT);
    $template->assign("header_logo",HEADER_LOGO);
    $template->assign("mainpage_body",MAINPAGE_BODY);
    $template->assign("body",$body); 
    $template->assign("user",$_SESSION['username']); 
    $template->display("index.html");
}

function Main_Too() {
    $template=new Smarty;
    $template->left_delimiter = '{{';
    $template->right_delimiter = '}}';   
    $body = "Welcome to FastDeploy!<HR NOSHADE COLOR=#CCCC99>"; 
    $template->assign("title",TITLE);
    $template->assign("css",CSS);
    $template->assign("js",JS);
    $template->assign("include",""); 
    $template->assign("tree_items_os",FastDeploy::os_menu()); 
    $template->assign("tree_items_manage",FastDeploy::manage_menu()); 
    $template->assign("tree_items_tools",FastDeploy::tools_menu());      
    $template->assign("header_text",HEADER_TEXT);
    $template->assign("header_logo",HEADER_LOGO);
    $template->assign("mainpage_body",MAINPAGE_BODY);
    $template->assign("body",$body); 
    $template->assign("user",$_SESSION['username']); 
    $template->display("index2.html");
}

function pluginVars($val) {
	/* function: pluginVars
   	
   	   purpose:  takes a string and chops off all quote marks, semi-colon, and everything after the semi-colon.
  	   Used to parse out config variables from the OS plugin scripts. 
  	    	   
   	   returns:  "clean" string
   	*/
	$val = preg_replace("/(\")(.*)(\")(;)(.*)/","\\2", $val); // remove all of the string after the semi-colon
	return $val; 
}

function returnParams() { 
	/* function: returnParams
   	
   	   purpose:  a simple-minded little ditty to take $_GET, $_POST, or other arguments to the scripts
   	   and pass them back as a generic container/array of variables.  The intent of this is to make the class scripts generic
   	   enough so they can handle variable passing from any method you want (the web, CLI, sockets, etc.). 
  	    	   
   	   returns:  generic variables to be used by whatever part of the script you want in an array (of course)
   	*/
   	if (sizeof($_GET) > 0) { // Return $_GET superglobals...
   		return $_GET; 
   	}
   	elseif (sizeof($_POST) > 0) { // Return $_POST superglobals...
   		return $_POST; 
	}
	elseif (sizeof($_SERVER["argv"]) > 0) { // Return CLI arguments
		return $_SERVER["argv"]; 	
	}
}
function loadPlugins() { 
	/* function: loadPlugins
   	
   	   purpose:  reads the modules/ directory to populate the list of installable operating systems
   	   
   	   returns:  an array of installable operating system options (name, vendor, version, db_name, etc.)
   	*/
   	$dir = 'modules';
   	$values = array(); 
   	if (is_dir($dir)) { 
   		if ($dh = opendir($dir)) {
		        while (($file = readdir($dh)) !== false) {
		            	if (preg_match("/\.php/",$file)) { // only pickup *.php files
		            		include_once($dir ."/". $file); 
		            		array_push($values, $os_config); 
		            	}
		        }
		        closedir($dh);
		}	   		
   	}
   	//$values = sort($values);
   	return ($values); // return $vars = os_name,os_vendor,os_version, os_subversion, os_shortname, deployable, etc.
}

function loadConfig() { 
	/* function: loadConfig
   	
   	   purpose:  reads the Configuration file (config.php) and returns values to the user
   	   
   	*/
   	$values = array(); 
   	//$lines = file('includes/config.php'); 
   	//foreach ($lines as $line_num => $line) {
   		include_once('includes/config.php'); 
   		echo "DB: ". $cfg['db'] ."<BR>";
   		array_push($values, $cfg['db'],$cfg['dbhost']); 
   	//}
   	return ($values); 
}

function logoff() {
	/* function: logoff
   	
   	   purpose:  logs out of FastDeploy session and reloads the index page
   	   
   	*/
   	// yes, this was cribbed entirely from php.net... ;-)
	session_destroy(); // kill the session
	// cookies are actually not presently used by FastDeploy but this is here "just in case"
	// it is ever put in the code in the future.
	$cookiesSet = array_keys($_COOKIE);
	for ($x = 0; $x < count($cookiesSet); $x++) {
	   if (is_array($_COOKIE[$cookiesSet[$x]])) {
	       $cookiesSetA = array_keys($_COOKIE[$cookiesSet[$x]]);
	       for ($c = 0; $c < count($cookiesSetA); $c++) {
	           $aCookie = $cookiesSet[$x].'['.$cookiesSetA[$c].']';
	           setcookie($aCookie,"",time()-1);
	       }
	   }
	   setcookie($cookiesSet[$x],"",time()-1);
	}
	
}

function checkMAC() {
	$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$check_mac = $con->query("SELECT mac,serverid,sessid FROM servers WHERE mac='". $_POST['mac'] ."'"); // check if the MAC exists already
			if ($check_mac->numRows() > 0) { // there IS an existing MAC address
				return 1; // this logic may seem weird, but it works for the custom QuickForm callback validation rule
			}
			else { 
				return 0; 
			}
		}		
}

function shortMAC($mac) { 
	/**
	 *
	 * function: shortMAC - to shorten the MAC address up for distributions like Debian that require it for the pxelinux append line
	 * 
	 */
	$short_mac = ereg_replace("-", "", $mac); // shorten the MAC address because of pxelinux append line length limits
		 				             // Debian/Ubuntu require more variables to be passed on the append line to
		 				             // fully automate the install.
	return $short_mac = substr($short_mac,8,11); // shorten it even more... conserve on line space
}

function array_push_associative(&$arr) {
	   $args = func_get_args();
	   foreach ($args as $arg) {
	       if (is_array($arg)) {
	           foreach ($arg as $key => $value) {
	               $arr[$key] = $value;
	               $ret++;
	           }
	       }else{
	           $arr[$arg] = "";
	       }
	   }
	   return $ret;
}

 function in_array_multi($needle, $haystack)
    {
        if(!is_array($haystack)) return $needle == $haystack;
        foreach($haystack as $value) if(in_array_multi($needle, $value)) return true;
        return false;
    }

function fd_in_array($value, $array) { // cribbed from osCommerce... thanks!
    if (!$array) $array = array();

    if (function_exists('in_array')) {
      if (is_array($value)) {
        for ($i=0; $i<sizeof($value); $i++) {
          if (in_array($value[$i], $array)) return true;
        }
        return false;
      } else {
        return in_array($value, $array);
      }
    } else {
      reset($array);
      while (list(,$key_value) = each($array)) {
        if (is_array($value)) {
          for ($i=0; $i<sizeof($value); $i++) {
            if ($key_value == $value[$i]) return true;
          }
          return false;
        } else {
          if ($key_value == $value) return true;
        }
      }
    }

    return false;
  }

class fdAuth {
	/**
	 * class:  fdAuth; a modular authentication class (e.g., MySQL, LDAP, PAM?, etc.) 
	 */
	function fdAuth ($method) { 
		if ($method == "mysql") { 
			$mdb2 =& MDB2::factory(unserialize(DSN),$dsn_options);
			if (PEAR::isError($mdb2)) {
			    die($mdb2->getMessage());
			}
			else { 
				$user_check = $mdb2->query("SELECT * FROM users WHERE customer_id='". $_REQUEST['username'] ."'"); 
				if ($user_check->numRows($user_check) > 0) { 
					$fetchit = $user_check->fetchRow($user_check); 
					$fetchpass = $fetchit[2]; //password
					
					if (md5($_REQUEST['password']) != $fetchpass) { 
						$result = "err_pass"; 
						header("Location: index.php?result=". $result .""); break;	
						
					}
					else { // login successful, now let's set all the session variables we think are necessary 
						$_SESSION['uid'] = $fetchit[0];
						$_SESSION['username'] = $fetchit[1];
						$_SESSION['email'] = $fetchit[3];
						$_SESSION['first_name'] = $fetchit[4];
						$_SESSION['last_name'] = $fetchit[5];
						$_SESSION['sessid'] = session_id(); 
						//header("Location: " . (isset($_SERVER["HTTP_REFERER"]) ? $_SERVER["HTTP_REFERER"] : "main.php")); break;
						header("Location: main.php"); break;
					}	
				}
				else { // tell the user the bad news...
					$result = "err_login"; 
					header("Location: index.php?result=". $result .""); break;
				}	
			}
		}	
	}
}

?>
