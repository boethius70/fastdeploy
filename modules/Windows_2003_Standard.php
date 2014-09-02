<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

$os_config = array(
	         "os_name" => "Windows",
	         "os_vendor" => "Microsoft",
                   "os_version" => "2003",
                   "os_friendly_name" => "Windows 2003 Standard", 
                   "os_subversion" => "Standard",
                   "os_icon" => "windows_icon.png", 
	         "deployable" => "yes");  // set to no if you want to remove this from the list of installable OSes
                    		   // one file and form language labels may not be at all
                    	             // the same between operating systems                                            
	                                 // standard form field values for this OS 
	                                 
require_once('includes/common.php');


define("OS_NAME",$os_config['os_name']);  // this is being done so we can access these variables to load the language file every time
define("OS_VERSION",$os_config['os_version']); // the setForm() and errorForm() functions are called.  If this plugin is not "loaded" by the
define("OS_SUBVERSION",$os_config['os_subversion']); // the setForm() and errorForm() functions are called.  If this plugin is not "loaded" by the
define("OS_TEMPLATE",$os_config['os_template']); // script calling it it does not find the $form_strings array and the form labels end up missing. 
define("OS_FRIENDLY_NAME",$os_config['os_friendly_name']); // script calling it it does not find the $form_strings array and the form labels end up missing. 
define("OS_ICON",$os_config['os_icon']); 



if ($os_config['os_subversion'] != "") { // handle OS subversioning 
	require_once('modules/language/'. $os_config['os_name'] .'_'. $os_config['os_version'] .'_'. $os_config['os_subversion'] .'_'. LANGUAGE .'.php'); // note the naming convention here      
}
else { 
	require_once('modules/language/'. $os_config['os_name'] .'_'. $os_config['os_version'] .'_'. LANGUAGE .'.php'); // note the naming convention here      
}
class OS_Windows_2003_Standard_Deploy extends HTML_QuickForm { 
	/* display section : actually regurgitate information to the user */ 
	
	function OS_Windows_2003_Standard_Deploy($op) { 
		/* function: OS_*_Deploy()
   	
   	  	   purpose:  displays the default form used for deploying this operating system; also handles
   	             the process of error control and correction using the HTML_QuickForm form creation library
   	   		
   	             returns:  this default form and, if applicable, any errors.
   		*/
   	
   		parent::HTML_QuickForm('displayForm','post');
		$returned_values = $this->setForm(); // 
		foreach ($returned_values as $column => $value) { 
			global $default;
			if ($value[1] == "TEXT") {
					$this->addElement($value[1],$value[2],$value[0],$value[4]); // this is at best unwieldy to refer to the values
					$error = $this->errorForm($value[2]); 			// by their array offset; I will use array keys 
										// in the future; look at the setForm() function
										// to determine what each offset is in the meantime.	
					$this->addRule($value[2], $error, $value[3], null);	
			}
			elseif ($value[1] == "PASSWORD") {
				$this->addElement($value[1],$value[2],$value[0],$value[4]);
				$error = $this->errorForm($value[2]); 
				$this->addRule($value[2], $error, $value[3], null);
			}
			elseif ($value[1] == "SELECT") { 
				if ($value[2] == "tz") {
					$select_array = $this->timezones(NULL); 
				}
				elseif ($value[2] == "addr_type") { 
					$select_array = $this->netaddressing(NULL); 
				}
				elseif ($value[2] == "cpu") { 
					$select_array = $this->architecture(NULL); 
				}
				elseif ($value[2] == "hd") { 
					$select_array = $this->harddrives(NULL); 
				}
				elseif ($value[2] == "notify") { 
					$select_array = $this->notify(NULL); 
				}
				elseif ($value[2] == "lang") {
					$select_array = $this->languages(NULL); 
				}
				elseif ($value[2] == "licensemode") {
					$select_array = $this->licensing(NULL); 
				}
				elseif ($value[2] == "image") {
					$select_array = $this->images();
				}
				
				$this->addElement($value[1],$value[2],$value[0],$select_array,$value[4]);
				$error = $this->errorForm($value[2]); 
				$this->addRule($value[2], $error, $value[3]);
			}
			elseif ($value[1] == "ADVMULTISELECT") { // an HTML_QuickForm extension for fancier multi-select form fields
				if ($value[2] == "software") {
					$select_array = FastDeploy::profile_show(OS_NAME,OS_VERSION); 	
				}		
				$ams = $this->addElement($value[1],$value[2],null,$select_array,$value[4]);
				$error = $this->errorForm($value[2]); 
				$ams->setButtonAttributes('all'     , 'class=inputCommand');
				$this->addRule($value[2], $error, $value[3]);
			}
			elseif ($value[1] == "TEXTAREA") {
				$this->addElement($value[1],$value[2],$value[0],$value[4]);
				$error = $this->errorForm($value[2]); 
				$this->addRule($value[2], $error, $value[3]);
			}		
		}
		// addRule for password validation: 
		$pass_error = $this->errorForm("password_confirm"); 
		$this->addRule(array('password','password_confirm'), $pass_error, 'compare');
		$this->addElement("hidden", "os_name", $_GET['os_name']); // this is important - used by FastDeploy::add_server() for the callback functions
		$this->addElement("hidden", "os_version", $_GET['os_version']); // this is important - used by FastDeploy::add_server() for the callback functions
		$this->addElement("hidden", "os_subversion", $_GET['os_subversion']); // this is important - used by FastDeploy::add_server() for the callback functions
		$this->addElement("text", "os_friendly_name", OS_FRIENDLY_NAME); // this puts a visible indication of what OS is being installed around the tab area
		$this->addElement("text", "os_icon","<img align=top src=images/os/". OS_ICON .">"); 
		$this->addElement("submit", "checkButton", "Submit");			    
	}
	
