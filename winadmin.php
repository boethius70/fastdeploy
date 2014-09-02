<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

require_once('includes/common.php');
require_once('language/WinAdmin_'. LANGUAGE .'.php'); // load the form's language file  	

class WinAdmin extends HTML_QuickForm { // Note the formatting (strip the "dot" in the version out)              
	function WinAdmin() { 
		parent::HTML_QuickForm('winadminForm','post');
		$returned_values = $this->setForm(); // 
		foreach ($returned_values as $column => $value) { 
			global $default;
			if ($value[1] == "TEXT") {
				$this->addElement($value[1],$value[2],$value[0],$value[4]); 
				$error = $this->errorForm($value[2]);						
				$this->addRule($value[2], $error, $value[3], null);	
			}
			elseif ($value[1] == "SELECT") { 
				if ($value[2] == "os_version") {
					$select_array = $this->os_version(NULL); 
				}
				elseif ($value[2] == "os_subversion") { 
					$select_array = $this->os_subversion(NULL); 
				}
				elseif ($value[2] == "arch") { 
					$select_array = $this->arch(NULL); 
				}
				$this->addElement($value[1],$value[2],$value[0],$select_array,$value[4]);
				$error = $this->errorForm($value[2]); 
				$this->addRule($value[2], $error, $value[3]);
			}
			elseif ($value[1] == "ADVMULTISELECT") { // an HTML_QuickForm extension for fancier multi-select form fields		
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
		$this->addElement("hidden", "imageid", $_GET['imageid']);
		$this->addElement("submit", "checkButton", "Submit");			    
	}
	
	function setForm() { 
		/* function: setForm
		
	  	 purpose:  create the form fields you want.
	   	 
	   	 returns:  array of form fields */ 		
	   	 
		global $form_strings;
					// array offset:  	0		1	2	3	4		5
		$fields = array("IMAGE_NAME" => array($form_strings['LBL_IMAGE_NAME'],"TEXT","image_name","required",array("size" => "25"),"General Settings"),
		      "IMAGE_PATH" => array($form_strings["LBL_IMAGE_PATH"],"TEXT","image_path","required",array("size" => "45","maxlength" => "200"),"General Settings"),
		      "OS_VERSION" => array($form_strings["LBL_OS_VERSION"],"SELECT","os_version","required",array("size" =>"1"),"General Settings"),
		      "OS_SUBVERSION" => array($form_strings["LBL_OS_SUBVERSION"],"SELECT","os_subversion","required",array("size" =>"1"),"General Settings"),
		      "ARCH" => array($form_strings["LBL_ARCH"],"SELECT","arch","required",array("size" =>"1"),"General Settings")
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
		$fields = array("IMAGE_NAME" => array($error_strings['ERR_IMAGE_NAME'],"image_name"),
			      "IMAGE_PATH" => array($error_strings["ERR_IMAGE_PATH"],"image_path"),
			      "OS_VERSION" => array($error_strings["ERR_OS_VERSION"],"os_version"),
			      "OS_SUBVERSION" => array($error_strings["ERR_OS_SUBVERSION"],"os_subversion"),
			      "ARCH" => array($error_strings["ERR_ARCH"],"arch")
		      );
		
		foreach ($fields as $error_col => $error_val) {   	 	   	 
	          	if ($error_val[1] == $val) { // we just return the error text associated with the form field name ($val) and nothing else 
	          		return $error_val[0];  
	          	}
	        	}
	}
	
	function os_version() {
 		/* function: os_version
   	
   	  	   purpose:  to return applicable Windows OS versions (XP, 2003, Vista, etc.) 
   	   
   	   	   returns:  all OS versions
   		*/
   		$os_version = array("" => "-->Pick a Windows version",
   		 	   "XP" => "XP",
   			   "Vista" => "Vista",
   			   "2003" => "2003");
   			   
   		return $os_version;
	}
	
	function os_subversion() {
 		/* function: os_subversion
   	
   	  	   purpose:  to return applicable Windows OS subversions (Professional, Server, Advanced Server, Business Edition, etc.) 
   	   
   	   	   returns:  all OS subversions
   		*/
   		$os_subversion = array("" => "-->Pick a Windows subversion",
   		 	   "Professional" => "Professional",
   			   "Standard" => "Standard",
   			   "Enterprise" => "Enterprise");
   			   
   		return $os_subversion;
	}
	
	function arch() {
 		/* function: arch
   	
   	  	   purpose:  to return applicable architectures
   	   
   	   	   returns:  all CPU architectures
   		*/
   		$arch = array("" => "-->Pick the CPU architecture this image supports",
   		 	   "i386" => "i386",
   			   "amd64" => "AMD64",
   			   "ia64" => "Itanium");
   			   
   		return $arch;
	}
	
	function addDB() {
        		/* function:  addDB() 
	
	   	   purpose:  adds this Windows image location to the database
	   	  
		*/ 		
		$con =& MDB2::factory(unserialize(DSN));
		
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else {  
			$image_exists = FastDeploy::queryImage($_POST['imageid']); 
			if ($image_exists) { // 
				$image_add = $con->query("UPDATE windows_images SET image_name='". $_POST['image_name'] ."',image_path='". $_POST['image_path'] ."',os_version='". $_POST['os_version'] ."',os_subversion='". $_POST['os_subversion'] ."',arch='". $_POST['arch'] ."' WHERE imageid='". $_POST['imageid'] ."'"); 				
			}
			else { 
				$image_add = $con->query("INSERT INTO windows_images (image_name,image_path,os_version,os_subversion,arch) VALUES ('". $_POST['image_name'] ."','". $_POST['image_path'] ."','". $_POST['os_version'] ."','". $_POST['os_subversion'] ."','". $_POST['arch'] ."')"); 	
			}
		}				
        	}
}

$form = new WinAdmin(); 
$template =& new Smarty;
$template->compile_dir  = '/tmp';
$template->left_delimiter = '{{';
$template->right_delimiter = '}}';   
	
if ($_GET['op'] == "edit") { 
	$set_edit = FastDeploy::queryImage($_GET['imageid']);
	if ($set_edit) { 
		$form->setDefaults($set_edit); // populate the form with existing data - HTML_Quickform makes this way easy
	}
	else { 
		$form->setDefaults($_GET); 	
	}
}
if ($_GET['op'] == "delete") { 
	
}
if ($form->validate()) {
 	$form->freeze(); 
 	$form->addDB(); // add the image to the database...
 	foreach ($_POST as $name => $val) { 
 		$template->assign($name,$val); 
	}
	$template->display("images.html");
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
	$template->display("winadmin.html");
}
                	
?>