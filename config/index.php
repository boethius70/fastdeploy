<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

include_once('../includes/common.php');
require_once('language/Config_'. LANGUAGE .'.php'); // load the form's language file  	

class FDConfig extends HTML_QuickForm { // Note the formatting (strip the "dot" in the version out)              
	function FDConfig() { 
		
		parent::HTML_QuickForm('fdconfigForm','post');
		$returned_values = $this->setForm(); // 
		foreach ($returned_values as $column => $value) { 
			global $default;
			if ($value[1] == "TEXT") {
				$this->addElement($value[1],$value[2],$value[0],$value[4]); 
				$error = $this->errorForm($value[2]);						
				$this->addRule($value[2], $error, $value[3], null);	
			}
			elseif ($value[1] == "SELECT") { 
				if ($value[2] == "anonstats") { 
					$select_array = $this->anonstats(); 
				}
				elseif ($value[2] == "language") { 
					$select_array = $this->languages(); 
				}
				$this->addElement($value[1],$value[2],$value[0],$select_array,$value[4]);
				$error = $this->errorForm($value[2]); 
				$this->addRule($value[2], $error, $value[3]);
			}
			elseif ($value[1] == "ADVMULTISELECT") { // an HTML_QuickForm extension for fancier multi-select form fields		
				$ams = $this->addElement($value[1],$value[2],null,$select_array,$value[4]);
				$error = $this->errorForm($value[2]); 
				$ams->setButtonAttributes('all', 'class=inputCommand');
				$this->addRule($value[2], $error, $value[3]);
			}
			elseif ($value[1] == "TEXTAREA") {
				$this->addElement($value[1],$value[2],$value[0],$value[4]);
				$error = $this->errorForm($value[2]); 
				$this->addRule($value[2], $error, $value[3]);
			}		
		}
		$this->addElement("submit", "checkButton", "Submit");			    
	}
	
	function setForm() { 
		/* function: setForm
		
	  	 purpose:  create the form fields you want.
	   	 
	   	 returns:  array of form fields */ 		
	   	 
		global $form_strings;
					// array offset:  	0		1	2	3	4		5
		$fields = array("LBL_DB" =>array($form_strings['LBL_DB'],"TEXT","db","required",array("size" => "45"),"General Settings"),
			"LBL_DBHOST" => array($form_strings['LBL_DBHOST'],"TEXT","dbhost","required",array("size" => "45"),"General Settings"),
			"LBL_DBUSER" => array($form_strings['LBL_DBUSER'],"TEXT","dbuser","required",array("size" => "45"),"General Settings"),
			"LBL_DBPASSWORD" => array($form_strings['LBL_DBPASSWORD'],"TEXT","dbpassword","required",array("size" => "45"),"General Settings"),
			"LBL_MIRROR_DIR" => array($form_strings['LBL_MIRROR_DIR'],"TEXT","mirror_dir","required",array("size" => "45"),"General Settings"),
			"LBL_MIRROR_SERVER" => array($form_strings['LBL_MIRROR_SERVER'],"TEXT","mirror_server","required",array("size" => "45"),"General Settings"),
			"LBL_BASEURL" => array($form_strings['LBL_BASEURL'],"TEXT","baseurl","required",array("size" => "45"),"General Settings"),
			"LBL_TFTPBOOT" => array($form_strings['LBL_TFTPBOOT'],"TEXT","tftpboot","required",array("size" => "45"),"General Settings"),
			"LBL_CONFIGFILES"  => array($form_strings['LBL_CONFIGFILES'],"TEXT","configfiles","required",array("size" => "45"),"General Settings"),
			"LBL_CONFIGFILES_URL" => array($form_strings['LBL_CONFIGFILES_URL'],"TEXT","configfiles_url","required",array("size" => "45"),"General Settings"),
			"LBL_TEMPLATES" => array($form_strings['LBL_TEMPLATES'],"TEXT","templates","required",array("size" => "45"),"General Settings"),
			"LBL_BOOTCONFIG" => array($form_strings['LBL_BOOTCONFIG'],"TEXT","bootconfig","required",array("size" => "45"),"General Settings"),
			"LBL_LANGUAGE" => array($form_strings['LBL_LANGUAGE'],"SELECT","language","required",array("size" => "1"),"General Settings"),
			"LBL_EMAIL" => array($form_strings['LBL_EMAIL'],"TEXT","email","required",array("size" => "45"),"General Settings"),
			"LBL_ANONSTATS" => array($form_strings['LBL_ANONSTATS'],"SELECT","anonstats","required",array("size" => "1"),"General Settings"),
			);
		 	   	 
	           return $fields; 
	}
	