	/* Semantics section 
	 set and map semantics for form fields and the answer file being used
	 by this operating system */
	
	function setForm() { 
		/* function: setForm
		
	  	 purpose:  create the form fields you want.
	   	 
	   	 returns:  array of form fields */ 		
		
		global $form_strings;
					// array offset:  	0		1	2	3	4		5 (tab header - not used)
		$fields = array("HOSTNAME" => array($form_strings['LBL_HOSTNAME'],"TEXT","hostname","required",array("size" => "25")),
		      "DOMAIN" => array($form_strings["LBL_DOMAIN"],"TEXT","domain","required",array("size" => "25","maxlength" => "100")),
		      "MAC"=> array($form_strings["LBL_MAC"],"TEXT","mac","required",array("size" => "25", "onkeyup" => "chkThis(this);", "onBlur" => "javaFunction('". OS_NAME ."','". OS_VERSION ."','". OS_SUBVERSION ."');")),
		      "MAC_EXISTS"=> array($form_strings["LBL_MAC_EXISTS"],"TEXT","mac_exists",null,null),
		      "ADDR_TYPE" => array($form_strings["LBL_ADDR_TYPE"],"SELECT","addr_type","required",array("size" =>"1","onChange" => "flipit('staticset','addr_type','static','dynamic');"),"General Settings"),
		      "IPADDR" => array($form_strings["LBL_IPADDR"],"TEXT","ipaddr",null,array("size" =>"25"),"General Settings"),
		      "NETMASK" => array($form_strings["LBL_NETMASK"],"TEXT","netmask",null,array("size" =>"25"),"General Settings"),
		      "GATEWAY" => array($form_strings["LBL_GATEWAY"],"TEXT","gateway",null,array("size" =>"25"),"General Settings"),
		      "DNS_1" => array($form_strings["LBL_DNS_1"],"TEXT","dns_1",null,array("size" =>"25"),"General Settings"),
		      "DNS_2" => array($form_strings["LBL_DNS_2"],"TEXT","dns_2",null,array("size" =>"25"),"General Settings"),
		      "PASSWORD" => array($form_strings["LBL_PASSWORD"],"PASSWORD","password","required",array("size" =>"25")),		      
		      "PASSWORD_CONFIRM" => array($form_strings["LBL_PASSWORD_CONFIRM"],"PASSWORD","password_confirm","required",array("size" =>"25")),
		      "LANG" => array($form_strings["LBL_LANG"],"SELECT","lang","required",array("size" =>"1")),
		      "CPU" => array($form_strings["LBL_CPU"],"SELECT","cpu","required",array("size" =>"1")),
		      "HD" => array($form_strings["LBL_HD"],"SELECT","hd","required",array("size" =>"1")), 
		      "TZ" => array($form_strings["LBL_TZ"],"SELECT","tz","required",array("size" =>"1")),
		      "NOTIFY" => array($form_strings["LBL_NOTIFY"],"SELECT","notify",null,array("size" =>"1")),
		      "IMAGE" => array($form_strings["LBL_IMAGE"],"SELECT","image",null,array("size" =>"1")),
		      "TARGETPATH" => array($form_strings["LBL_TARGETPATH"],"TEXT","targetpath","required",array("size" =>"25")),
		      "PRODUCTID" => array($form_strings["LBL_PRODUCTID"],"TEXT","productid","required",array("size" =>"25")),
		      "FULLNAME" => array($form_strings["LBL_FULLNAME"],"TEXT","fullname",null,array("size" =>"25")),
		      "ORGNAME" => array($form_strings["LBL_ORGNAME"],"TEXT","orgname",null,array("size" =>"25")),
		      "LICENSEMODE" => array($form_strings["LBL_LICENSEMODE"],"SELECT","licensemode","required",array("size" =>"1")),
		      "PRE_INSTALL" => array($form_strings["LBL_PRE_INSTALL"],"TEXTAREA","pre_install",null,array("cols" =>"30","rows"=>"15","wrap"=>"soft"),"Install Tasks"),
		      "POST_INSTALL" => array($form_strings["LBL_POST_INSTALL"],"TEXTAREA","post_install",null,array("cols" =>"30","rows"=>"15","wrap"=>"soft"),"Install Tasks"),
		      "OTHER_SETTINGS" => array($form_strings["LBL_OTHER_SETTINGS"],"TEXTAREA","other_settings",null,array("cols" =>"30","rows"=>"15","wrap"=>"soft"),"Other Settings"),
		      "SOFTWARE" => array($form_strings["LBL_SOFTWARE"],"ADVMULTISELECT","software",null,array("style" => "width : 200px;"),"Package Selection")
		      );	 	   	 
	           return $fields; 
	}
	
