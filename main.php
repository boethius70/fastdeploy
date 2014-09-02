<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

require_once('includes/common.php');
	
if ($_SESSION['username'] != '') 
{
	$display = Main(); 
	echo $display;
}
else { 
	$error['class'] = 'There was an unknown problem'; 
          header("Location: index.php"); break;	
}
?>