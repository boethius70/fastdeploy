<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:

//   http://www.fastdeploy.com/copyright 

$os_config = array(
	         "os_name" => "RedHat",
                   "os_version" => "5", // use a _ instead of . for a "dot-version" delimiter (this is for compatibility with MySQL and class constructor naming conventions
                   "os_subversion" => "Enterprise",
                   "os_friendly_name" => "RedHat Enterprise Linux 5",
                   "os_icon" => "redhat_icon.png",
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

class OS_RedHat_5_Enterprise_Deploy extends HTML_QuickForm { // Note the formatting (strip the "dot" in the version out)              
	function OS_RedHat_5_Enterprise_Deploy($op) {
		/* function: OS_*_Deploy()
   	
   	  	   purpose:  displays the default form used for deploying this operating system; also handles
   	             the process of error control and correction.  This is also the class constructor.
   	   		
   	             returns:  this default form and, if applicable, any errors.
   		*/
   		parent::HTML_QuickForm('displayForm','post');
   		
	         	//$action =& $this->createElement('hidden', 'action');
	        	//$this->addElement($action);
		
		$returned_values = $this->setForm(); // 
		
		foreach ($returned_values as $column => $value) { 
			global $default;
			
			if ($value[1] == "TEXT") {
				if ($value[2] == "mac") { 
					if ($op != "profile_create") { // don't put the MAC text field option in if you are creating a generic profile
						$this->addElement($value[1],$value[2],$value[0],$value[4]); // this is at best unwieldy to refer to the values
						$error = $this->errorForm($value[2]); 			// by their array offset; I will use array keys 
										// in the future; look at the setForm() function
										// to determine what each offset is in the meantime.	
						$this->addRule($value[2], $error, $value[3], null);	
					}
					elseif (($op == "profile_create") || ($op == "profile_edit")) { 
						$this->addElement("hidden",$value[2],$value[0],$value[4]); 	// create a hidden MAC field
						$this->addRule($value[2], $error, null, null);	
					}	
				}
				else { 
					if (($op == "profile_create") || ($op == "profile_edit")) { // put a special field in to create a generic profile...
						$this->addElement($value[1],"profile_create_name",$value[0],$value[4]); 
						$error = $this->errorForm($value[2]); 			
						$this->addRule($value[2], $error, $value[3], null);	
					}
					
					if ($value[2] != "profile_create_name") { // don't create this form field unless it's actually specified (see $op == "profile_create" above						 
						$this->addElement($value[1],$value[2],$value[0],$value[4]); 
						$error = $this->errorForm($value[2]); 			
						$this->addRule($value[2], $error, $value[3], null);
					}	
				}
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
				$ams->setButtonAttributes('all', 'class=inputCommand');
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
		$this->addElement("hidden", "customer_id", $_SESSION['username']); // this is here to enable insert of customer_id into the OS' DB table 
		$this->addElement("text", "os_friendly_name", OS_FRIENDLY_NAME); // this puts a visible indication of what OS is being installed around the tab area
		$this->addElement("text", "os_icon","<img align=top src=images/os/". OS_ICON .">"); 
		$this->addElement("submit", "checkButton", "Submit");			    
	}
	
	function setForm() { 
		/* function: setForm
		
	  	 purpose:  create the form fields you want.
	   	 
	   	 returns:  array of form fields */ 		
	   	 
		global $form_strings;
					// array offset:  	0		1	2	3	4		5
		$fields = array("HOSTNAME" => array($form_strings['LBL_HOSTNAME'],"TEXT","hostname","required",array("size" => "25"),"General Settings"),
		      "DOMAIN" => array($form_strings["LBL_DOMAIN"],"TEXT","domain","required",array("size" => "35","maxlength" => "100"),"General Settings"),
		      "MAC"=> array($form_strings["LBL_MAC"],"TEXT","mac","required",array("size" => "25", "onkeyup" => "chkThis(this);", "onBlur" => "javaFunction('". OS_NAME ."','". OS_VERSION ."','". OS_SUBVERSION ."');"),"General Settings"),
		      "MAC_EXISTS"=> array($form_strings["LBL_MAC_EXISTS"],"TEXT","mac_exists",null,null),
		      "ADDR_TYPE" => array($form_strings["LBL_ADDR_TYPE"],"SELECT","addr_type","required",array("size" =>"1", "onChange" => "flipit('staticset','addr_type','static','dynamic');"),"General Settings"),
		      "IPADDR" => array($form_strings["LBL_IPADDR"],"TEXT","ipaddr",null,array("size" =>"25"),"General Settings"),
		      "NETMASK" => array($form_strings["LBL_NETMASK"],"TEXT","netmask",null,array("size" =>"25"),"General Settings"),
		      "GATEWAY" => array($form_strings["LBL_GATEWAY"],"TEXT","gateway",null,array("size" =>"25"),"General Settings"),
		      "DNS_1" => array($form_strings["LBL_DNS_1"],"TEXT","dns_1",null,array("size" =>"25"),"General Settings"),
		      "DNS_2" => array($form_strings["LBL_DNS_2"],"TEXT","dns_2",null,array("size" =>"25"),"General Settings"),
		      "PASSWORD" => array($form_strings["LBL_PASSWORD"],"PASSWORD","password","required",array("size" =>"25"),"General Settings"),		      
		      "PASSWORD_CONFIRM" => array($form_strings["LBL_PASSWORD_CONFIRM"],"PASSWORD","password_confirm","required",array("size" =>"25"),"General Settings"),
		      "LANG" => array($form_strings["LBL_LANG"],"SELECT","lang","required",array("size" =>"1"),"General Settings"),
		      "TZ" => array($form_strings["LBL_TZ"],"SELECT","tz","required",array("size" =>"1"),"General Settings"),
		      "CPU" => array($form_strings["LBL_CPU"],"SELECT","cpu","required",array("size" =>"1"),"General Settings"),
		      "HD" => array($form_strings["LBL_HD"],"SELECT","hd","required",array("size" =>"1"),"General Settings"), 
		      "NOTIFY" => array($form_strings["LBL_NOTIFY"],"SELECT","notify",null,array("size" =>"1"),"General Settings"),
		      "PRE_INSTALL" => array($form_strings["LBL_PRE_INSTALL"],"TEXTAREA","pre_install","",array("cols" =>"30","rows"=>"15","wrap"=>"soft"),"Install Tasks"),
		      "POST_INSTALL" => array($form_strings["LBL_POST_INSTALL"],"TEXTAREA","post_install","",array("cols" =>"30","rows"=>"15","wrap"=>"soft"),"Install Tasks"),
		      "SOFTWARE" => array($form_strings["LBL_SOFTWARE"],"ADVMULTISELECT","software","",array("style" => "width : 200px;"),"Package Selection"),
		      "PROFILE_CREATE_NAME" => array($form_strings["LBL_PROFILE_CREATE_NAME"],"TEXT","profile_create_name","required",array("size" => "25"),"Package Selection")
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
		      "PRE_INSTALL" => array($error_strings["ERR_PRE_INSTALL"],"pre_install"),
		      "POST_INSTALL" => array($error_strings["ERR_POST_INSTALL"],"post_install"),
		      "SOFTWARE" => array($error_strings["ERR_SOFTWARE"],"software"),
		      "PROFILE_CREATE_NAME" => array($error_strings["ERR_PROFILE_CREATE_NAME"],"profile_create_name"),
		      );
		
		foreach ($fields as $error_col => $error_val) {   	 	   	 
	          	if ($error_val[1] == $val) { // we just return the error text associated with the form field name ($val) and nothing else 
	          		return $error_val[0];  
	          	}
	        	}
	}

	function errorCheck() { 
		/* function:  errorCheck
		   
		   purpose:  check for errors / validate form fields 

	             returns:  array of errors along with codes
		*/
		$errors = array(); 
		
		foreach ($_POST as $error_column => $error_value) { 
			//echo $_POST[$error_value] ."<BR>";
			if ($error_value == "") { 	
				array_push ($errors,"<font color=red>". $this->errorForm($error_column) ." </font><BR>"); 	
			}	
		}
		return $errors; 	
	}
	
	function writeFile() {
		/* function:  writeFile 
		
		   purpose:  writes files that setup the actual config to be used by the computer that is booting off the network 
		   
		*/ 	
		
		global $os_template, $os_write_file; 
		system("cp ". TEMPLATES ."". OPSYS .".cfg ". CONFIGFILES ."/". $_POST['mac'] ."");
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
			//$value = trim($value); // we can't do this because it messes up arrays
			//we may want to use stripslashes here to avoid the magic_quotes_gpc = Off requirement; e.g.,
			//$value = stripslashes($value); - could we not do it because of their "arrayness"?  May have
			//to deal with it closer to value replacement below
			if ($value != "") {
				if ($col == "password") { // crypt the root password 
					$value=crypt($value);
				}
				elseif ($col == "software") { 
					if ($value != "") { 
						for ($x=0; $x<sizeof($value); $x++) { // we have to pull field values from EACH potential profile and write them out
								$check_prof = $con->queryRow("SELECT pid,script_text,post_install FROM software WHERE pid='". $value[$x] ."'",null, MDB2_FETCHMODE_ASSOC);
								$values .= $check_prof['script_text'] ."\n"; // write the script_text to the file...
								if ($check_prof['post_install'] != "") { // man I'm weird - I don't want any unnecessary blank lines :)
									$post_values .= $check_prof['post_install'] ."\n"; // write out the post_install values that this service may need
								}
								else { 
									$post_values .= ""; // blank it out...
								}
								if ($check_prof['pre_install'] != "") { 
									$pre_values .= $check_prof['pre_install'] ."\n"; // write out the pre_install values that this service may need	
								}
								else {
									$pre_values .= ""; // blank out the line
								}
						}
						/* 
						 This is a kludge to handle tying together Service/Profile-specific options and the post- or pre-install options
						 necessary to have the services created by the profile to run and/or be configured properly on startup.
						 For example, say you select the "Web Server" profile.  In order for Apache to start properly on the first
						 and subsequent boots the service has to be enabled (chkconfig --level 345 httpd on).  Or you may want to copy over a 
						 specific set of config files.  Or whatever.  It is done this way because normally the template config file is processed 
						 automatically by looping through it and searching-and-replacing the $_POSTed form name fields with the $_POSTed form
						 values.  Bqecause we can't predict if the "profiles" form field name will be processed before the "post_install" form field
						 name (it probably won't but even if it did there's no guarantee it would always work), we have to write these values out 
						 separately 'one-off' to the template file.
						 */ 
						$postvals = new File_SearchReplace("{{postvals}}",$post_values, CONFIGFILES ."".$_POST['mac']); 
						$postvals->doSearch();
						
						$prevals = new File_SearchReplace("{{prevals}}",$pre_values, CONFIGFILES ."".$_POST['mac']); 
						$prevals->doSearch();
						
						$value=$values; // flatten the returned profiles now...
					}
					else { 
						$blank_profile = new File_SearchReplace("{{". $col ."}}","", CONFIGFILES ."". $_POST['mac']); // just blank the template value out
						$blank_profile->doSearch();	
					}
				}
				elseif ($col == "addr_type") {
					if ($value == "static") { // hardcoded Kickstart values takes away from the template but oh well can't have blank static values in the template
						$static_change = new File_SearchReplace("{{static_flag}}","static --ip=". $_POST['ipaddr'] ." --netmask=". $_POST['netmask'] ." --gateway=". $_POST['gateway'] ." --nameserver=". $_POST['dns_1'] ." ", CONFIGFILES ."".$_POST['mac']); // enable static IP addressing
						$static_change->doSearch();		
					}
					else { 
						$static_change = new File_SearchReplace("{{static_flag}}","dhcp", CONFIGFILES ."".$_POST['mac']); // disable static IP addressing
						$static_change->doSearch();	
					}	
					$value = $value; 
				}
				elseif ($col == "post_install") { // this is done to append the ops.php script call to the post_install area
					
					if ($_POST['notify'] == 'yes') { 
						$ops_notify = "wget -q -T 10 --spider \"http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=1&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."\"";
					} 
					// always delete the config files so the server doesn't continually boot into the automated install...
					$delete_files = "wget -q -T 10 --spider \"http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=2&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."\"";
					$value = $value ."\n". $ops_notify ."\n". $delete_files;					
				}
				
				$snr = new File_SearchReplace("{{". $col ."}}",$value, CONFIGFILES ."".$_POST['mac']); 
				$snr->doSearch();
			}
			else {
				
				if ($col == "post_install") { // this is done to append the ops.php script call to the post_install area
					if ($_POST['notify'] == 'yes') { 
						$ops_notify = "wget -q -T 10 --spider \"http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=1&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."\"";
					} 
					$delete_files = "wget -q \"http://". $_SERVER['SERVER_NAME'] ."/ops.php?op=2&sessid=". $check_server['sessid'] ."&serverid=". $check_server['serverid'] ."&customer_id=". $check_server['customer_id'] ."&os_name=". OS_NAME ."&os_version=". OS_VERSION ."\"";
					$value = $post_values ."\n". $ops_notify ."\n". $delete_files;	
				}
				
				$blankit = new File_SearchReplace("{{". $col ."}}","". $value ."", CONFIGFILES ."". $_POST['mac']); // just blank the template value out
				$blankit->doSearch();						         // if there's no form value available
			} 
		}
		// this stanza is a hack to handle a bug/feature either in HTML_Quickform or in the manner HTML_Quickform_advmultiselect
		// handles forms.  If the "software" form field is blank it does not show up in the $_POST so it can't be 
		// parsed/blanked out. 
		
		if (!array_key_exists("software", $_POST)) { // if it does not exist, that means advmultiselect never $_POSTed it; ergo, blank it
			$blankit_software = new File_SearchReplace("{{software}}","", CONFIGFILES ."". $_POST['mac']); // just blank the template value out
			$blankit_software->doSearch();
			// blank out the post and prevals as well because they were only a kludge to deal with post/pre-install settings when
			// software is being installed / chosen anyway.
			$blankit_postvals = new File_SearchReplace("{{postvals}}","", CONFIGFILES ."". $_POST['mac']); // just blank the template value out
			$blankit_postvals->doSearch();
			$blankit_prevals = new File_SearchReplace("{{prevals}}","", CONFIGFILES ."". $_POST['mac']); // just blank the template value out
			$blankit_prevals->doSearch();
		}
		
		
		// set mirror server URL...
		$mirror = new File_SearchReplace("{{mirror}}",MIRROR_SERVER ."/". OS_NAME ."/". OS_VERSION ."/". OS_SUBVERSION ."/". $_POST['cpu'], CONFIGFILES ."". $_POST['mac']); 
		$mirror->doSearch();
		// write to tftpboot area now...
		system ("cp ". BOOTCONFIG ."/template ". BOOTCONFIG ."01-". $_POST['mac'] .""); // note the preceding "01-" - this is required by PXE 
							      // so it properly selects THIS config file when it boots
		$template_change = new File_SearchReplace("template_name",$_POST['mac'],BOOTCONFIG ."01-". $_POST['mac']); // template_name is the template boot config file
		$template_change->doSearch();
									      
		$this->generate_pxe_boot_config();	     
	} 					
	
	function generate_pxe_boot_config() { // maybe this can be generic enough to move to the FastDeployClasses?
		/* function: generate_pxe_boot_config
   	
   	  	   purpose:  generates the files to be used by the PXE network boot process
   	
   		*/
		$content_to_write = "label ". $_POST['mac'] ."
        kernel installer/". $_POST['cpu'] ."/". OS_NAME ."/". OS_VERSION ."/vmlinuz
        append ksdevice=eth0 load_ramdisk=1 prompt_ramdisk=0 ramdisk_size=16384 initrd=installer/". $_POST['cpu'] ."/". OS_NAME ."/". OS_VERSION ."/initrd.img network ks=". CONFIGFILES_URL ."". $_POST['mac'];
        		$filename = BOOTCONFIG ."01-". $_POST['mac'];
        		//echo "Filename: ". $filename . "<BR>";
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

	
	function timezones($tzone) {
   	/* function: timezones 
   	
   	   purpose:  to establish timezone semantics for this operating system
   	   
   	   returns:  all and currently selected timezone 
   	*/
   		return array("" => "-->Pick a timezone",
   			"Africa/Abidjan" => "Africa/Abidjan",
			"Africa/Accra" => "Africa/Accra",
			"Africa/Addis_Ababa" => "Africa/Addis_Ababa",
			"Africa/Algiers" => "Africa/Algiers",
			"Africa/Asmera" => "Africa/Asmera",
			"Africa/Bamako" => "Africa/Bamako",
			"Africa/Bangui" => "Africa/Bangui",
			"Africa/Banjul" => "Africa/Banjul",
			"Africa/Bissau" => "Africa/Bissau",
			"Africa/Blantyre" => "Africa/Blantyre",
			"Africa/Brazzaville" => "Africa/Brazzaville",
			"Africa/Bujumbura" => "Africa/Bujumbura",
			"Africa/Cairo" => "Africa/Cairo",
			"Africa/Casablanca" => "Africa/Casablanca",
			"Africa/Ceuta" => "Africa/Ceuta",
			"Africa/Conakry" => "Africa/Conakry",
			"Africa/Dakar" => "Africa/Dakar",
			"Africa/Dar_es_Salaam" => "Africa/Dar_es_Salaam",
			"Africa/Djibouti" => "Africa/Djibouti",
			"Africa/Douala" => "Africa/Douala",
			"Africa/El_Aaiun" => "Africa/El_Aaiun",
			"Africa/Freetown" => "Africa/Freetown",
			"Africa/Gaborone" => "Africa/Gaborone",
			"Africa/Harare" => "Africa/Harare",
			"Africa/Johannesburg" => "Africa/Johannesburg",
			"Africa/Kampala" => "Africa/Kampala",
			"Africa/Khartoum" => "Africa/Khartoum",
			"Africa/Kigali" => "Africa/Kigali",
			"Africa/Kinshasa" => "Africa/Kinshasa",
			"Africa/Lagos" => "Africa/Lagos",
			"Africa/Libreville" => "Africa/Libreville",
			"Africa/Lome" => "Africa/Lome",
			"Africa/Luanda" => "Africa/Luanda",
			"Africa/Lubumbashi" => "Africa/Lubumbashi",
			"Africa/Lusaka" => "Africa/Lusaka",
			"Africa/Malabo" => "Africa/Malabo",
			"Africa/Maputo" => "Africa/Maputo",
			"Africa/Maseru" => "Africa/Maseru",
			"Africa/Mbabane" => "Africa/Mbabane",
			"Africa/Mogadishu" => "Africa/Mogadishu",
			"Africa/Monrovia" => "Africa/Monrovia",
			"Africa/Nairobi" => "Africa/Nairobi",
			"Africa/Ndjamena" => "Africa/Ndjamena",
			"Africa/Niamey" => "Africa/Niamey",
			"Africa/Nouakchott" => "Africa/Nouakchott",
			"Africa/Ouagadougou" => "Africa/Ouagadougou",
			"Africa/Porto-Novo" => "Africa/Porto-Novo",
			"Africa/Sao_Tome" => "Africa/Sao_Tome",
			"Africa/Timbuktu" => "Africa/Timbuktu",
			"Africa/Tripoli" => "Africa/Tripoli",
			"Africa/Tunis" => "Africa/Tunis",
			"Africa/Windhoek" => "Africa/Windhoek",
			"America/Adak" => "America/Adak",
			"America/Anchorage" => "America/Anchorage",
			"America/Anguilla" => "America/Anguilla",
			"America/Antigua" => "America/Antigua",
			"America/Araguaina" => "America/Araguaina",
			"America/Argentina/Buenos_Air" => "America/Argentina/Buenos_Air",
			"America/Argentina/Catamarca" => "America/Argentina/Catamarca",
			"America/Argentina/ComodRivad" => "America/Argentina/ComodRivad",
			"America/Argentina/Cordoba" => "America/Argentina/Cordoba",
			"America/Argentina/Jujuy" => "America/Argentina/Jujuy",
			"America/Argentina/La_Rioja " => "America/Argentina/La_Rioja ",
			"America/Argentina/Mendoza" => "America/Argentina/Mendoza",
			"America/Argentina/Rio_Galleg" => "America/Argentina/Rio_Galleg",
			"America/Argentina/San_Juan " => "America/Argentina/San_Juan ",
			"America/Argentina/Tucuman" => "America/Argentina/Tucuman",
			"America/Argentina/Ushuaia" => "America/Argentina/Ushuaia",
			"America/Aruba" => "America/Aruba",
			"America/Asuncion" => "America/Asuncion",
			"America/Atka" => "America/Atka",
			"America/Bahia" => "America/Bahia",
			"America/Barbados" => "America/Barbados",
			"America/Belem" => "America/Belem",
			"America/Belize" => "America/Belize",
			"America/Boa_Vista" => "America/Boa_Vista",
			"America/Bogota" => "America/Bogota",
			"America/Boise" => "America/Boise",
			"America/Buenos_Aires" => "America/Buenos_Aires",
			"America/Cambridge_Bay" => "America/Cambridge_Bay",
			"America/Campo_Grande" => "America/Campo_Grande",
			"America/Cancun" => "America/Cancun",
			"America/Caracas" => "America/Caracas",
			"America/Catamarca" => "America/Catamarca",
			"America/Cayenne" => "America/Cayenne",
			"America/Cayman" => "America/Cayman",
			"America/Chicago" => "America/Chicago",
			"America/Chihuahua" => "America/Chihuahua",
			"America/Cordoba" => "America/Cordoba",
			"America/Costa_Rica" => "America/Costa_Rica",
			"America/Cuiaba" => "America/Cuiaba",
			"America/Curacao" => "America/Curacao",
			"America/Danmarkshavn" => "America/Danmarkshavn",
			"America/Dawson" => "America/Dawson",
			"America/Dawson_Creek" => "America/Dawson_Creek",
			"America/Denver" => "America/Denver",
			"America/Detroit" => "America/Detroit",
			"America/Dominica" => "America/Dominica",
			"America/Edmonton" => "America/Edmonton",
			"America/Eirunepe" => "America/Eirunepe",
			"America/El_Salvador" => "America/El_Salvador",
			"America/Ensenada" => "America/Ensenada",
			"America/Fort_Wayne" => "America/Fort_Wayne",
			"America/Fortaleza" => "America/Fortaleza",
			"America/Glace_Bay" => "America/Glace_Bay",
			"America/Godthab" => "America/Godthab",
			"America/Goose_Bay" => "America/Goose_Bay",
			"America/Grand_Turk" => "America/Grand_Turk",
			"America/Grenada" => "America/Grenada",
			"America/Guadeloupe" => "America/Guadeloupe",
			"America/Guatemala" => "America/Guatemala",
			"America/Guayaquil" => "America/Guayaquil",
			"America/Guyana" => "America/Guyana",
			"America/Halifax" => "America/Halifax",
			"America/Havana" => "America/Havana",
			"America/Hermosillo" => "America/Hermosillo",
			"America/Indiana/Indianapolis" => "America/Indiana/Indianapolis",
			"America/Indiana/Knox" => "America/Indiana/Knox",
			"America/Indiana/Marengo" => "America/Indiana/Marengo",
			"America/Indiana/Vevay" => "America/Indiana/Vevay",
			"America/Indianapolis" => "America/Indianapolis",
			"America/Inuvik" => "America/Inuvik",
			"America/Iqaluit" => "America/Iqaluit",
			"America/Jamaica" => "America/Jamaica",
			"America/Jujuy" => "America/Jujuy",
			"America/Juneau" => "America/Juneau",
			"America/Kentucky/Louisville" => "America/Kentucky/Louisville",
			"America/Kentucky/Monticello" => "America/Kentucky/Monticello",
			"America/Knox_IN" => "America/Knox_IN",
			"America/La_Paz" => "America/La_Paz",
			"America/Lima" => "America/Lima",
			"America/Los_Angeles" => "America/Los_Angeles",
			"America/Louisville" => "America/Louisville",
			"America/Maceio" => "America/Maceio",
			"America/Managua" => "America/Managua",
			"America/Manaus" => "America/Manaus",
			"America/Martinique" => "America/Martinique",
			"America/Mazatlan" => "America/Mazatlan",
			"America/Mendoza" => "America/Mendoza",
			"America/Menominee" => "America/Menominee",
			"America/Merida" => "America/Merida",
			"America/Mexico_City" => "America/Mexico_City",
			"America/Miquelon" => "America/Miquelon",
			"America/Monterrey" => "America/Monterrey",
			"America/Montevideo" => "America/Montevideo",
			"America/Montreal" => "America/Montreal",
			"America/Montserrat" => "America/Montserrat",
			"America/Nassau" => "America/Nassau",
			"America/New_York" => "America/New_York",
			"America/Nipigon" => "America/Nipigon",
			"America/Nome" => "America/Nome",
			"America/Noronha" => "America/Noronha",
			"America/North_Dakota/Center" => "America/North_Dakota/Center",
			"America/Panama" => "America/Panama",
			"America/Pangnirtung" => "America/Pangnirtung",
			"America/Paramaribo" => "America/Paramaribo",
			"America/Phoenix" => "America/Phoenix",
			"America/Port-au-Prince" => "America/Port-au-Prince",
			"America/Port_of_Spain" => "America/Port_of_Spain",
			"America/Porto_Acre" => "America/Porto_Acre",
			"America/Porto_Velho" => "America/Porto_Velho",
			"America/Puerto_Rico" => "America/Puerto_Rico",
			"America/Rainy_River" => "America/Rainy_River",
			"America/Rankin_Inlet" => "America/Rankin_Inlet",
			"America/Recife" => "America/Recife",
			"America/Regina" => "America/Regina",
			"America/Rio_Branco" => "America/Rio_Branco",
			"America/Rosario" => "America/Rosario",
			"America/Santiago" => "America/Santiago",
			"America/Santo_Domingo" => "America/Santo_Domingo",
			"America/Sao_Paulo" => "America/Sao_Paulo",
			"America/Scoresbysund" => "America/Scoresbysund",
			"America/Shiprock" => "America/Shiprock",
			"America/St_Johns" => "America/St_Johns",
			"America/St_Kitts" => "America/St_Kitts",
			"America/St_Lucia" => "America/St_Lucia",
			"America/St_Thomas" => "America/St_Thomas",
			"America/St_Vincent" => "America/St_Vincent",
			"America/Swift_Current" => "America/Swift_Current",
			"America/Tegucigalpa" => "America/Tegucigalpa",
			"America/Thule" => "America/Thule",
			"America/Thunder_Bay" => "America/Thunder_Bay",
			"America/Tijuana" => "America/Tijuana",
			"America/Toronto" => "America/Toronto",
			"America/Tortola" => "America/Tortola",
			"America/Vancouver" => "America/Vancouver",
			"America/Virgin" => "America/Virgin",
			"America/Whitehorse" => "America/Whitehorse",
			"America/Winnipeg" => "America/Winnipeg",
			"America/Yakutat" => "America/Yakutat",
			"America/Yellowknife" => "America/Yellowknife",
			"Antarctica/Casey" => "Antarctica/Casey",
			"Antarctica/Davis" => "Antarctica/Davis",
			"Antarctica/DumontDUrville" => "Antarctica/DumontDUrville",
			"Antarctica/Mawson" => "Antarctica/Mawson",
			"Antarctica/McMurdo" => "Antarctica/McMurdo",
			"Antarctica/Palmer" => "Antarctica/Palmer",
			"Antarctica/Rothera" => "Antarctica/Rothera",
			"Antarctica/South_Pole" => "Antarctica/South_Pole",
			"Antarctica/Syowa" => "Antarctica/Syowa",
			"Antarctica/Vostok" => "Antarctica/Vostok",
			"Arctic/Longyearbyen" => "Arctic/Longyearbyen",
			"Asia/Aden" => "Asia/Aden",
			"Asia/Amman" => "Asia/Amman",
			"Asia/Anadyr" => "Asia/Anadyr",
			"Asia/Aqtau" => "Asia/Aqtau",
			"Asia/Aqtobe" => "Asia/Aqtobe",
			"Asia/Ashgabat" => "Asia/Ashgabat",
			"Asia/Ashkhabad" => "Asia/Ashkhabad",
			"Asia/Baghdad" => "Asia/Baghdad",
			"Asia/Bahrain" => "Asia/Bahrain",
			"Asia/Baku" => "Asia/Baku",
			"Asia/Bangkok" => "Asia/Bangkok",
			"Asia/Beirut" => "Asia/Beirut",
			"Asia/Bishkek" => "Asia/Bishkek",
			"Asia/Brunei" => "Asia/Brunei",
			"Asia/Calcutta" => "Asia/Calcutta",
			"Asia/Choibalsan" => "Asia/Choibalsan",
			"Asia/Chongqing" => "Asia/Chongqing",
			"Asia/Chungking" => "Asia/Chungking",
			"Asia/Colombo" => "Asia/Colombo",
			"Asia/Dacca" => "Asia/Dacca",
			"Asia/Damascus" => "Asia/Damascus",
			"Asia/Dhaka" => "Asia/Dhaka",
			"Asia/Dili" => "Asia/Dili",
			"Asia/Dubai" => "Asia/Dubai",
			"Asia/Dushanbe" => "Asia/Dushanbe",
			"Asia/Gaza" => "Asia/Gaza",
			"Asia/Harbin" => "Asia/Harbin",
			"Asia/Hong_Kong" => "Asia/Hong_Kong",
			"Asia/Hovd" => "Asia/Hovd",
			"Asia/Irkutsk" => "Asia/Irkutsk",
			"Asia/Istanbul" => "Asia/Istanbul",
			"Asia/Jakarta" => "Asia/Jakarta",
			"Asia/Jayapura" => "Asia/Jayapura",
			"Asia/Jerusalem" => "Asia/Jerusalem",
			"Asia/Kabul" => "Asia/Kabul",
			"Asia/Kamchatka" => "Asia/Kamchatka",
			"Asia/Karachi" => "Asia/Karachi",
			"Asia/Kashgar" => "Asia/Kashgar",
			"Asia/Katmandu" => "Asia/Katmandu",
			"Asia/Krasnoyarsk" => "Asia/Krasnoyarsk",
			"Asia/Kuala_Lumpur" => "Asia/Kuala_Lumpur",
			"Asia/Kuching" => "Asia/Kuching",
			"Asia/Kuwait" => "Asia/Kuwait",
			"Asia/Macao" => "Asia/Macao",
			"Asia/Macau" => "Asia/Macau",
			"Asia/Magadan" => "Asia/Magadan",
			"Asia/Makassar" => "Asia/Makassar",
			"Asia/Manila" => "Asia/Manila",
			"Asia/Muscat" => "Asia/Muscat",
			"Asia/Nicosia" => "Asia/Nicosia",
			"Asia/Novosibirsk" => "Asia/Novosibirsk",
			"Asia/Omsk" => "Asia/Omsk",
			"Asia/Oral" => "Asia/Oral",
			"Asia/Phnom_Penh" => "Asia/Phnom_Penh",
			"Asia/Pontianak" => "Asia/Pontianak",
			"Asia/Pyongyang" => "Asia/Pyongyang",
			"Asia/Qatar" => "Asia/Qatar",
			"Asia/Qyzylorda" => "Asia/Qyzylorda",
			"Asia/Rangoon" => "Asia/Rangoon",
			"Asia/Riyadh" => "Asia/Riyadh",
			"Asia/Riyadh87" => "Asia/Riyadh87",
			"Asia/Riyadh88" => "Asia/Riyadh88",
			"Asia/Riyadh89" => "Asia/Riyadh89",
			"Asia/Saigon" => "Asia/Saigon",
			"Asia/Sakhalin" => "Asia/Sakhalin",
			"Asia/Samarkand" => "Asia/Samarkand",
			"Asia/Seoul" => "Asia/Seoul",
			"Asia/Shanghai" => "Asia/Shanghai",
			"Asia/Singapore" => "Asia/Singapore",
			"Asia/Taipei" => "Asia/Taipei",
			"Asia/Tashkent" => "Asia/Tashkent",
			"Asia/Tbilisi" => "Asia/Tbilisi",
			"Asia/Tehran" => "Asia/Tehran",
			"Asia/Tel_Aviv" => "Asia/Tel_Aviv",
			"Asia/Thimbu" => "Asia/Thimbu",
			"Asia/Thimphu" => "Asia/Thimphu",
			"Asia/Tokyo" => "Asia/Tokyo",
			"Asia/Ujung_Pandang" => "Asia/Ujung_Pandang",
			"Asia/Ulaanbaatar" => "Asia/Ulaanbaatar",
			"Asia/Ulan_Bator" => "Asia/Ulan_Bator",
			"Asia/Urumqi" => "Asia/Urumqi",
			"Asia/Vientiane" => "Asia/Vientiane",
			"Asia/Vladivostok" => "Asia/Vladivostok",
			"Asia/Yakutsk" => "Asia/Yakutsk",
			"Asia/Yekaterinburg" => "Asia/Yekaterinburg",
			"Asia/Yerevan" => "Asia/Yerevan",
			"Atlantic/Azores" => "Atlantic/Azores",
			"Atlantic/Bermuda" => "Atlantic/Bermuda",
			"Atlantic/Canary" => "Atlantic/Canary",
			"Atlantic/Cape_Verde" => "Atlantic/Cape_Verde",
			"Atlantic/Faeroe" => "Atlantic/Faeroe",
			"Atlantic/Jan_Mayen" => "Atlantic/Jan_Mayen",
			"Atlantic/Madeira" => "Atlantic/Madeira",
			"Atlantic/Reykjavik" => "Atlantic/Reykjavik",
			"Atlantic/South_Georgia" => "Atlantic/South_Georgia",
			"Atlantic/St_Helena" => "Atlantic/St_Helena",
			"Atlantic/Stanley" => "Atlantic/Stanley",
			"Australia/ACT" => "Australia/ACT",
			"Australia/Adelaide" => "Australia/Adelaide",
			"Australia/Brisbane" => "Australia/Brisbane",
			"Australia/Broken_Hill" => "Australia/Broken_Hill",
			"Australia/Canberra" => "Australia/Canberra",
			"Australia/Darwin" => "Australia/Darwin",
			"Australia/Hobart" => "Australia/Hobart",
			"Australia/LHI" => "Australia/LHI",
			"Australia/Lindeman" => "Australia/Lindeman",
			"Australia/Lord_Howe" => "Australia/Lord_Howe",
			"Australia/Melbourne" => "Australia/Melbourne",
			"Australia/NSW" => "Australia/NSW",
			"Australia/North" => "Australia/North",
			"Australia/Perth" => "Australia/Perth",
			"Australia/Queensland" => "Australia/Queensland",
			"Australia/South" => "Australia/South",
			"Australia/Sydney" => "Australia/Sydney",
			"Australia/Tasmania" => "Australia/Tasmania",
			"Australia/Victoria" => "Australia/Victoria",
			"Australia/West" => "Australia/West",
			"Australia/Yancowinna" => "Australia/Yancowinna",
			"Brazil/Acre" => "Brazil/Acre",
			"Brazil/DeNoronha" => "Brazil/DeNoronha",
			"Brazil/East" => "Brazil/East",
			"Brazil/West" => "Brazil/West",
			"CET" => "CET",
			"CST6CDT " => "CST6CDT ",
			"Canada/Atlantic" => "Canada/Atlantic",
			"Canada/Central" => "Canada/Central",
			"Canada/East-Saskatchewan" => "Canada/East-Saskatchewan",
			"Canada/Eastern" => "Canada/Eastern",
			"Canada/Mountain" => "Canada/Mountain",
			"Canada/Newfoundland" => "Canada/Newfoundland",
			"Canada/Pacific" => "Canada/Pacific",
			"Canada/Saskatchewan" => "Canada/Saskatchewan",
			"Canada/Yukon" => "Canada/Yukon",
			"Chile/Continental" => "Chile/Continental",
			"Chile/EasterIsland" => "Chile/EasterIsland",
			"Cuba" => "Cuba",
			"EET" => "EET",
			"EST" => "EST",
			"EST5EDT" => "EST5EDT",
			"Egypt" => "Egypt",
			"Eire" => "Eire",
			"Etc/GMT" => "Etc/GMT",
			"Etc/GMT+0" => "Etc/GMT+0",
			"Etc/GMT+1" => "Etc/GMT+1",
			"Etc/GMT+10" => "Etc/GMT+10",
			"Etc/GMT+11" => "Etc/GMT+11",
			"Etc/GMT+12" => "Etc/GMT+12",
			"Etc/GMT+2" => "Etc/GMT+2",
			"Etc/GMT+3" => "Etc/GMT+3",
			"Etc/GMT+4" => "Etc/GMT+4",
			"Etc/GMT+5" => "Etc/GMT+5",
			"Etc/GMT+6" => "Etc/GMT+6",
			"Etc/GMT+7" => "Etc/GMT+7",
			"Etc/GMT+8" => "Etc/GMT+8",
			"Etc/GMT+9" => "Etc/GMT+9",
			"Etc/GMT-0" => "Etc/GMT-0",
			"Etc/GMT-1" => "Etc/GMT-1",
			"Etc/GMT-10" => "Etc/GMT-10",
			"Etc/GMT-11" => "Etc/GMT-11",
			"Etc/GMT-12" => "Etc/GMT-12",
			"Etc/GMT-13" => "Etc/GMT-13",
			"Etc/GMT-14" => "Etc/GMT-14",
			"Etc/GMT-2" => "Etc/GMT-2",
			"Etc/GMT-3" => "Etc/GMT-3",
			"Etc/GMT-4" => "Etc/GMT-4",
			"Etc/GMT-5" => "Etc/GMT-5",
			"Etc/GMT-6" => "Etc/GMT-6",
			"Etc/GMT-7" => "Etc/GMT-7",
			"Etc/GMT-8" => "Etc/GMT-8",
			"Etc/GMT-9" => "Etc/GMT-9",
			"Etc/GMT0" => "Etc/GMT0",
			"Etc/Greenwich" => "Etc/Greenwich",
			"Etc/UCT" => "Etc/UCT",
			"Etc/UTC" => "Etc/UTC",
			"Etc/Universal" => "Etc/Universal",
			"Etc/Zulu" => "Etc/Zulu",
			"Europe/Amsterdam" => "Europe/Amsterdam",
			"Europe/Andorra" => "Europe/Andorra",
			"Europe/Athens" => "Europe/Athens",
			"Europe/Belfast" => "Europe/Belfast",
			"Europe/Belgrade" => "Europe/Belgrade",
			"Europe/Berlin" => "Europe/Berlin",
			"Europe/Bratislava" => "Europe/Bratislava",
			"Europe/Brussels" => "Europe/Brussels",
			"Europe/Bucharest" => "Europe/Bucharest",
			"Europe/Budapest" => "Europe/Budapest",
			"Europe/Chisinau" => "Europe/Chisinau",
			"Europe/Copenhagen" => "Europe/Copenhagen",
			"Europe/Dublin" => "Europe/Dublin",
			"Europe/Gibraltar" => "Europe/Gibraltar",
			"Europe/Helsinki" => "Europe/Helsinki",
			"Europe/Istanbul" => "Europe/Istanbul",
			"Europe/Kaliningrad" => "Europe/Kaliningrad",
			"Europe/Kiev" => "Europe/Kiev",
			"Europe/Lisbon" => "Europe/Lisbon",
			"Europe/Ljubljana" => "Europe/Ljubljana",
			"Europe/London" => "Europe/London",
			"Europe/Luxembourg" => "Europe/Luxembourg",
			"Europe/Madrid" => "Europe/Madrid",
			"Europe/Malta" => "Europe/Malta",
			"Europe/Mariehamn" => "Europe/Mariehamn",
			"Europe/Minsk" => "Europe/Minsk",
			"Europe/Monaco" => "Europe/Monaco",
			"Europe/Moscow" => "Europe/Moscow",
			"Europe/Nicosia" => "Europe/Nicosia",
			"Europe/Oslo" => "Europe/Oslo",
			"Europe/Paris" => "Europe/Paris",
			"Europe/Prague" => "Europe/Prague",
			"Europe/Riga" => "Europe/Riga",
			"Europe/Rome" => "Europe/Rome",
			"Europe/Samara" => "Europe/Samara",
			"Europe/San_Marino" => "Europe/San_Marino",
			"Europe/Sarajevo" => "Europe/Sarajevo",
			"Europe/Simferopol" => "Europe/Simferopol",
			"Europe/Skopje" => "Europe/Skopje",
			"Europe/Sofia" => "Europe/Sofia",
			"Europe/Stockholm" => "Europe/Stockholm",
			"Europe/Tallinn" => "Europe/Tallinn",
			"Europe/Tirane" => "Europe/Tirane",
			"Europe/Tiraspol" => "Europe/Tiraspol",
			"Europe/Uzhgorod" => "Europe/Uzhgorod",
			"Europe/Vaduz" => "Europe/Vaduz",
			"Europe/Vatican" => "Europe/Vatican",
			"Europe/Vienna" => "Europe/Vienna",
			"Europe/Vilnius" => "Europe/Vilnius",
			"Europe/Warsaw" => "Europe/Warsaw",
			"Europe/Zagreb" => "Europe/Zagreb",
			"Europe/Zaporozhye" => "Europe/Zaporozhye",
			"Europe/Zurich" => "Europe/Zurich",
			"Factory " => "Factory ",
			"GB" => "GB",
			"GB-Eire " => "GB-Eire ",
			"GMT" => "GMT",
			"GMT+0 " => "GMT+0 ",
			"GMT-0 " => "GMT-0 ",
			"GMT0" => "GMT0",
			"Greenwich " => "Greenwich ",
			"HST" => "HST",
			"Hongkong " => "Hongkong ",
			"Iceland" => "Iceland",
			"Indian/Antananarivo" => "Indian/Antananarivo",
			"Indian/Chagos" => "Indian/Chagos",
			"Indian/Christmas" => "Indian/Christmas",
			"Indian/Cocos" => "Indian/Cocos",
			"Indian/Comoro" => "Indian/Comoro",
			"Indian/Kerguelen" => "Indian/Kerguelen",
			"Indian/Mahe" => "Indian/Mahe",
			"Indian/Maldives" => "Indian/Maldives",
			"Indian/Mauritius" => "Indian/Mauritius",
			"Indian/Mayotte" => "Indian/Mayotte",
			"Indian/Reunion" => "Indian/Reunion",
			"Iran " => "Iran ",
			"Israel " => "Israel ",
			"Jamaica" => "Jamaica",
			"Japan " => "Japan ",
			"Kwajalein" => "Kwajalein",
			"Libya " => "Libya ",
			"MET" => "MET",
			"MST" => "MST",
			"MST7MDT" => "MST7MDT",
			"Mexico/BajaNorte" => "Mexico/BajaNorte",
			"Mexico/BajaSur" => "Mexico/BajaSur",
			"Mexico/General" => "Mexico/General",
			"Mideast/Riyadh87" => "Mideast/Riyadh87",
			"Mideast/Riyadh88" => "Mideast/Riyadh88",
			"Mideast/Riyadh89" => "Mideast/Riyadh89",
			"NZ" => "NZ",
			"NZ-CHAT" => "NZ-CHAT",
			"Navajo" => "Navajo",
			"PRC" => "PRC",
			"PST8PDT " => "PST8PDT ",
			"Pacific/Apia" => "Pacific/Apia",
			"Pacific/Auckland" => "Pacific/Auckland",
			"Pacific/Chatham" => "Pacific/Chatham",
			"Pacific/Easter" => "Pacific/Easter",
			"Pacific/Efate" => "Pacific/Efate",
			"Pacific/Enderbury" => "Pacific/Enderbury",
			"Pacific/Fakaofo" => "Pacific/Fakaofo",
			"Pacific/Fiji" => "Pacific/Fiji",
			"Pacific/Funafuti" => "Pacific/Funafuti",
			"Pacific/Galapagos" => "Pacific/Galapagos",
			"Pacific/Gambier" => "Pacific/Gambier",
			"Pacific/Guadalcanal" => "Pacific/Guadalcanal",
			"Pacific/Guam" => "Pacific/Guam",
			"Pacific/Honolulu" => "Pacific/Honolulu",
			"Pacific/Johnston" => "Pacific/Johnston",
			"Pacific/Kiritimati" => "Pacific/Kiritimati",
			"Pacific/Kosrae" => "Pacific/Kosrae",
			"Pacific/Kwajalein" => "Pacific/Kwajalein",
			"Pacific/Majuro" => "Pacific/Majuro",
			"Pacific/Marquesas" => "Pacific/Marquesas",
			"Pacific/Midway" => "Pacific/Midway",
			"Pacific/Nauru" => "Pacific/Nauru",
			"Pacific/Niue" => "Pacific/Niue",
			"Pacific/Norfolk" => "Pacific/Norfolk",
			"Pacific/Noumea" => "Pacific/Noumea",
			"Pacific/Pago_Pago" => "Pacific/Pago_Pago",
			"Pacific/Palau" => "Pacific/Palau",
			"Pacific/Pitcairn" => "Pacific/Pitcairn",
			"Pacific/Ponape>Pacific/Pona" => "Pacific/Ponape>Pacific/Pona",
			"Pacific/Port_Moresby" => "Pacific/Port_Moresby",
			"Pacific/Rarotonga" => "Pacific/Rarotonga",
			"Pacific/Saipan" => "Pacific/Saipan",
			"Pacific/Samoa" => "Pacific/Samoa",
			"Pacific/Tahiti" => "Pacific/Tahiti",
			"Pacific/Tarawa" => "Pacific/Tarawa",
			"Pacific/Tongatapu" => "Pacific/Tongatapu",
			"Pacific/Truk" => "Pacific/Truk",
			"Pacific/Wake" => "Pacific/Wake",
			"Pacific/Wallis" => "Pacific/Wallis",
			"Pacific/Yap" => "Pacific/Yap",
			"Poland" => "Poland",
			"Portugal " => "Portugal ",
			"ROK" => "ROK",
			"Singapore" => "Singapore",
			"SystemV/AST4" => "SystemV/AST4",
			"SystemV/AST4ADT" => "SystemV/AST4ADT",
			"SystemV/CST6" => "SystemV/CST6",
			"SystemV/CST6CDT" => "SystemV/CST6CDT",
			"SystemV/EST5" => "SystemV/EST5",
			"SystemV/EST5EDT" => "SystemV/EST5EDT",
			"SystemV/HST10" => "SystemV/HST10",
			"SystemV/MST7" => "SystemV/MST7",
			"SystemV/MST7MDT" => "SystemV/MST7MDT",
			"SystemV/PST8" => "SystemV/PST8",
			"SystemV/PST8PDT" => "SystemV/PST8PDT",
			"SystemV/YST9" => "SystemV/YST9",
			"SystemV/YST9YDT" => "SystemV/YST9YDT",
			"Turkey" => "Turkey",
			"UCT" => "UCT",
			"US/Alaska" => "US/Alaska",
			"US/Aleutian" => "US/Aleutian",
			"US/Arizona" => "US/Arizona",
			"US/Central" => "US/Central",
			"US/East-Indiana" => "US/East-Indiana",
			"US/Eastern" => "US/Eastern",
			"US/Hawaii" => "US/Hawaii",
			"US/Indiana-Starke" => "US/Indiana-Starke",
			"US/Michigan" => "US/Michigan",
			"US/Mountain" => "US/Mountain",
			"US/Pacific" => "US/Pacific",
			"US/Samoa" => "US/Samoa",
			"UTC" => "UTC",
			"Universal" => "Universal",
			"W-SU" => "W-SU ",
			"WET" => "WET",
			"Zulu" => "Zulu");	
		
 	 }
 	 
 	function architecture ($cpu) {
 		/* function: architecture
   	
   	  	 purpose:  to establish CPU architecture semantics for this operating system
   	   
   	   	returns:  all and currently selected CPU arch.
   	*/
   		return $cpu = array("" => "-->Pick a CPU type", // note the architecture's nomenclature here; this is referenced by 
   		             "i386" => "Intel x86 32-bit", // the tftpboot sequence so the architecture names chosen here are
   			   "amd64" => "AMD Opteron or Athlon64 64-bit", // very important!
   			   "ia64" => "Intel Itanium 64-bit"); 
   		//return $cpu;
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
	
	function notify($value) {
 		/* function: notify
   	
   	  	   purpose:  toggle email (or other method--SNMP) notification of server install progress
   	   
   	   	   returns:  notify status
   	          */
   		$notify = array("yes" => "Yes (Notify me)",
   			   "no" => "No"
 			);
   			   
   		return $notify;
	}
	
	function netaddressing($type) {
 		/* function: netaddressing
   	
   	  	 purpose:  toggle between static and dynamic IP addressing
   	   
   	   	returns:  all and currently selected IP addressing type
   	*/
   		$address_type = array("" => "-->Pick a network address type",
   			   "static" => "Static IP Address",
   			   "dynamic" => "Dynamic IP address",
   			   );
   			   
   		return $address_type;
	}
	function languages($langs) { 
		$lang = array("" => "-->Pick a language",
					"af_ZA" => "Afrikaans (South Africa)",
					"sq_AL" => "Albanian",
					"ar_DZ" => "Arabic (Algeria)",
					"ar_BH" => "Arabic (Bahrain)",
					"ar_EG" => "Arabic (Egypt)",
					"ar_IN" => "Arabic (India)",
					"ar_IQ" => "Arabic (Iraq)",
					"ar_JO" => "Arabic (Jordan)",
					"ar_KW" => "Arabic (Kuwait)",
					"ar_LB" => "Arabic (Lebanon)",
					"ar_LY" => "Arabic (Libyan)",
					"ar_MA" => "Arabic (Morocco)",
					"ar_OM" => "Arabic (Oman)",
					"ar_QA" => "Arabic (Qatar)",
					"ar_SA" => "Arabic (Saudi",
					"ar_SD" => "Arabic (Sudan)",
					"ar_SY" => "Arabic (Syrian",
					"ar_TN" => "Arabic (Tunisia)",
					"ar_AE" => "Arabic (United",
					"ar_YE" => "Arabic (Yemen)",
					"eu_ES" => "Basque (Spain)",
					"be_BY" => "Belarusian",
					"bn_BD" => "Bengali (BD)",
					"bn_IN" => "Bengali (India)",
					"bs_BA" => "Bosnian (Bosnia",
					"br_FR" => "Breton (France)",
					"bg_BG" => "Bulgarian",
					"ca_ES" => "Catalan (Spain)",
					"zh_HK" => "Chinese (Hong",
					"zh_CN.GB18030" => "Chinese (P.R.C.)",
					"zh_TW" => "Chinese (Taiwan)",
					"kw_GB" => "Cornish (Britain)",
					"hr_HR" => "Croatian",
					"cs_CZ" => "Czech",
					"da_DK" => "Danish",
					"nl_BE" => "Dutch (Belgium)",
					"nl_NL" => "Dutch (Netherlands)",
					"en_AU" => "English (Australia)",
					"en_BW" => "English (Botswana)",
					"en_CA" => "English (Canada)",
					"en_DK" => "English (Denmark)",
					"en_GB" => "English (Great Britain)",
					"en_HK" => "English (Hong Kong)",
					"en_IN" => "English (India)",
					"en_IE" => "English (Ireland)",
					"en_NZ" => "English (New Zealand)",
					"en_PH" => "English (Philippines)",
					"en_SG" => "English (Singapore)",
					"en_ZA" => "English (South Africa)",
					"en_US" => "English (USA)",
					"en_ZW" => "English (Zimbabwe)",
					"et_EE" => "Estonian",
					"fo_FO" => "Faroese (Faroe Islands)",
					"fi_FI" => "Finnish",
					"fr_BE" => "French (Belgium)",
					"fr_CA" => "French (Canada)",
					"fr_FR" => "French (France)",
					"fr_LU" => "French (Luxemburg)",
					"fr_CH" => "French (Switzerland)",
					"gl_ES" => "Galician (Spain)",
					"de_AT" => "German (Austria)",
					"de_BE" => "German (Belgium)",
					"de_DE" => "German (Germany)",
					"de_LU" => "German (Luxemburg)",
					"de_CH" => "German (Switzerland)",
					"el_GR" => "Greek",
					"kl_GL" => "Greenlandic (Greenland)",
					"gu_IN" => "Gujarati (India)",
					"he_IL" => "Hebrew (Israel)",
					"hi_IN" => "Hindi (India)",
					"hu_HU" => "Hungarian",
					"is_IS" => "Icelandic",
					"id_ID" => "Indonesian",
					"ga_IE" => "Irish",
					"it_IT" => "Italian (Italy)",
					"it_CH" => "Italian (Switzerland)",
					"ja_JP" => "Japanese",
					"ko_KR" => "Korean (Republic",
					"lo_LA" => "Lao (Laos)",
					"lv_LV" => "Latvian (Latvia)",
					"lt_LT" => "Lithuanian",
					"mk_MK" => "Macedonian",
					"ms_MY" => "Malay (Malaysia)",
					"mt_MT" => "Maltese (malta)",
					"gv_GB" => "Manx Gaelic",
					"mr_IN" => "Marathi (India)",
					"se_NO" => "Northern Saami",
					"no_NO" => "Norwegian",
					"nn_NO" => "Norwegian, Nynorsk",
					"oc_FR" => "Occitan (France)",
					"fa_IR" => "Persian (Iran)",
					"pl_PL" => "Polish",
					"pt_BR" => "Portuguese (Brasil)",
					"pt_PT" => "Portuguese (Portugal)",
					"pa_IN" => "Punjabi (India)",
					"ro_RO" => "Romanian",
					"ru_RU" => "Russian",
					"ru_UA" => "Russian (Ukraine)",
					"sr_YU@cyrillic" => "Serbian (Yugoslavia)",
					"sk_SK" => "Slovak",
					"sl_SI" => "Slovenian (Slovenia)",
					"es_AR" => "Spanish (Argentina)",
					"es_BO" => "Spanish (Bolivia)",
					"es_CL" => "Spanish (Chile)",
					"es_CO" => "Spanish (Colombia)",
					"es_CR" => "Spanish (Costa Rica)",
					"es_DO" => "Spanish (Dominican Republic)",
					"es_SV" => "Spanish (El Salvador)",
					"es_EC" => "Spanish (Equador)",
					"es_GT" => "Spanish (Guatemala)",
					"es_HN" => "Spanish (Honduras)",
					"es_MX" => "Spanish (Mexico)",
					"es_NI" => "Spanish (Nicaragua)",
					"es_PA" => "Spanish (Panama)",
					"es_PY" => "Spanish (Paraguay)",
					"es_PE" => "Spanish (Peru)",
					"es_PR" => "Spanish (Puerto Rico)",
					"es_ES" => "Spanish (Spain)",
					"es_US" => "Spanish (USA)",
					"es_UY" => "Spanish (Uruguay)",
					"es_VE" => "Spanish (Venezuela)",
					"sv_FI" => "Swedish (Finland)",
					"sv_SE" => "Swedish (Sweden)",
					"tl_PH" => "Tagalog (Philipines)",
					"ta_IN" => "Tamil (India)",
					"te_IN" => "Telgu (India)",
					"th_TH" => "Thai",
					"tr_TR" => "Turkish",
					"uk_UA" => "Ukrainian",
					"ur_PK" => "Urdu (Pakistan)",
					"uz_UZ" => "Uzbek (Uzbekistan)",
					"wa_BE@euro" => "Walloon (Belgium)",
					"cy_GB" => "Welsh (Great Britain)",
					"xh_ZA" => "Xhosa (South Africa)",
					"zu_ZA" => "Zulu (South Africa)");
			
			foreach ($lang as $k => $v) {
				if ($k == $langs) {
					$selected_lang = "SELECTED"; 
				}
				else {
					$selected_lang = "";
				}
				$lang_list .= "<option value=\"". $k ."\" $selected_lang>". $v ."</option>\n"; 
			}
		return $lang;
	}
} // end of OS_*_Deploy class definition