	function errorForm($val) { 
		/* function: errorForm
		
	  	 purpose:  create the error return values from the form fields you want.
	   	 
	   	 returns:  array of form fields with error codes*/ 
	   	 	
		global $error_strings;
		//form_return ($type,$size,$name,$vals)
		$fields = array("HOSTNAME" => array($error_strings['ERR_HOSTNAME'],"hostname"),
		      "DOMAIN" => array($error_strings["ERR_DOMAIN"],"domain"),
		      "MAC"=> array($error_strings["ERR_MAC"],"mac"),
		      "MAC_EXISTS"=> array($error_strings["ERR_MAC_EXISTS"], "mac_exists"),
		      "ADDR_TYPE" => array($error_strings["ERR_ADDR_TYPE"],"addr_type"),
		      "IPADDR" => array($error_strings["ERR_IPADDR"],"ipaddr"),
		      "NETMASK" => array($error_strings["ERR_NETMASK"],"netmask"),
		      "GATEWAY" => array($error_strings["ERR_GATEWAY"],"gateway"),
		      "DNS_1" => array($error_strings["ERR_DNS_1"],"dns_1"),
		      "DNS_2" => array($error_strings["ERR_DNS_2"],"dns_2"),
		      "PASSWORD" => array($error_strings["ERR_PASSWORD"],"password"),
		      "PASSWORD_CONFIRM" => array($error_strings["ERR_PASSWORD_CONFIRM"],"password_confirm"),
		      "LANG" => array($error_strings["ERR_LANG"],"lang"),
		      "TZ" => array($error_strings["ERR_TZ"],"tz"),
		      "CPU" => array($error_strings["ERR_CPU"],"cpu"),
		      "HD" => array($error_strings["ERR_HD"],"hd"), 
		      "NOTIFY" => array($error_strings["ERR_NOTIFY"],"notify"),
		      "IMAGE" => array($error_strings["ERR_NOTIFY"],"image"),
		      "TARGETPATH" => array($error_strings["ERR_TARGETPATH"],"targetpath"),
		      "PRODUCTID" => array($error_strings["ERR_PRODUCTID"],"productid"),
		      "FULLNAME" => array($error_strings["ERR_FULLNAME"],"fullname"),
		      "ORGNAME" => array($error_strings["ERR_ORGNAME"],"orgname"),
		      "LICENSEMODE" => array($error_strings["ERR_LICENSEMODE"],"licensemode"),
		      "PRE_INSTALL" => array($error_strings["ERR_PRE_INSTALL"],"pre_install"),
		      "POST_INSTALL" => array($error_strings["ERR_POST_INSTALL"],"post_install"),
		      "SOFTWARE" => array($error_strings["ERR_SOFTWARE"],"software"),
		      "PROFILE_CREATE_NAME" => array($error_strings["ERR_PROFILE_CREATE_NAME"],"profile_create_name"),
		      "OTHER_SETTINGS" => array($error_strings["ERR_OTHER_SETTINGS"],"other_settings"),
		      );
		
		foreach ($fields as $error_col => $error_val) {  // this is here to return the error string to the calling function	 
	          	if ($error_val[1] == $val) {
	          		return $error_val[0];  
	          	}
	        	}
	}		
	function writeFile() {
		/* function:  writeFile 
		
		   purpose:  writes form fields to a file that fits whatever format convention 
		   the user wants (e.g., Kickstart, Preseed, etc.).
		*/ 	
	
		global $os_template, $os_write_file; 
		$stripped_mac = preg_replace("/-/","", $_POST['mac']);// 4 character filename to make it compatible with DOS' 8.3 convention
   		$short_mac = substr($stripped_mac,8,strlen($stripped_mac));
		system("cp ". TEMPLATES ."". OPSYS .".cfg ". CONFIGFILES ."/". $short_mac .".txt");
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			if ($_REQUEST['os_subversion'] == "") { 
				$check_server = $con->queryRow("SELECT * FROM ". $_REQUEST['os_name'] ."_". $_REQUEST['os_version'] ." WHERE mac='". $_REQUEST['mac'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			}
			else {
				$check_server = $con->queryRow("SELECT * FROM ". $_REQUEST['os_name'] ."_". $_REQUEST['os_version'] ."_". $_REQUEST['os_subversion'] ." WHERE mac='". $_REQUEST['mac'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			}
			//$check_server = $con->queryRow("SELECT serverid,customer_id,mac,sessid FROM servers WHERE mac='". $_POST['mac'] ."'",null, MDB2_FETCHMODE_ASSOC); 
		}
		foreach ($_POST as $col => $value) { 
			if ($value != "") {
				if ($col == "targetpath") { 
					$value = stripslashes($value); // this is done to strip the excess backslash (gpc_magic_quotes?)
				}
				elseif ($col == "addr_type") {
					if ($value == "static") { 
						$static_settings = "[NetAdapters]
Adapter01=params.Adapter01

[params.Adapter01]
INFID=*

[NetClients]
MS_MSClient=params.MS_MSClient

[NetServices]
MS_SERVER=params.MS_SERVER

[NetProtocols]
MS_TCPIP=params.MS_TCPIP

[params.MS_TCPIP]
; TCP/IP properties
    AdapterSections = params.MS_TCPIP.Adapter01
   
[params.MS_TCPIP.Adapter01]
DefaultGateway = ". $_REQUEST['gateway'] ."
DHCP = no
IPAddress = ". $_REQUEST['ipaddr'] ."
SpecificTo = Adapter01
SubnetMask = ". $_REQUEST['netmask'] .""; 

						$static_change = new File_SearchReplace("{{static_set}}",$static_settings,CONFIGFILES ."/". $short_mac .".txt"); // enable static IP addressing
						$static_change->doSearch();		
					}
					else { 
						$static_change = new File_SearchReplace("{{static_set}}","",CONFIGFILES ."/". $short_mac .".txt" ); // disable static IP addressing
						$static_change->doSearch();	
					}	
					$value = $value; 
				}
				elseif ($col == "software") {
					if ($value != "") { 
						$con =& MDB2::connect(unserialize(DSN), $dsn_options);
						for ($x=0; $x<sizeof($value); $x++) { // we have to pull field values from EACH potential profile and write them out
							$check_prof = $con->queryRow("SELECT pid,script_text,post_install FROM software WHERE pid='". $value[$x] ."'",null, MDB2_FETCHMODE_ASSOC);
							$values .= $check_prof['script_text'] ."\n"; // write the script_text to the file...
								
						}
						$value=$values; // flatten the returned profiles now...
						$software_change = new File_SearchReplace("{{software}}",$value,CONFIGFILES ."/". $short_mac .".txt"); 
						$software_change->doSearch();	
					}
					else {
						$software_change = new File_SearchReplace("{{software}}","",CONFIGFILES ."/". $short_mac .".txt"); 
						$software_change->doSearch();	
					}		
				}
				elseif ($col == "post_install") {
					$autologon_change = new File_SearchReplace("{{autologon}}","On",CONFIGFILES ."/". $short_mac .".txt"); 
					$autologon_change->doSearch();	
					if ($_POST['notify'] == 'yes') { 
						$ops_notify = "wget -q \"http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=1&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."\"";
					} 
					// always delete the config files so the server doesn't continually boot into the automated install...
					$delete_files = "Command0=\"c:\fdtools\wget.exe -q 'http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=2&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."'\"";	
					$value = $value ."\n". $ops_notify ."\n". $delete_files;	
					$post_install_change = new File_SearchReplace("{{post_install}}",$value,CONFIGFILES ."/". $short_mac .".txt"); 
					$post_install_change->doSearch();
				}
				else { 
					$value = $value; 	
				}
				$snr = new File_SearchReplace("{{". $col ."}}",$value, CONFIGFILES ."/". $short_mac .".txt"); 
				$snr->doSearch();
			}
			else {
				if ($col == "post_install") { // we have to do this separately if the column value is blank otherwise autologon will stay unblanked-out
					if ($value == "") { // blank these values if there no post_install options chosen	
						//$delete_files is required at a minimum so [GuiRunOnce] does not really need to be completely blank
						$delete_files = "Command0=\"c:\fdtools\wget.exe -q 'http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=2&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."'\"";	
						$post_install_change = new File_SearchReplace("{{post_install}}",$delete_files,CONFIGFILES ."/". $short_mac .".txt"); 
						$post_install_change->doSearch();	
						$autologon_change = new File_SearchReplace("{{autologon}}","On",CONFIGFILES ."/". $short_mac .".txt"); 
						$autologon_change->doSearch();	
					}
				}
				$snr = new File_SearchReplace("{{". $col ."}}","", CONFIGFILES ."/". $short_mac .".txt"); // just blank the template value out
				$snr->doSearch();						         // if there's no form value available
			} 
		}
		// this stanza is a hack to handle a bug/feature either in HTML_Quickform or in the manner HTML_Quickform_advmultiselect
		// handles forms.  If the "software" form field is blank it does not show up in the $_POST so it can't be 
		// parsed/blanked out. 
		if (!array_key_exists("software", $_POST)) { // if it does not exist, that means advmultiselect never $_POSTed it; ergo, blank it
			$blankit_software = new File_SearchReplace("{{software}}","", CONFIGFILES ."/". $short_mac .".txt"); // just blank the template value out
			$blankit_software->doSearch();
		} 
		// these will probably ultimately move TO the form so these will get parsed up there - for now we blank them out
		if (!array_key_exists("network_set", $_POST)) {
			$blankit_network_set = new File_SearchReplace("{{network_set}}","", CONFIGFILES ."/". $short_mac . ".txt"); // just blank the template value out
			$blankit_network_set->doSearch();
		}
		if (!array_key_exists("other_settings", $_REQUEST)) {
			$blankit_other_settings = new File_SearchReplace("{{other_settings}}","", CONFIGFILES ."/". $short_mac .".txt"); // just blank the template value out
			$blankit_other_settings->doSearch();
		}
		
		// write to tftpboot area now...
		system ("cp ". BOOTCONFIG ."/template ". BOOTCONFIG ."/01-". $_POST['mac'] .""); // note the preceding "01-" - this is required by PXE 
							      // so it properly selects THIS config file when it boots
		$template_change = new File_SearchReplace("template_name",$_POST['mac'],BOOTCONFIG ."/01-". $_POST['mac']); // template_name is the template boot config file
		$template_change->doSearch();
									      
		$this->generate_pxe_boot_config();	 
		$this->create_task();	
		//$this->build_initrd(); 
		//$this->create_winboot();     // only for RIS-type installs... not used anymore
	} 
	
	function build_initrd() {
		/* function:  build_initrd 
		
		   purpose:  this builds a custom initrd for every Windows system that boots so we can have an embedded custom URL to retrieve config
		   options from.  Perhaps we can pass a kernel boot option via syslinux to avoid this?
		*/ 
		system("gunzip -c ". TFTPBOOT ."/installer/". $_POST['cpu'] ."/wininst/rootfd.cgz > /tmp/". $_POST['mac'] .""); 
		system("cd ". TFTPBOOT ."/installer/". $_POST['cpu'] ."/wininst; mkdir tmp/". $_POST['mac'] ."; cd tmp/". $_POST['mac'] ."; cpio -i < ../../". $_POST['mac'] .""); 
		$initrd_change = new File_SearchReplace("{{install_url}}",BASEURL,TFTPBOOT ."/installer/". $_POST['cpu'] ."/wininst/tmp/". $_POST['mac'] ."/etc/rc.d/rc.K");
		$initrd_change->doSearch();
		system("gzip -9c ". TFTPBOOT ."/installer/". $_POST['cpu'] ."/wininst/". $_POST['mac'] ." > ". $_POST['mac'] .".cgz"); 
	}
	
	function generate_pxe_boot_config() { // 
		
		$content_to_write = "label ". $_POST['mac'] ."
kernel installer/i386/wininst/kernel
append vga=normal initrd=installer/i386/wininst/rootfd.cgz root=/dev/ram0 rw";
        		$filename = BOOTCONFIG ."/01-". $_POST['mac'];
        		
		if (is_writable($filename)) { // can't write to it if it's not writeable :)
			if (!$fp = fopen($filename, 'a')) {
        			 	echo "Cannot open file ($mac)";
         				//exit;
         			}
         			if (fwrite($fp, $content_to_write) === FALSE) { 
         				echo "Cannot open file ($mac)";
         				//exit;
         			}
         		}
         		fclose($fp); 
   	}
   	
   	function create_winboot () { 
   		$stripped_mac = preg_replace("/-/","", $_POST['mac']);
   		$short_mac = substr($stripped_mac,8,strlen($stripped_mac));
   		system ("cp ". TFTPBOOT ."/ris/startrom.n12 ". TFTPBOOT ."/". $_POST['mac'] .".0");
   		system ("sed -i -e 's/NTLDR/". $short_mac ."R/gi' ". TFTPBOOT ."/". $_POST['mac'] .".0"); 
		system ("cp ". TFTPBOOT ."/ris/setupldr.exe ". TFTPBOOT ."/". $short_mac ."R"); 
		system ("sed -i -e 's/winnt\.sif/w". $short_mac ."\.sif/gi' ". TFTPBOOT ."/". $short_mac ."R"); 
		system ("sed -i -e 's/ntdetect\.com/ntde". $short_mac ."\.win/gi' ". TFTPBOOT ."/". $short_mac ."R"); 
		system ("cp ". TFTPBOOT ."/ris/ntdetect.com ". TFTPBOOT ."/ntde". $short_mac .".win"); 
   	}
   	
   	function create_task () {
   		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			// pull the path for the image file out first...
			$check_image = $con->queryRow("SELECT image_path FROM windows_images WHERE imageid='". $_POST['image'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			//echo "Check image: ". $check_image['image_path'] ."<BR>"; 
			$escaped = str_replace("/","\/",MIRROR_DIR); 
			$image = preg_replace("/".  $escaped ."\//", "", $check_image['image_path']); 
			
			// shorten the MAC address to 4 characters so we know which unattended file to copy over
			$stripped_mac = preg_replace("/-/","", $_POST['mac']);
	   		$short_mac = substr($stripped_mac,8,strlen($stripped_mac));
			
			// the $windows_task_script prescribes what tasks will be run from the Linux session to 
			// prepare the box to run the unattended install directly from a bootable DOS partition.
			// This process is relatively easy compared to trying to emulate RIS from Linux, create WinPE SDI files, etc.
			$harddrive = array("ide" => "hda",
					"sata" => "sda",
					"scsi" => "sda"
			);
			$windows_task_script = "#!/bin/sh
parted -s /dev/". $harddrive[$_POST['hd']] ." mklabel msdos		
parted -s /dev/". $harddrive[$_POST['hd']] ." rm 1	
parted -s /dev/". $harddrive[$_POST['hd']] ." mkpart primary fat32 0 100%
parted -s /dev/". $harddrive[$_POST['hd']] ." set 1 boot on
mkfs.vfat /dev/". $harddrive[$_POST['hd']] ."1
mount /dev/". $harddrive[$_POST['hd']] ."1 /mnt/dos
cd /mnt/dos
echo \'Copying Windows installation image files...\' 
rsync -r ". $_SERVER['SERVER_ADDR'] ."::installs/". $image ."/ /mnt/dos
cd /mnt/dos
wget -q ". CONFIGFILES_URL ."/". $short_mac .".txt
mv ". $short_mac .".txt unattend.txt
wget -q ". BASEURL ."/files/dos/syslinux.cfg
wget -q ". BASEURL ."/files/dos/dos.imz
wget -q ". BASEURL ."/files/dos/memdisk
cd /
umount /mnt/dos
ms-sys -w /dev/". $harddrive[$_POST['hd']] ." 
ms-sys -wp /dev/". $harddrive[$_POST['hd']] ."1 
syslinux /dev/sda1
reboot
"; // this final carriage return matters
			$upper_mac = strtoupper($_POST['mac']);
		
			$check_task = $con->query("SELECT task_name FROM tasks WHERE task_name='". $upper_mac ."'"); 
			if ($check_task->numRows() > 0) { 
				$con->query("UPDATE tasks SET script='". $windows_task_script ."' WHERE task_name='". $upper_mac ."'"); 
			}
			else {
				$con->query("INSERT INTO tasks (task_name,os_name,os_version,os_subversion,script) VALUES ('". $upper_mac ."','". OS_NAME ."','". OS_VERSION ."','". OS_SUBVERSION ."','". $windows_task_script ."')"); 
			}
   		}
	}
	
	function timezones($tz) {
   	/* function: timezones 
   	
   	   purpose:  to establish timezone semantics for this operating system
   	   
   	   returns:  all and currently selected timezone 
   	*/
   		return array("" => "-->Pick a timezone",
   		          "000" => "Dateline Standard Time (GMT-12:00)", 
			"001" => "Samoa Standard Time (GMT-11:00)", 
			"002" => "Hawaiian Standard Time (GMT-10:00)", 
			"003" => "Alaskan Standard Time (GMT-09:00)", 
			"004" => "Pacific Standard Time (GMT-08:00)", 
			"010" => "Mountain Standard Time (GMT-07:00)", 
			"013" => "Mexico Standard Time 2 (GMT-07:00)", 
			"015" => "U.S. Mountain Standard Time (GMT-07:00)", 
			"020" => "Central Standard Time (GMT-06:00)", 
			"025" => "Canada Central Standard Time (GMT-06:00)",
			"030" => "Mexico Standard Time (GMT-06:00)", 
			"033" => "Central America Standard Time (GMT-06:00)",
			"035" => "Eastern Standard Time (GMT-05:00)",
			"040" => "U.S. Eastern Standard Time (GMT-05:00)",
			"045" => "S.A. Pacific Standard Time (GMT-05:00)",
			"050" => "Atlantic Standard Time (GMT-04:00)",
			"055" => "S.A. Western Standard Time (GMT-04:00)", 
			"056" => "Pacific S.A. Standard Time (GMT-04:00)", 
			"060" => "Newfoundland  Standard Time (GMT-03:30)",
			"065" => "E. South America Standard Time (GMT-03:00)", 
			"070" => "S.A. Eastern Standard Time (GMT-03:00)",
			"073" => "Greenland Standard Time (GMT-03:00)", 
			"075" => "Mid-Atlantic Standard Time (GMT-02:00)",
			"080" => "Azores Standard Time (GMT-01:00)",
			"083" => "Cape Verde Standard Time (GMT-01:00)",
			"085" => "GMT Standard Time (GMT)",
			"090" => "Greenwich Standard Time (GMT)",
			"095" => "Central Europe Standard Time (GMT+01:00)",
			"100" => "Central European Standard Time (GMT+01:00)",
			"105" => "Romance Standard Time (GMT+01:00)",
			"110" => "W. Europe Standard Time (GMT+01:00)",
			"113" => "W. Central Africa Standard Time (GMT+01:00)",
			"115" => "E. Europe Standard Time (GMT+02:00)", 
			"120" => "Egypt Standard Time (GMT+02:00)",
			"125" => "FLE Standard Time (GMT+02:00)",
			"130" => "GTB Standard Time (GMT+02:00)",
			"135" => "Israel Standard Time (GMT+02:00)",
			"140" => "South Africa Standard Time (GMT+02:00)",
			"145" => "Russian Standard Time (GMT+03:00)",
			"150" => "Arab Standard Time (GMT+03:00)",
			"155" => "E. Africa Standard Time (GMT+03:00)",
			"158" => "Arabic Standard Time (GMT+03:00)",
			"160" => "Iran Standard Time (GMT+03:30)",
			"165" => "Arabian Standard Time (GMT+04:00)",
			"170" => "Caucasus Standard Time (GMT+04:00)",
			"175" => "Afghanistan Standard Time (GMT+04:30)",
			"180" => "Ekaterinburg Standard Time (GMT+05:00)",
			"185" => "West Asia Standard Time (GMT+05:00)",
			"190" => "India Standard Time (GMT+05:30)",
			"193" => "Nepal Standard Time (GMT+05:45)",
			"195" => "Central Asia Standard Time (GMT+06:00)",
			"200" => "Sri Lanka Standard Time (GMT+06:00)",
			"201" => "N. Central Asia Standard Time (GMT+06:00)",
			"203" => "Myanmar Standard Time (GMT+06:30)", 
			"205" => "S.E. Asia Standard Time (GMT+07:00)",
			"207" => "North Asia Standard Time (GMT+07:00)",
			"210" => "China Standard Time (GMT+08:00)",
			"215" => "Singapore Standard Time (GMT+08:00)",
			"220" => "Taipei Standard Time (GMT+08:00) Taipei",
			"225" => "W. Australia Standard Time (GMT+08:00)",
			"227" => "North Asia East Standard Time (GMT+08:00)",
			"230" => "Korea Standard Time (GMT+09:00) Seoul",
			"235" => "Tokyo Standard Time (GMT+09:00)",
			"240" => "Yakutsk Standard Time (GMT+09:00)",
			"245" => "A.U.S. Central Standard Time (GMT+09:30)",
			"250" => "Cen. Australia Standard Time (GMT+09:30)",
			"255" => "A.U.S. Eastern Standard Time (GMT+10:00)",
			"260" => "E. Australia Standard Time (GMT+10:00)",
			"265" => "Tasmania Standard Time (GMT+10:00)",
			"270" => "Vladivostok Standard Time (GMT+10:00)",
			"275" => "West Pacific Standard Time (GMT+10:00)",
			"280" => "Central Pacific Standard Time (GMT+11:00)",
			"285" => "Fiji Islands Standard Time (GMT+12:00)",
			"290" => "New Zealand Standard Time (GMT+12:00)",
			"300" => "Tonga Standard Time (GMT+13:00)"
			);	
		
 	 }
 	  		
 	function tz_test ($tz_test) {
 		return array ("" => "--Ok, pick something",
 		"000" => "000",
 		"001" => "001"
 		);	
 	}
 	function architecture ($cpu) {
 		/* function: architecture
   	
   	  	 purpose:  to establish CPU architecture semantics for this operating system
   	   
   	   	returns:  all and currently selected CPU arch.
   	*/
   		return array("" => "-->Pick a CPU type",
   		             "i386" => "Intel x86 32-bit",
   			   "amd64" => "AMD Opteron or Athlon64 64-bit",
   			   "ia64" => "Intel Itanium 64-bit"); 
	}
	
	function licensing ($licensemode) {
 		/* function: architecture
   	
   	  	   purpose:  to establish CPU architecture semantics for this operating system
   	   
   	   	   returns:  all and currently selected CPU arch.
   		*/
   		return array("" => "-->Pick a licensing mode",
   			   "PerServer" => "Per Server Mode",
   			   "PerSeat" => "Per Seat Mode"
   			   );
   			   
	}
	
	function notify($notify) {
 		/* function: notify
   	
   	  	   purpose:  toggle email (or other method--SNMP) notification of server install progress
   	   
   	   	   returns:  notify status
   	          */
   		return array("" => "-->Pick to notify",
   		             "yes" => "Yes (Notify me)",
   			   "no" => "No"
 			);
	}
	
	function netaddressing($type) {
 		/* function: netaddressing
   	
   	  	 purpose:  toggle between static and dynamic IP addressing
   	   
   	   	returns:  all and currently selected IP addressing type
   	*/
   		return array("" => "--> Pick a network address type",
   		             "static" => "Static IP Address",
   			   "dynamic" => "Dynamic IP address",
   			   );
	}
	
	function images() { 
		$con =& MDB2::factory(unserialize(DSN));
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$check_server = $con->queryAll("SELECT imageid,image_name FROM windows_images WHERE os_version='". OS_VERSION ."' and os_subversion='". OS_SUBVERSION ."'");
		}

		$stack = array();
		for ($i = 0; $i < sizeof($check_server); $i++) { 
			array_push_associative($stack,array($check_server[$i][0] => $check_server[$i][1])); 
		}
		return $stack;
		
	}
	
	function harddrives($hd) {
 		/* function: harddrives
   	
   	  	   purpose:  to establish hard drive type semantics for this operating system
   	   
   	   	   returns:  all and currently selected hard drive type
   		*/
   		$hd = array("" => "-->Pick a hard drive type",
   		 	   "ide" => "IDE (PATA)",
   			   "sata" => "Serial ATA",
   			   "scsi" => "SCSI");
   			   
   		return $hd;
	}	
	
	function languages($langs) { 
		return array(
			   "1" => "English",
			   "2" => "Central Europe",
			   "3" => "Baltic",
			   "4" => "Greek",
			   "5" => "Cyrillic",
			   "6" => "Turkic",
			   "7" => "Japanese",
			   "8" => "Korean",
			   "9" => "Traditional Chinese",
			   "10" => "Simplified Chinese",
			   "11" => "Thai",
			   "12" => "Hebrew", 
			   "13" => "Arabic",
			   "14" => "Vietnamese",
			   "15" => "Indic",
			   "16" => "Georgian",
			   "17" => "Armenian"
			   );
	}
}

?>