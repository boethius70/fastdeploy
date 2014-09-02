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

// Standard FastDeploy classes.  This will hopefully be a standard group of classes
// that can be addressed as an API by other scripts. 
require_once('includes/common.php');
 
class FastDeploy {	// we need a constructor here for real API calls	
   	function show_OSes() { 
		/* function:  show_OSes() 
	
	   	   purpose:  to show all operating systems available to deploy/install
		*/
		$add_servers = array(); 
		$ret = loadPlugins(); 
		array_push($add_servers,"<table cellspacing=0 cellpadding=0 border=0 width=100%>
				     <tr><td><B>Installable operating systems:</b>
				     <hr noshade></td></tr>"); 
		
		
		foreach ($ret as $col => $key) { 
			if ($key['deployable'] == "yes") { // don't bother to display if the deployable option is set to "no"
				array_push($add_servers,'<table cellspacing=0 cellpadding=0 border=0 width=100%><tr><td>			
					<A HREF="add.php?os_name='. $key['os_name'] .'&os_version='. $key['os_version'] .'"><IMG SRC=images/os/'. $key['os_logo'] .' BORDER=0>'. $key['os_friendly_name'] .'</a>');
			}
		}

		array_push($add_servers,""); 
   		array_push($add_servers,"</table>");
   		$list = implode("", $add_servers); 
   		
   		return $list; 
   	}
   	
   	function os_menu() { 
		/* function: os_menu() 
	
	   	   purpose:  feeds back options to be used in tree-oriented left-hand menu
	   	   
	   	   returns:  array of whatever values you want to pass back to the calling menu creation function
		*/
		$OSes = array(); 
		$ret = loadPlugins(); 
		sort($ret,SORT_REGULAR); // sort the array ... 
		foreach ($ret as $col => $key) { 
			if ($key['deployable'] == "yes") { // don't bother to display if the deployable option is set to "no"
				if ($key['os_subversion'] != '') { // handle subversions of an OS (e.g., "Windows XP >> Professional <<")
					array_push($OSes,'<div dojoType="TreeNode" title="'. $key['os_friendly_name'] .'" object="add.php?os_name='. $key['os_name'] .'&os_subversion='. $key['os_subversion'] .'&os_version='. $key['os_version'] .'"></div>');
				}
				else { 
					array_push($OSes,'<div dojoType="TreeNode" title="'. $key['os_friendly_name'] .'" object="add.php?os_name='. $key['os_name'] .'&os_version='. $key['os_version'] .'"></div>');
				}
			}
		}

   		$list = implode ("",$OSes);
   		return $list; 
   	}
   	
   	function manage_menu() { 
		/* function: manage_menu() 
	
	   	   purpose:  feeds back options to be used in tree-oriented left-hand menu
	   	   
	   	   returns:  whatever values you want to pass back to the calling menu creation function
		*/

   		//$list = implode ("",$OSes);
   		return '<div dojoType="TreeNode" title="List / Edit Systems" object="list.php"> </div>'; 
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
    		
    		$form = new $class;
    		if ($op == "edit") { 
    			$set_edit = $form->queryServer($_GET['mac']);
    			if ($set_edit) { 
    				$form->setDefaults($set_edit); // populate the form with existing data - HTML_Quickform makes this way easy
    				$profiles = ereg_replace(" ",",",$set_edit['profiles']); // split the returned profiles with commas - maybe we set it this way inside the DB (escaped commas - yuck)?   			
    				$form->setDefaults(array('profiles' => $profiles)); // this sets the default SELECTed profile array back
    			}
    			else { 
    				$form->setDefaults($_GET); 	
    			}
		}
    		// this is here so the javascript "javaFunction" can do stuff - the potential for interference with other $_GET process is big 
    		/* if (isset($_GET[action])){
			// Retrieve the GET parameters and executes the function    			
			  $funcName = $_GET[action];
			  $vars = $_GET['mac'];
			  $set_edit = $funcName($vars); 
			  //echo "Vars: ". $vars ."<BR>"; 
			  $form->setDefaults($set_edit); // populate the form with existing data - HTML_Quickform makes this way easy
		    	  $profiles = ereg_replace(" ",",",$set_edit['profiles']); // split the returned profiles with commas - maybe we set it this way inside the DB (escaped commas - yuck)?   			
		    	  $form->setDefaults(array('profiles' => $profiles)); // this sets the default SELECTed profile array back
		} */
		
	       	if ($form->validate()) {
	                  		$form->freeze();
		          	$form->addDB(); // add the server to the database...
		        		$form->WriteFile(); // now write the variables to the template configuration script file (Kickstart, Preseed, Unattend.txt, etc.
				foreach ($_POST as $name => $val) { 
					if ($name == 'profiles') { 
						$val = implode("\n",$val); // implode the returned (via $_POST) profiles form array so we can see it
					}
					$template->assign($name,$val); 
				}
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
				$form->setRequiredNote($rn); 
				
				// build the HTML for the form
				$form->accept($renderer);
	
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
			$server_list = $con->query("SELECT os_name,os_version,os_subversion,hostname,mac FROM servers"); 
			//<b>os</b><b>mac</b><b>Addr</b><b>IP</b><b>host</b><b>arch</b><b>drive
			//$server_list = $con->query("SELECT t1.os_name, t1.os_version, t1.os_subversion,t1.mac,t1.addrtype,t1.hostname,t1.ip,t1.cpu,t1.hd FROM ". OPSYS ." t1, servers t2 WHERE t1.mac = t2.mac"); 
			$allboxen = array(); 
	   		while($item_row = $server_list->fetchRow()) { 
	   			array_push($allboxen,"<tr><td><font>". $item_row[0] ." ". $item_row[1] ." ". $item_row[2] ."</font></td><td><font>". $item_row[4] ."</font></td><td><font>". $item_row[3] ."
	   				<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   			    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"del.php&username=". $_SESSION['customer_name'] ."&mac=". $item_row[4] ."\">yes?</a><a href=\"\"> no?</a></font></div></td>
	   			<td><font><a href=\"#\" onClick='dojo.widget.byId(\"docpane\").setUrl(\"edit.php?os_name=". $item_row[0] ."&os_version=". $item_row[1] ."&os_subversion=". $item_row[2] ."&mac=". $item_row[4] ."\");'>edit?</a></font></td></tr>"); 
			 	                 
	   		}
	   		$allboxen = implode("",$allboxen); 
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
	
			// assign array with lists
			$template->assign('data_set', $allboxen);

			// parse and display the template
			$list = $template->display("server_list.html");
    		
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
        			$query = $con->query("SELECT script_text,title FROM profiles WHERE os_name='". $os_name ."' AND os_version='". $os_version ."'"); // this must be used because queryAll() doesn't return the rows
        			$fetched_query = $con->queryAll("SELECT pid,title FROM profiles WHERE os_name='". $os_name ."' AND os_version='". $os_version ."'",'','',$rekey = true); // should we use os_subversion here as well?
        																		// or perhaps an array of supportable versions is better...
        			if ($query->numRows() > 0) {        				
	 			return $fetched_query;
 			} 
 			else { // no profiles for this OS, return false...
 				return false;	
 			}       		
        		}
        	}
}
?>