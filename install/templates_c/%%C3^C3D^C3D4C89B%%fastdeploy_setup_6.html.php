<?php /* Smarty version 2.6.14, created on 2007-10-03 00:16:36
         compiled from fastdeploy_setup_6.html */ ?>
<TABLE>
<TR><TD COLSPAN=2 ALIGN=MIDDLE><FONT COLOR=white><B><?php echo $this->_tpl_vars['error']; ?>
</b></td></tr>
<TR><TD ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdEmail');">&nbsp; <B>Email address to send deployment notifications from:</B> </TD>
		<TD ALIGN=LEFT> <INPUT TYPE=text size=50 maxlength=150 name=email value="<?php echo $this->_tpl_vars['email']; ?>
"></td></tr>
</TABLE>
<TABLE>
<TR><TD><B><div id="fdEmail" CLASS="longDescription">Enter the email address of the user who will be sending email notifications to end users when
	server operating system deployments complete.  <BR><BR>
	</div></TD></TR>
</TD></TR>
</TABLE>
<TABLE CLASS="whitebox">
	<TR><TD><B><div id="fdEmailMessage" CLASS="longDescription">Enter the content that you want in your email notifications here. <BR><BR>
		</div></TD></TR>
</TABLE>
<TABLE>
<TR><TD VALIGN=TOP ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdAnonStats');">&nbsp; <B>Send anonymous statistics:</B></TD>
	<TD ALIGN=LEFT>Yes <INPUT TYPE=RADIO value="yes" name="anonstats" CHECKED> No <INPUT TYPE=RADIO value="no" name="anonstats"></td></tr>
</TABLE>
<TABLE CLASS="whitebox">
	<TR><TD><B><div id="fdAnonStats" CLASS="longDescription">Choose "yes" if you don't mind sending anonymous statistics about your Fastdeploy
		server installations back to Fastdeploy - only the operating system information is captured.<BR><BR>
		</div></TD></TR>
</TABLE>
<TABLE>
<TR><TD VALIGN=TOP ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdAdmin');">&nbsp; <B>Administrator username:</B></TD>
	<TD ALIGN=LEFT><INPUT TYPE=TEXT SIZE=20 MAXLENGTH=20 value="<?php echo $this->_tpl_vars['adminuser']; ?>
" name="adminuser"></td></tr>
</TABLE>
<TABLE CLASS="whitebox">
	<TR><TD><B><div id="fdAdmin" CLASS="longDescription">Enter a username you want to use to logon as the administrator user; e.g., 'admin' or 'administrator'<BR>
		</div></TD></TR>
</TABLE>
<TABLE>
<TR><TD VALIGN=TOP ALIGN=RIGHT WIDTH=300><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdAdminPass');">&nbsp; <B>Administrator password:</B></TD>
	<TD ALIGN=LEFT><INPUT TYPE=PASSWORD SIZE=20 MAXLENGTH=20 value="" name="adminpass"></td></tr>
</TABLE>
<TABLE>
<TR><TD VALIGN=TOP ALIGN=RIGHT WIDTH=300>&nbsp; <B>Confirm administrator password:</B></TD>
	<TD ALIGN=LEFT><INPUT TYPE=PASSWORD SIZE=20 MAXLENGTH=20 value="" name="adminpassconfirm"></td></tr>
</TABLE>
<TABLE CLASS="whitebox">
	<TR><TD><B><div id="fdAdminPass" CLASS="longDescription">Enter a password your Fastdeploy administrator user.<BR><BR>
		</div></TD></TR>
</TABLE>