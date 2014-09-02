<?
// The Ops Serverminds script 
// This script performs DIRECT operations on the FastDeploy database
// It does so WITHOUT any kind of direct user authentication. 
// Instead it assumes it is OK to modify the database based on three variables: 
// 1.  Username
// 2.  Internal server ID (that is, the MySQL unique ID) 
// 3.  The session ID the server was edited/created with originally
// 
// This SHOULD be sufficient because it would be pretty tough for a hacker to guess all three
// 
// This script exists so internal events can be invoked by external FastDeploy processes; e.g., 
// 	* Completion of a FastDeploy Deployment - i.e., register it as finished/deployed.
//	* Email a user when a deployment is finished.
//	* Send an update when a deployment starts (and, as above, finishes) - "monitor" in quasi-real-time?
//	* Whatever other fun stuff we can dream up; e.g., maybe access verification to the system?
// 
// This script will ALSO delete a file on the server - the pxeclient.cfg/01-mac-address file
// The security of this operation should be tested THOROUGHLY as we want to be REALLY sure the
// executing user can't delete other files on the system.
require_once("includes/common.php"); 
if ($_REQUEST['customer_id'] != "" && $_REQUEST['serverid'] !="") {
	$con =& MDB2::connect(unserialize(DSN), $dsn_options);
		if (PEAR::isError($con)) {
		    	die($con->getMessage());
		}
		else { 
			if ($_REQUEST['os_subversion'] == "") { 
				$check_server = $con->queryRow("SELECT * FROM ". $_REQUEST['os_name'] ."_". $_REQUEST['os_version'] ." WHERE serverid='". $_REQUEST['serverid'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			}
			else {
				$check_server = $con->queryRow("SELECT * FROM ". $_REQUEST['os_name'] ."_". $_REQUEST['os_version'] ."_". $_REQUEST['os_subversion'] ." WHERE serverid='". $_REQUEST['serverid'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			}
			$check_user = $con->queryRow("SELECT email,customer_id FROM users WHERE customer_id='". $_REQUEST['customer_id'] ."'",null, MDB2_FETCHMODE_ASSOC); 
			if ($_REQUEST['op'] == "1") { // we're going to use numbers instead of words to code our ops
						// 1 = mail a notification to: $username
				if (strtoupper(substr(PHP_OS,0,3)=='WIN')): $eol="\r\n"; elseif (strtoupper(substr(PHP_OS,0,3)=='MAC')): $eol="\r"; else: $eol="\n"; endif;
				$body .= "Serverminds FastDeploy Service has deployed the following server:".$eol;
				$body .= "-----------------------------------------------------------------------".$eol;
				$body .= "Hostname: ". $check_server['hostname'] ."".$eol; 
				$body .= "MAC address: ". $check_server['mac'] ."".$eol; 
				$body .= "IP Addressing: ". $check_server['addr_type'] ."".$eol; 
				if ($check_server['addr_type'] == "static") { 
					$body .= "IP Address: ". $check_server['ipaddr'] ."".$eol; 
					$body .= "Netmask: ". $check_server['netmask'] ."".$eol; 
					$body .= "Gateway: ". $check_server['gateway'] ."".$eol; 
					$body .= "DNS #1: ". $check_server['dns_1'] ."".$eol; 
				}
				$body .= "Domain: ". $check_server['domain'] ."".$eol; 
				$body .= "Timezone: ". $check_server['tz'] ."".$eol; 
				$body .= "Language: ". $check_server['lang'] ."".$eol; 
				$body .= "CPU Architecture: ". $check_server['cpu'] ."".$eol; 
				$body .= "Hard Drive: ". $check_server['hd'] ."".$eol; 
				$subject = "FastDeploy has deployed server: ". $check_server['hostname'].".".$check_server['domain'] .""; 
				
				$body .= "-----------------------------------------------------------------------".$eol;
				$body .= "". EMAIL_MESSAGE ."".$eol; 
				$headers = ''; 
				$headers .= 'From : '. EMAIL .''.$eol; 
				$headers .= 'Reply-To: '. EMAIL .''. $eol; 
				$headers .= 'Return-Path: '. EMAIL .''. $eol; 
				$headers .= 'Message-ID: <'.$now.' '. EMAIL .'>'.$eol;
				$headers .= 'X-Mailer: PHP v'.phpversion().$eol; 
				$mime_boundary=md5(time()); 
				$headers .= 'MIME-Version: 1.0'.$eol;
				$headers .= "Content-Type: multipart/related; boundary=\"".$mime_boundary."\"".$eol;
				
				// Text Version of Email
				$msg .= "--".$mime_boundary.$eol;
				$msg .= "Content-Type: text/plain; charset=iso-8859-1".$eol;
				$msg .= "Content-Transfer-Encoding: 8bit".$eol;
				$msg .= $body.$eol.$eol;
				
				// finished
				$msg .= "--".$mime_boundary."--".$eol.$eol; 
				ini_set(sendmail_from,EMAIL);	
				$mail = mail($check_user['email'], $subject, $msg, $headers); 
				ini_restore(sendmail_from); 
				
			}
			elseif ($_REQUEST['op'] == "2") { 
				// 2 = delete the pxelinux default file AND remove the "installing" status 
				system('rm -f '. BOOTCONFIG .'/01-'. $check_server["mac"]); 
				system('rm -f '. CONFIGFILES .'/'. $check_server["mac"]); // do we WANT to remove the config file?
				system('rm -f '. TFTPBOOT .'/installer/i386/wininst/'. $check_server["mac"]); // toss the custom initrd, if applicable
				mysql_query ("UPDATE status (end_time) VALUES (NOW()) WHERE username='". $_REQUEST['username'] ."' AND mac='". $check_server['mac'] ."'"); 
			}
			elseif ($_REQUEST['op'] == "3") { 
				// 3 = insert the server's deployment status into the database...
				$insert_status = "INSERT INTO status (hostname,mac,os,username,ip,domain,start_time) VALUES ('". $_REQUEST['hostname'] ."','". $_REQUEST['mac'] ."','". $_REQUEST['os'] ."','". $_REQUEST['username'] ."','". $_REQUEST['ip'] ."','". $_REQUEST['domain'] ."',NOW())"; 
				$insert_query = mysql_query($insert_status); 
			}
			else {
			echo "<BR>
				Yer lame!
				<BR>";
				
			//exit 0; // just disappear if there is no result in the DB	
			}
		}
	}
	else {
		echo "<BR>
			Yer lame x2!
		<BR>";
	}

?>