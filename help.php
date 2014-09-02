<?php
// help.php : really simple script to pull help text out of the database (serverminds)
require_once('common.php');

if ($_REQUEST['p'] != "") { 
	DBConnect(); 
	$help_check = mysql_query("SELECT p,text FROM serverminds.help WHERE p='". $_REQUEST['p'] ."'"); 
	while($item_row = mysql_fetch_object($help_check)) { 
	   	echo "<HTML><HEAD><TITLE>Serverminds Help System :: ". $item_row->p ."</TITLE>
	   		</HEAD>
	   		<BODY BGCOLOR=#FFFFFF>
	   		<FONT STYLE=\"font-family : Arial, Trebuchet MS; font-size : 10pt; \">". $item_row->text ."</FONT>
	   		</BODY>
	   		</HTML>"; 
	}
}
else { 
	echo "<FONT STYLE=\"font-family : Arial, Trebuchet MS\">Pick a help topic, please</FONT>";
}