	function errorForm($val) { 
		/** function: errorForm
	      	 *  purpose:  create the error return values from the form fields you want.
	   	 *  returns:  array of form fields with error codes
	   	 */ 		
	   	 	global $error_strings;
		//form_return ($type,$size,$name,$vals)
		$fields = array("ERR_DB" => array($error_strings['ERR_DB'],"db"),
			"ERR_DBHOST" => array($error_strings['ERR_DBHOST'],"dbhost"),
			"ERR_DBUSER" => array($error_strings['ERR_DBUSER'],"dbuser"),
			"ERR_DBPASSWORD" => array($error_strings['ERR_DBPASSWORD'],"dbpassword"),
			"ERR_DBTYPE" => array($error_strings['ERR_DBTYPE'],"dbtype"),
			"ERR_MIRROR_DIR" => array($error_strings['ERR_MIRROR_DIR'],"mirror_dir"),
			"ERR_MIRROR_SERVER" => array($error_strings['ERR_MIRROR_SERVER'],"mirror_server"),
			"ERR_BASEURL" => array($error_strings['ERR_BASEURL'],"baseurl"),
			"ERR_TFTPBOOT" => array($error_strings['ERR_TFTPBOOT'],"tftpboot"),
			"ERR_CONFIGFILES"  => array($error_strings['ERR_CONFIGFILES'],"configfiles"),
			"ERR_CONFIGFILES_URL" => array($error_strings['ERR_CONFIGFILES_URL'],"configfiles_url"),
			"ERR_TEMPLATES" => array($error_strings['ERR_TEMPLATE'],"templates"),
			"ERR_BOOTCONFIG" => array($error_strings['ERR_BOOTCONFIG'],"bootconfig"),
			"ERR_CSS" => array($error_strings['ERR_CSS'],"css"),
			"ERR_JS" => array($error_strings['ERR_JS'],"js"),
			"ERR_WWW_USER" => array($error_strings['ERR_WWW_USER'],"www_user"),
			"ERR_WWW_GROUP" => array($error_strings['ERR_WWW_GROUP'],"www_group"),
			"ERR_LANGUAGE" => array($error_strings['ERR_LANGUAGE'],"language"), 
			"ERR_EMAIL" => array($error_strings['ERR_EMAIL'],"email"),
			"ERR_EMAIL_MESSAGE" => array($error_strings['ERR_EMAIL_MESSAGE'],"email_message"),
			"ERR_ANONSTATS" => array($error_strings['ERR_ANONSTATS'],"anonstats"),
			"ERR_AUTHMECH" => array($error_strings['ERR_AUTHMECH'],"authmech"),
		      );        
		                
	
		foreach ($fields as $error_col => $error_val) {   	 	   	 
	          	if ($error_val[1] == $val) { // we just return the error text associated with the form field name ($val) and nothing else 
	          		return $error_val[0];  
	          	}     
	        	}               
	}
	
	function anonstats() { 
		return array ("" => "<-- Send anonymous stats to Fastdeploy?", 
			    "yes" => "yes",
			    "no" => "no",
			); 
	}	
	
	function languages() {
		return array("" => "<-- Choose a language",
			   "English" => "English",
			); 
		
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
}

$fdform = new FDConfig(); 
$fdtemplate =& new Smarty;
$fdtemplate->compile_dir  = '/tmp';
$fdtemplate->left_delimiter = '{{';
$fdtemplate->right_delimiter = '}}';   

$fddefaults = array("tftpboot" => TFTPBOOT,
	"configfiles" => CONFIGFILES,
	"configfiles_url" => CONFIGFILES_URL,
	"email" => EMAIL,
	"email_message" => EMAIL_MESSAGE,
	"basename" => BASENAME,
	"baseurl" => BASEURL,
	"db" => DB,
	"dbhost" => DBHOST,
	"dbuser" => DBUSER,
	"dbpassword" => DBPASSWORD,
	"dbtype" => DBTYPE,
	"css" => CSS,
	"js" => JS,
	"mirror_server" => MIRROR_SERVER,
	"mirror_dir" => MIRROR_DIR,
	"bootconfig" => BOOTCONFIG,
	"anonstats" => ANONSTATS,
	"title" => TITLE,
	"language" => LANGUAGE,
	); 
	
if ($_GET['op'] == "edit") { 
	$fdform->setDefaults($fddefaults); 
}
else { 
	$fdform->setDefaults($_GET); 	
}

if ($fdform->validate()) {
	echo "SCHIZE!<BR>";
 	$fdform->freeze(); 
 	$fdform->create_config(); 
	$fdtemplate->display("main.html");
}
else { // display the default form
	// Create the Smarty renderer object that HTML_Quickform will shuffle its output to
	$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($fdtemplate);
	$renderer->setRequiredTemplate(
	     '{{if $error}}
	          <font color="red">{{$label}}</font>
	      {{else}}
	          {{$label}}
	          {{if $required}}
	              <font color="red" size="1">*</font>
	          {{/if}}
	      {{/if}}'
	);
	$rn = '
	<div class="formrow">
	    <span class="formlabel">
	        <span style="font-size:80%; color:#ff0000;">
	        *
	        </span>
	        <span style="font-size:80%;">
	         Denotes required field
	        </span>
	    </span>
	</div>';
	$renderer->setErrorTemplate(
		     '{{if $error}}
		          <font color="red" size="1">{{$error}}</font><br />
		      {{/if}}
		      {{$html}}'
	); 
	$fdform->setRequiredNote($rn); 
		
	// build the HTML for the form
	$fdform->accept($renderer);

	// assign array with form data
	$fdtemplate->assign('form_data', $renderer->toArray());
		
	// parse and display the template
	$fdtemplate->display("config.html");
}
      	
?>