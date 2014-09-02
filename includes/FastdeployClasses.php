<?php

// Serverminds Fastdeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

// Standard FastDeploy classes.  This will hopefully be a standard group of classes
// that can be addressed as an API by other scripts. 

class Fastdeploy {	// we need a constructor here for real API calls	
	
	var $_config; 
	
	function Fastdeploy () {
		
	}
  
  	function setConfig($key, $value) {
		assert('!empty($key)');
		$this->_config[$key] = $value;
    	}

    		
	function getConfig($key) {
		assert('!empty($key)');
		return $this->_config[$key];
	}
		
   	function os_menu() { 
		/* function: os_menu() 
	
	   	   purpose:  feeds back options to be used in tree-oriented left-hand menu
	   	   
	   	   returns:  array of whatever values you want to pass back to the calling menu creation function
		*/
		$OSes = array(); 
		$ret = loadPlugins(); 
		sort($ret,SORT_REGULAR); // sort the array so it sort of looks organized on the sidebar... 
		foreach ($ret as $col => $key) { 
			if ($key['deployable'] == "yes") { // don't bother to display if the deployable option is set to "no"
				if ($key['os_subversion'] != '') { // handle subversions of an OS (e.g., "Windows XP >> Professional <<")
					array_push($OSes,'<div dojoType="TreeNode" id="'. $key['os_friendly_name'] .'" title="'. $key['os_friendly_name'] .'" object="add.php?os_name='. $key['os_name'] .'&os_subversion='. $key['os_subversion'] .'&os_version='. $key['os_version'] .'"></div>');
				}
				else { 
					array_push($OSes,'<div dojoType="TreeNode" "'. $key['os_friendly_name'] .'" title="'. $key['os_friendly_name'] .'" object="add.php?os_name='. $key['os_name'] .'&os_version='. $key['os_version'] .'"></div>');
				}
			}
		}

   		$list = implode ("",$OSes);
   		return $list; 
   	}
   	
   	function json_menu() { 
		/* function: json_menu() 
	
	   	   purpose:  feeds back OS items to be used in tree-oriented left-hand menu
	   	   
	   	   returns:  JSON formatted 
		*/
		$OSes = array(); 
		$ret = loadPlugins(); 
		sort($ret,SORT_REGULAR); // sort the array ... 
		array_push($OSes,"{
        				identifier: 'id',
        			  	label: 'label',
        				items: ["); 
		foreach ($ret as $col => $key) { 
			if ($key['deployable'] == "yes") { // don't bother to display if the deployable option is set to "no"
				
				if ($key['os_subversion'] != '') { // handle subversions of an OS (e.g., "Windows XP >> Professional <<")
					$os_concatenated_name = $key['os_name'] ."_". $key['os_version'] ."_". $key['os_subversion']; 
					array_push($OSes,'{ "type": "os","id" : "'. $os_concatenated_name .'","label" : "'. $key['os_friendly_name'] .'"},');
				}
				else { 
					$os_concatenated_name = $key['os_name'] ."_". $key['os_version']; 
					array_push($OSes,'{ "type": "os","id" : "'. $os_concatenated_name .'","label" : "'. $key['os_friendly_name'] .'"},');
				}
			}
		}
		array_push($OSes,"]
			}"); 
			
   		$list = implode ("",$OSes);
   		//$list = preg_replace("/,]/","",$list); 
   		return $list; 
   	}
   	
   	function manage_menu() { 
		/* function: manage_menu() 
	
	   	   purpose:  feeds back options to be used in tree-oriented left-hand menu
	   	   
	   	   returns:  whatever values you want to pass back to the calling menu creation function
		*/

   		//$list = implode ("",$OSes);
   		return '<div dojoType="TreeNode" title="List / Edit Systems" object="list.php"> </div>
   			<div dojoType="TreeNode" title="Create Standard System Profile" object="profile.php"> </div>
   			<div dojoType="TreeNode" title="Deploy using a standard profile" object="deploy_profile.php"> </div>';  
   	}
   	
   	function tools_menu() { 
		/* function: tools_menu() 
	
	   	   purpose:  feeds back options to be used in tree-oriented left-hand menu
	   	   
	   	   returns:  whatever values you want to pass back to the calling menu creation function
		*/
		
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$check_access = $con->queryRow("SELECT customer_id,fd_group FROM users WHERE customer_id='". $_SESSION['username'] ."'"); 
		}
		
		if ($check_access[1] == "admin") { // show additional options only available to admins
			$admin_text = '<div dojoType="TreeNode" title="Create / Edit Users and Groups" object="list_users.php"> </div>
   			<div dojoType="TreeNode" title="Edit Configuration" object="/config"> </div>
   			';
		}		
		
   		return '<div dojoType="TreeNode" title="Create / Edit Windows install images" object="list_images.php"> </div>' . $admin_text .'';  
   	}
        	
        	function queryServer($mac) { 
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$server_check = $con->queryRow("SELECT * FROM ". OPSYS ." WHERE mac='". $mac ."'",null, MDB2_FETCHMODE_ASSOC); 
			return $server_check; 
		}
	}
	
