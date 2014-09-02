<?php /* Smarty version 2.6.14, created on 2007-10-03 00:19:30
         compiled from fastdeploy_setup_9.html */ ?>
<TABLE>
<TR><TD COLSPAN=2 ALIGN=MIDDLE><FONT COLOR=white><B><?php echo $this->_tpl_vars['error']; ?>
</b></td></tr>
<TR><TD ALIGN=LEFT>&nbsp; <B>Fastdeploy Install Complete!</B><BR><BR></TD></TR>
<TR><TD ALIGN=LEFT><B>Next steps:</B>
	<UL> <LI> Run mirroring process on your Fastdeploy server - this will enable you to install operating systems and related software
	from your local LAN (much faster) vs. over the Internet.  If you chose to have local mirrors you will <b>not</b> be able to perform
	any actual automated installations until you have a local file mirror of each operating system.  In the case of commercial operating
	systems such as Windows and RedHat Enterprise, local file mirrors are your only available option.</LI>
	     <LI> If you want to use Fastdeploy to automate the installation of various Windows operating systems, please refer to the <A HREF="http://www.fastdeploy.com/wiki/index.php?title=Windows_Preparation_Guide">
	Windows Preparation Guide.</A> for additional guidance on preparing Fastdeploy for this purpose.</LI> 
	</UL> 
	
<TR><TD ALIGN=LEFT><A HREF="<?php echo $this->_tpl_vars['baseurl']; ?>
">Click here to logon to your newly installed Fastdeploy server</A></TD></TR>
</TABLE>