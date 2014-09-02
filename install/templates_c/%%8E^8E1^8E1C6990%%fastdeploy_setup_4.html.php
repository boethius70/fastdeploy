<?php /* Smarty version 2.6.14, created on 2007-10-03 00:16:30
         compiled from fastdeploy_setup_4.html */ ?>
<TABLE>
<TR><TD COLSPAN=2 ALIGN=MIDDLE><FONT COLOR=white><B><?php echo $this->_tpl_vars['error']; ?>
</b></td></tr>
<TR><TD COLSPAN=2 ALIGN=MIDDLE> <B>Installation paths for Fastdeploy:</b></td></tr>
<TR><TD ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdDir');">&nbsp; <B>Local Fastdeploy directory: </TD>
		<TD ALIGN=LEFT> <INPUT TYPE=text size=50 maxlength=150 name=basename value="<?php echo $this->_tpl_vars['basename']; ?>
"></td></tr>
</TABLE>
<TABLE>
<TR><TD><B><div id="fdDir" CLASS="longDescription">The local directory on your hard drive
	where you want Fastdeploy to be installed.  The default entered here is based on where on your system you 
	extracted the Fastdeploy tarball or deb/rpm package.</div></TD></TR>
</TD></TR>
</TABLE>
<TABLE>
<TR><TD ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdMirror');">&nbsp; <B>Local Fastdeploy mirror directory: </TD><TD ALIGN=LEFT> <INPUT TYPE=text size=50 maxlength=150 name=mirror_dir value="<?php echo $this->_tpl_vars['mirror_dir']; ?>
"></td></tr>
</TABLE>
<TABLE>
	<TR><TD><B><div id="fdMirror" CLASS="longDescription">The local directory on your hard drive
	where you want Fastdeploy to access and store operating system mirrors.  This should probably be a partition with a lot of storage
	capacity.  </div></TD></TR>
</TABLE>
<TABLE>
<TR><TD ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdTftpboot');">&nbsp; <B>Local Fastdeploy TFTP directory: </TD><TD ALIGN=LEFT> <INPUT TYPE=text size=50 maxlength=150 name=tftpboot value="<?php echo $this->_tpl_vars['tftpboot']; ?>
"></td></tr>
</TABLE>
<TABLE >
	<TR><TD><B><div id="fdTftpboot" CLASS="longDescription">The local directory on your hard drive
	where you want Fastdeploy to use and store files used by the TFTP server.  Depending on how your TFTP server is configured and your
	OS distribution, this might be /tftpboot or /var/lib/tftpboot (or something similar)</div></TD></TR>
</TABLE>