	 function queryServerEntry($mac) { // queries from the generic servers table rather than the operating system specific table
	 			     // we query here to avoid duplication of existing server entries in the generic table
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$server_check = $con->queryRow("SELECT * FROM servers WHERE mac='". $mac ."'",null, MDB2_FETCHMODE_ASSOC); 
			return $server_check; 
		}
	}	
	 function queryProfileEntry($id) { // queries from the generic profiles table to return an existing profile
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$profile_check = $con->queryRow("SELECT profile_id, os_name, os_version, os_subversion, profile_create_name FROM profiles WHERE profile_id=". $id ."",null, MDB2_FETCHMODE_ASSOC); 
			// return the ACTUAL profile data from the OS' table rather than from profiles which doesn't give us the meat
			// of the profile information (hostname, IP, etc)
			$profile_check_server = $con->queryRow("SELECT * FROM ". OPSYS ." WHERE profile_create_name='". $profile_check['profile_create_name'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			return $profile_check_server; 
		}
	}
	
	function queryImage($id) { 
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$images_check = $con->queryRow("SELECT * FROM windows_images WHERE imageid='". $id ."'",null, MDB2_FETCHMODE_ASSOC); 
			
			return $images_check; 
		}
	}
	
	function queryUser($id) { 
		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$user_check = $con->queryRow("SELECT * FROM users WHERE uid='". $id ."'",null, MDB2_FETCHMODE_ASSOC); 
			
			return $user_check; 
		}
	}
	
	function list_win_images() {
		/** function:  list_win_images()
		 *
                     *     purpose:  to display a list of editable Windows operating system images (install files).
                     *     
                     */
                     $con =& MDB2::connect(unserialize(DSN), $dsn_options);
		 if (PEAR::isError($con)) {
		    	die($con->getMessage());
		 }
		 else { 
                     	$query = $con->query("SELECT * FROM windows_images"); // should we use os_subversion here as well?													// or perhaps an array of supportable versions is better...
        			if ($query->numRows() > 0) {        				
	 			return $query;
			}
		}
	}
        	
        	 function server_op($op) {
                        /* function:  add_server()

                           purpose:  to add/edit/modify a server to deploy/install an operating system to
                        */

                	include ('modules/'. CLASSFILE_OS);       	
                	$template =& new Smarty;
		//$tpl->template_dir = '.';
		$template->compile_dir  = '/tmp';
		$template->left_delimiter = '{{';
    		$template->right_delimiter = '}}';   
    		$class = CLASS_OS; // set the form to be used based on the chosen operating system 
    		
    		/* there needs to be something here that checks to see if we actually WANT to use the form
    		   checking mechanisms at all (i.e., CLI or other API-driven add/edit/remove mechanism). 
    		*/
    		
    		if (($op == "edit") || ($op == "profile_edit") || ($op == "profile_deploy")) { 
    			$form = new $class($op);
			//$form=FastDeploy::addForm($op); 
    			if ($op == "edit") {
    				$set_edit = Fastdeploy::queryServer($_GET['mac']);
    			}
    			if (($op == "profile_edit") || ($op == "profile_deploy")) { // don't bother to do this unless it's truly a profile edit
    									// otherwise it messes up the MAC address retrieval process
    				$set_profile = FastDeploy::queryProfileEntry($_GET['profile_id']); 
    			}
    			if ($set_edit) { 
    				$form->setDefaults($set_edit); // populate the form with existing data - HTML_Quickform makes this very easy
    				$software = ereg_replace(" ",",",$set_edit['software']); // split the returned profiles with commas - maybe we set it this way inside the DB (escaped commas - yuck)?   			
    				$form->setDefaults(array('software' => $software)); // this sets the default SELECTed software profile array back
    			}
    			elseif ($set_profile) {
    				$form->setDefaults($set_profile); 	
    				$form->setDefaults(array("mac" => "")); // blank the mac address from the defaults because this will in fact be a new server
    				$software = ereg_replace(" ",",",$set_profile['software']); // split the returned profiles with commas - maybe we set it this way inside the DB (escaped commas - yuck)?   			
    				$form->setDefaults(array('software' => $software)); // this sets the default SELECTed software profile array back
    			}
    			else { 
    				$form->setDefaults($_GET); 	
    			}
		}
		elseif ($op == "profile_create") {
			$form = new $class($op);
			$form->setDefaults(array("mac" => "profile")); 	// make the mac field generic for profiles so it's easy to pick profiles
								// out of the database and exclude them from a general server list.
		}
		elseif ($op == "add") { // no  default operation to be performed on the Form instantiation
			$form = new $class($op);	
		}
    			
	       	if ($form->validate()) {
	       			FastDeploy::addDB(); // add the server to the database...
	                  		$form->freeze();
		          	
		          	if ($_POST['profile_create_name'] == "") { // don't bother to create config files if we are just creating a profile 
		        			$form->WriteFile(); // now write the variables to the template configuration script file (Kickstart, Preseed, Unattend.txt, etc.
		        		}
		        		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		        		$soft = array(); 
				foreach ($_POST as $name => $val) { 
					if ($name == 'software') { 
						for ($i=0; $i < sizeof($val); $i++) { // this is done so we can produce a human readable output from the software table
							$software_chk = $con->queryRow("SELECT pid,title FROM software WHERE pid='". $val[$i] ."'",null, MDB2_FETCHMODE_ASSOC); 
							array_push($soft, $software_chk['title']); 	
						}
					}
					$template->assign($name,$val); 
				}
				if (sizeof($soft) > 0) { 
					$val = implode(",\n",$soft); // implode the returned (via $_POST) software form array so we can see it
					$template->assign("software",$val); 
				}
				
				$template->assign("edit_again", "<A HREF=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"edit.php?os_name=". OS_NAME ."&os_version=". OS_VERSION ."&os_subversion=". OS_SUBVERSION ."&mac=". $_POST['mac'] ."\");'>Make changes to this server again</a>"); 
				$list = $template->display("system_done.html");				
	    	}
	    	else { // display the default form
				// Create the Smarty renderer object that HTML_Quickform will shuffle its output to
				$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($template);
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
				
				//$form->setDefaults(array('software' => 'blah')); 
				$form->setRequiredNote($rn); 
				
				// build the HTML for the form
				$form->accept($renderer);
	
				// assign QFAMS (advmultiselect) Javascript 
				//$template->assign('advmultiselect_js', $ams->getElementJs(false);); 

				// assign array with form data
				$template->assign('form_data', $renderer->toArray());
				
				// parse and display the template
				$list = $template->display(OPSYS .".html");
	    	}
                	return $list;
        	}        
        	
        	function list_servers() { 
        		
        		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$template =& new Smarty;
			//$tpl->template_dir = '.';
			$template->compile_dir  = '/tmp';
			$template->left_delimiter = '{{';
	    		$template->right_delimiter = '}}';  
	    		
	    		if ($_REQUEST['op'] == "server_delete") { // delete the profile record sent back from the script
				$check_server_name = $con->queryRow("SELECT serverid,mac FROM servers WHERE mac='". $_REQUEST['mac'] ."'"); 
				$profile_delete = $con->queryRow("DELETE FROM servers WHERE mac='". $_REQUEST['mac'] ."'"); 
				$profile_server_delete = $con->queryRow("DELETE FROM ". OPSYS ." WHERE mac='". $check_server_name[1] ."'"); 
			} // don't show profiles here
			$server_list = $con->query("SELECT os_name,os_version,os_subversion,hostname,mac,serverid FROM servers WHERE mac!='profile'"); 
			
			$allboxen = array(); 
			$row_num = 0; 
	   		while($item_row = $server_list->fetchRow()) { 
	   			if ($os_name == "RedHat") { $icon = "redhat_icon.png"; } 
	   			elseif ($item_row[0] == "RedHat") { $icon = "redhat_icon.png"; } 
	   			elseif ($item_row[0] == "CentOS") { $icon = "centos_icon_20.png"; } 
	   			elseif ($item_row[0] == "Debian") { $icon = "debian_icon.png"; } 
	   			elseif ($item_row[0] == "Fedora") { $icon = "fedora_icon.png"; } 
	   			elseif ($item_row[0] == "Ubuntu") { $icon = "ubuntu_icon.png"; } 
	   			elseif ($item_row[0] == "Windows") { $icon = "windows_icon.png"; } 
	   			elseif ($item_row[0] == "VMware") { $icon = "vmware_icon.png"; } 
	   			array_push($allboxen,"<tr><td><font><IMG SRC=\"images/os/". $icon ."\"> &nbsp;". $item_row[0] ." ". $item_row[1] ." ". $item_row[2] ."</font></td><td><font>". $item_row[4] ."</font></td><td><font>". $item_row[3] ."
	   				<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   			    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"list.php?os_name=". $item_row[0] ."&os_version=". $item_row[1] ."&os_subversion=". $item_row[2] ."&serverid=". $item_row[3] ."&op=server_delete&mac=". $item_row[4] ."\");'>yes?</a><a href=\"#\" onClick=\"applyDisplay('on','show_del[". $row_num ."]'); applyDisplay('off','show_yesno[". $row_num ."]');\"> no?</a></font></div></td>
	   			<td><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"edit.php?os_name=". $item_row[0] ."&os_version=". $item_row[1] ."&os_subversion=". $item_row[2] ."&mac=". $item_row[4] ."\");'>edit?</a></font></td></tr>"); 
	   			$row_num++; 
			 	                 
	   		}
	   		$allboxen = implode("",$allboxen); 
	   		$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($template);
		
			// assign array with lists
			$template->assign('data_set', $allboxen);

			// parse and display the template
			$list = $template->display("server_list.html");
    		
                		return $list;
	   	}
        	}
        	
        	function list_images() { 
        		
        		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$template =& new Smarty;
			$template->compile_dir  = '/tmp';
			$template->left_delimiter = '{{';
	    		$template->right_delimiter = '}}';  
	    		if ($_REQUEST['op'] == "delete") { // delete the profile record sent back from the script
				$image_delete = $con->queryRow("DELETE FROM windows_images WHERE imageid='". $_REQUEST['imageid'] ."'"); 
				
			} // don't show profiles here
			$server_list = $con->query("SELECT * FROM windows_images"); 
			//<b>os</b><b>mac</b><b>Addr</b><b>IP</b><b>host</b><b>arch</b><b>drive
			//$server_list = $con->query("SELECT t1.os_name, t1.os_version, t1.os_subversion,t1.mac,t1.addrtype,t1.hostname,t1.ip,t1.cpu,t1.hd FROM ". OPSYS ." t1, servers t2 WHERE t1.mac = t2.mac"); 
			$allboxen = array(); 
			$row_num = 0; 
	   		while($item_row = $server_list->fetchRow()) { 
	   			array_push($allboxen,"<tr><td><font>". $item_row[1] ."</font></td><td><font>". $item_row[4] ."</font></td><td><font>". $item_row[3] ."
	   				<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   			    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"list_images.php?op=delete&imageid=". $item_row[0] ."\");'>yes?</a><a href=\"#\" onClick=\"applyDisplay('on','show_del[". $row_num ."]'); applyDisplay('off','show_yesno[". $row_num ."]');\">no?</a></font></div></td>
	   			<td><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"winadmin.php?op=edit&imageid=". $item_row[0] ."\");'>edit?</a></font></td></tr>"); 
			 	$row_num++;
	   		}
	   		array_push($allboxen,"<table id=bluebox><tr><td>... or just<B> <A HREF=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"winadmin.php\");'>Create a new installable Windows image profile</a></b></td></tr></table>"); 
	   		$allboxen = implode("",$allboxen); 
	   		$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($template);
		
			// assign array with lists
			$template->assign('data_set', $allboxen);

			// parse and display the template
			$list = $template->display("image_list.html");
    		
                		return $list;
	   	}
        	}
        	
        	function list_profiles() { 
        		
        		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$template =& new Smarty;
			$template->compile_dir  = '/tmp';
			$template->left_delimiter = '{{';
	    		$template->right_delimiter = '}}';  
			
			$allboxen = array(); 
			$row_num = 0;
			if ($_REQUEST['op'] == "profile_delete") { // delete the profile record sent back from the script
				$check_profile_name = $con->queryRow("SELECT profile_id,profile_create_name FROM profiles WHERE profile_id=". $_REQUEST['profile_id'] .""); 
				$profile_delete = $con->queryRow("DELETE FROM profiles WHERE profile_id='". $_REQUEST['profile_id'] ."'"); 
				$profile_server_delete = $con->queryRow("DELETE FROM ". OPSYS ." WHERE profile_create_name='". $check_profile_name[1] ."'"); 
			}
			// make sure we run this query AFTER deleting a profile ;-)
			$profile_list = $con->query("SELECT os_name,os_version,os_subversion,profile_id,profile_create_name FROM profiles"); 
			
	   		while($item_row = $profile_list->fetchRow()) { 
	   			
	   			array_push($allboxen,"<tr><td><font>". $item_row[0] ." ". $item_row[1] ." ". $item_row[2] ."</font></td>
	   					<td><font>". $item_row[4] ."</font></td>
	   				   			<td><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"add.php?os_name=". $item_row[0] ."&os_version=". $item_row[1] ."&os_subversion=". $item_row[2] ."&profile_id=". $item_row[3] ."&op=profile_edit\");'>edit?</a></TD>
	   				   			<TD><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"add.php?os_name=". $item_row[0] ."&os_version=". $item_row[1] ."&os_subversion=". $item_row[2] ."&profile_id=". $item_row[3] ."&op=profile_deploy\");'>Deploy using this profile</a></font></td>
	   				   				<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   			    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"deploy_profile.php?os_name=". $item_row[0] ."&os_version=". $item_row[1] ."&os_subversion=". $item_row[2] ."&profile_id=". $item_row[3] ."&op=profile_delete\");'>yes?</a><a href=\"#\" onClick=\"applyDisplay('on','show_del[". $row_num ."]'); applyDisplay('off','show_yesno[". $row_num ."]');\"> no?</a></font></div></td>
	   				   			</tr>"); 
	   			$row_num++; 			 	                 
	   		}
	   		$allboxen = implode("",$allboxen); 
	   		$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($template);
		
			// assign array with lists
			$template->assign('data_set', $allboxen);

			// parse and display the template
			$list = $template->display("profile_list.html");
    		
                		return $list;
	   	}
        	}
        	
        	function list_users() { 
        		
        		$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$template =& new Smarty;
			$template->compile_dir  = '/tmp';
			$template->left_delimiter = '{{';
	    		$template->right_delimiter = '}}';  
	    		if ($_REQUEST['op'] == "delete") { // delete the profile record sent back from the script - make sure we NEVER delete the admin!
				$image_delete = $con->queryRow("DELETE FROM users WHERE uid='". $_REQUEST['uid'] ."' AND customer_id <> 'admin'"); 
				
			} // don't show profiles here
			$user_list = $con->query("SELECT * FROM users"); 			
			$allusers = array(); 
			$row_num = 0; 
	   		while($item_row = $user_list->fetchRow()) { 
	   			array_push($allusers,"<tr><td><font>". $item_row[1] ."</font></td><td><font>". $item_row[6] ."</font></td>
	   				<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   			    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"list_users.php?op=delete&uid=". $item_row[0] ."\");'>yes?</a><a href=\"#\" onClick=\"applyDisplay('on','show_del[". $row_num ."]'); applyDisplay('off','show_yesno[". $row_num ."]');\">no?</a></font></div></td>
	   			<td><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"useradmin.php?op=edit&uid=". $item_row[0] ."\");'>edit?</a></font></td></tr>"); 
			 	$row_num++;
	   		}
	   		array_push($allusers,"<table id=bluebox><tr><td>... or just<B> <A HREF=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"useradmin.php\");'>Create a new user</a></b></td></tr></table>"); 
	   		$allusers = implode("",$allusers); 
	   		$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($template);
		
			// assign array with lists
			$template->assign('data_set', $allusers);

			// parse and display the template
			$list = $template->display("user_list.html");
    		
                		return $list;
	   	}
        	}
        	
        	function profile_show($os_name,$os_version) {
        		/* function:  profile_show()

                       purpose:  scans local and potentially remote databases for package or profile scripts / text 
                       to install various operating system tools and packages; e.g., "Web Server","MySQL Server",
                       "Mail Server", etc.
                       
                       returns:  array of profile names (not the profile script/text content?)
                   	*/
                
        		$con =& MDB2::connect(unserialize(DSN), unserialize(DSN_OPTIONS));
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			$con->setFetchMode(MDB2_FETCHMODE_ASSOC);
        			// Query column order matters here because it reflects on the SELECT, OPTIONS values returned to the form
        			$query = $con->query("SELECT script_text,title FROM software WHERE os_name='". $os_name ."' AND os_version='". $os_version ."'"); // this must be used because queryAll() doesn't return the rows
        			$fetched_query = $con->queryAll("SELECT pid,title FROM software WHERE os_name='". $os_name ."' AND os_version='". $os_version ."'",'','',$rekey = true); // should we use os_subversion here as well?
        																		// or perhaps an array of supportable versions is better...
        			if ($query->numRows() > 0) {        				
	 			return $fetched_query;
 			} 
 			else { // no profiles for this OS, return false...
 				return false;	
 			}       		
        		}
        	}
        	
        	function addDB() {
        		/* function:  addDB() 
	
	   	   purpose:  checks for the existence of the MAC address in the DB and, if it does not exist, adds the server to the DB
	   	   
	   	   returns:  success or failure (failure comes if the MAC address already exists)
		*/ 		
		$con =& MDB2::factory(unserialize(DSN));
		
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else {  
			foreach ($_POST as $col => $value) {	
				if ($col != 'notify') {
					if ($col != 'password') { // columns we want to exclude
						if ($col != 'password_confirm') { // could this be more kludgy?  eh?
							$sql_columns .= "". $col .","; 							
							if ($col == "software") { 		
								$value = implode (" ", $value); 
								
								$sql_values .= "'". $value ."',"; // flatten the profiles array so it writes to the DB "neatly"
								$update_sql .= $col ."='". $value ."',"; 
							}
							elseif (($col == "pre_install") || ($col == "post_install")) {
								$gpc = get_magic_quotes_gpc(); 
								if ($gpc) { // verify magic_quotes_gpc is NOT enabled before adding slashes (avoids double-quoting)
									$sql_values .= "'". $value ."',"; // flatten the profiles array so it writes to the DB "neatly"
									$update_sql .= $col ."='". $value ."',"; 
								}
								else { 
									$value = addslashes($value); 
									$sql_values .= "'". $value ."',"; // flatten the profiles array so it writes to the DB "neatly"
									$update_sql .= $col ."='". $value ."',"; 
								}
							}
							elseif ($col == "mac") { 
								if ($_POST['profile_create_name'] != "" ) { 
									$value = "profile";
									$sql_values .= "'". $value ."',"; // flatten the profiles array so it writes to the DB "neatly"
									$update_sql .= $col ."='". $value ."',"; 	
								}	
								else {
									$value = $value; 	
									$sql_values .= "'". $value ."',"; // flatten the profiles array so it writes to the DB "neatly"
									$update_sql .= $col ."='". $value ."',"; 
								}
							}	
							else {
								$update_sql .= $col ."='". $_POST[$col] ."',"; 
								$sql_values .= "'". $_POST[$col] ."',"; 
							}
						}
					}
				}
			}
			
			
			//$sql_columns = "serverid,". $sql_columns; // so we insert the same serverid value acquired from the queryRow above
			$sql_columns = rtrim($sql_columns,","); 
			$update_sql = rtrim($update_sql,","); 
			if ($_REQUEST['profile_create_name'] == "") { //change the UPDATE if we are creating a profile rather than server-/MAC-specific config
				$update_sql .= " WHERE mac='". $_REQUEST['mac'] ."'"; // so we don't overwrite other rows
			}
			else {
				$update_sql .= " WHERE mac='". $_REQUEST['mac'] ."' AND profile_create_name='". $_REQUEST['profile_create_name'] ."'"; // so we don't overwrite other rows
			}
			//$sql_values = "'". $server_check['serverid'] ."',". $sql_values; // the serverid value acquired from the queryRow above
			$sql_values = rtrim($sql_values,","); 
			//echo "Update SQL: ". $update_sql ."<BR>";
			/* This coding is quite a bad messy kludge.  
			   We should re-write this soon as we can to just simply pass the array to MDB2 using its Autoexecute capability
			   Example: 
			   $con->loadModule('Extended');
			   $con->extended->autoExecute(OPSYS,$_POST,MDB2_AUTOQUERY_UPDATE); 
			   
			   Is that, like, easy or what?
			*/
			
			if ($op == "profile_edit") { 
				$profile_exists = FastDeploy::queryProfileEntry($_REQUEST['profile_create_name'], $_REQUEST['profile_id']); 	
			}
			$server_exists = FastDeploy::queryServer($_REQUEST['mac']); 
			if ($profile_exists) { 
				$user_add = $con->query("UPDATE servers SET customer_id='". $_SESSION['username'] ."',os_name='". $_POST['os_name'] ."',os_version='". $_POST['os_version'] ."',os_subversion='". $_POST['os_subversion'] ."',sessid='". $_SESSION['sessid'] ."',hostname='". $_POST['hostname'] ."' WHERE mac='". $_POST['mac'] ."' AND profile_create_name='". $_REQUEST['profile_create_name'] ."'"); 
				$set_os = $con->query("UPDATE ". OPSYS ." SET ". $update_sql); 
			}
			elseif ((!$profile_exists) && ($server_exists)) { // rather than bug the user about existing servers, just update the existing server entry...		
				$user_add = $con->query("UPDATE servers SET customer_id='". $_SESSION['username'] ."',os_name='". $_POST['os_name'] ."',os_version='". $_POST['os_version'] ."',os_subversion='". $_POST['os_subversion'] ."',sessid='". $_SESSION['sessid'] ."',hostname='". $_POST['hostname'] ."' WHERE mac='". $_POST['mac'] ."'"); 
				$set_os = $con->query("UPDATE ". OPSYS ." SET ". $update_sql); 
			}
			else { 
				$server_query = FastDeploy::queryServerEntry($_POST['mac']); // check by ONLY the servers table, not the OSes' table
				if ($server_query) {
					$user_add = $con->query("UPDATE servers SET customer_id='". $_SESSION['username'] ."',os_name='". $_POST['os_name'] ."',os_version='". $_POST['os_version'] ."',os_subversion='". $_POST['os_subversion'] ."',sessid='". $_SESSION['sessid'] ."',hostname='". $_POST['hostname'] ."' WHERE mac='". $_POST['mac'] ."'"); 
				}
				else {
					$user_add = $con->query("INSERT INTO servers (customer_id,os_name,os_version,os_subversion,mac,sessid,hostname) VALUES ('". $_SESSION['username'] ."','". $_POST['os_name'] ."','". $_POST['os_version'] ."','". $_POST['os_subversion'] ."','". $_POST['mac'] ."','". $_SESSION['sessid'] ."','". $_POST['hostname'] ."')"); 
				}
				if ($_POST['profile_create_name'] != "") { 
					
					
					if ($profile_exists) { 
						$profile_update = $con->query("UPDATE profiles SET os_name='". $_REQUEST['os_name'] ."',os_version='". $_REQUEST['os_version'] ."',os_subversion='". $_REQUEST['os_subversion'] ."',profile_create_name='". $_REQUEST['profile_create_name'] ."' WHERE profile_create_name='". $_REQUEST['profile_create_name'] ."' AND profile_id=". $_REQUEST['profile_id'] .""); 
					}
					else {
						$profile_add = $con->query("INSERT INTO profiles (os_name,os_version,os_subversion,profile_create_name) VALUES ('". $_POST['os_name'] ."','". $_POST['os_version'] ."','". $_POST['os_subversion'] ."','". $_POST['profile_create_name'] ."')"); 
					}
				}
				$set_os = $con->query("INSERT INTO ". OPSYS ." (". $sql_columns .") VALUES (". $sql_values .")"); 	
			}
		}			
        	}
        	
        	
}
?>