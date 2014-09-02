<?php
// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:

//   http://www.fastdeploy.com/copyright 

require('installer.php'); // the Fastdeploy installer library

if (!APPLIANCE) { 
	switch ($_REQUEST['step']) {
	    	case '2':
	    		FD_Installer::step_2();       		
	      	break;
	      	
	    	case '3':
	  		FD_Installer::step_3(); 
	  	break; 
	  	
	  	case '4':
	  		FD_Installer::step_4(); 
	  	break; 
	  	
	  	case '5':
	  		FD_Installer::step_5(); 
	  	break; 
	  	
	  	case '6':
	  		FD_Installer::step_6(); 
	  	break; 
	  	
	  	case '7':
	  		FD_Installer::step_7(); 
	  	break; 
	  	
	  	case '8':
	  		FD_Installer::step_8(); 
	  	break; 
	  	
	  	case '9':
	  		FD_Installer::step_9(); 
	  	break; 
	  	
	 	default:
	      		FD_Installer::step_1(); 
	      	break;
	  }
}
else { // this IS an appliance so we'll change the ordering some...
	switch ($_REQUEST['step']) {
		case '2':
	  		FD_Installer::step_6(); 
	  	break; 
	  	
	  	case '3':
	  		FD_Installer::step_7(); 
	  	break; 
	  	
	  	case '4':
	  		FD_Installer::step_8(); 
	  	break; 
	  	
	  	case '5':
	  		FD_Installer::step_9(); 
	  	break; 
	  	
	  	case '7':
	  		FD_Installer::step_7(); 
	  	break; 
	  	
	  	case '8':
	  		FD_Installer::step_8(); 
	  	break; 
	  	
	  	case '9':
	  		FD_Installer::step_9(); 
	  	break; 
	  	
	 	default:
	      		FD_Installer::step_1(); 
	      	break;
	}
}

  
?>
