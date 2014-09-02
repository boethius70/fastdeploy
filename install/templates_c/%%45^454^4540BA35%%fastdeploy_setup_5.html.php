<?php /* Smarty version 2.6.14, created on 2007-10-03 00:16:34
         compiled from fastdeploy_setup_5.html */ ?>
<TABLE>
<TR><TD COLSPAN=2 ALIGN=MIDDLE><FONT COLOR=white><B><?php echo $this->_tpl_vars['error']; ?>
</b></td></tr>
<TR><TD COLSPAN=2 ALIGN=MIDDLE> <B>URL paths for Fastdeploy:</b></td></tr>
<TR><TD ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdBaseUrl');">&nbsp; <B>Fastdeploy's base URL:</B> </TD>
		<TD ALIGN=LEFT> <INPUT TYPE=text size=50 maxlength=150 name=baseurl value="<?php echo $this->_tpl_vars['baseurl']; ?>
"></td></tr>
</TABLE>
<TABLE>
<TR><TD><B><div id="fdBaseUrl" CLASS="longDescription">The URL where Fastdeploy is running; for example:<BR><BR>
	http://fastdeploy.domain.com ... or ...<BR>
	http://www.domain.com/fastdeploy </div></TD></TR>
</TD></TR>
</TABLE>
<TABLE>
<TR><TD ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdMirrorUrl');">&nbsp; <B>Fastdeploy mirror URL:</B></TD><TD ALIGN=LEFT> <INPUT TYPE=text size=50 maxlength=150 name=mirror_server value="<?php echo $this->_tpl_vars['mirror_server']; ?>
"></td></tr>
</TABLE>
<TABLE CLASS="whitebox">
	<TR><TD><B><div id="fdMirrorUrl" CLASS="longDescription">The URL of the mirrored OS files; e.g., <BR><BR>
		http://mirrors.domain.com ... or ...<BR>
		http://www.domain.com/mirrors </div></TD></TR>
</TABLE>