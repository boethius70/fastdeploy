<?php

require_once('includes/common.php');

function json_menu() { 
	
	/* function: json_menu() 
	
   	   purpose:  feeds back OS items to be used in tree-oriented left-hand menu
   	   
   	   returns:  JSON formatted 
	*/
	$OSes = array(); 
	$ret = loadPlugins(); 
	sort($ret,SORT_REGULAR); // sort the array ... 
	array_push($OSes,"["); 
		foreach ($ret as $col => $key) { 
			if ($key['deployable'] == "yes") { // don't bother to display if the deployable option is set to "no"
				
				if ($key['os_subversion'] != '') { // handle subversions of an OS (e.g., "Windows XP >> Professional <<")
					$os_concatenated_name = $key['os_name'] ."_". $key['os_version'] ."_". $key['os_subversion']; 
					$os_friendly_name = $key['os_name'] ." ". $key['os_version'] ." ". $key['os_subversion']; 
					$os_icon = strtolower($key['os_name']);
					$os_icon = $os_icon ."_icon.png";
					//$url = "add.php?os_name=". $key['os_name'] ."&os_version=". $key['os_version'] ."&os_subversion=". $key['os_subversion']; 
					$url = $key['os_name'] .'_'. $key['os_version'] .'_'. $key['os_subversion'] .'.html'; 
					array_push($OSes,'{ "text": "'. $os_friendly_name .'","id" : "'. $os_concatenated_name .'","leaf":"true","cls":"file","url":"'. $url .'","icon":"images/os/'. $os_icon .'"},');
				}
				else { 
					$os_concatenated_name = $key['os_name'] ."_". $key['os_version']; 
					$os_friendly_name = $key['os_name'] ." ". $key['os_version']; 
					$os_icon = strtolower($key['os_name']); 
					$os_icon = $os_icon ."_icon.png";
					//$url = "add.php?os_name=". $key['os_name'] ."&os_version=". $key['os_version']; 
					$url = '/modules/'. $key['os_name'] .'_'. $key['os_version'] .'.html'; 
					array_push($OSes,'{ "text": "'. $os_friendly_name .'","id" : "'. $os_concatenated_name .'","leaf":"true","cls":"file","href":"'. $url .'","icon":"images/os/'. $os_icon .'"},');
				}
			}
		}
		array_push($OSes,"]"); 
   		$list = implode ("",$OSes);
  	return $list; 
}

$oses = json_menu(); 

echo $oses; 

?>