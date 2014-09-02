<?php

require_once '/usr/share/php/PEAR/Registry.php'; 
$peartest = new PEAR_Registry(); 

$filelist = $peartest->packageInfo('mdb2','filelist'); 


foreach($filelist  as $dir => $file) { 
	echo $dir .'<BR>';	
}