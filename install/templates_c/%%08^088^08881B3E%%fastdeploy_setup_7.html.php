<?php /* Smarty version 2.6.14, created on 2007-10-03 00:16:51
         compiled from fastdeploy_setup_7.html */ ?>
<TABLE>
<TR><TD COLSPAN=2 ALIGN=MIDDLE><FONT COLOR=white><B><?php echo $this->_tpl_vars['error']; ?>
</b></td></tr>
<TR><TD ALIGN=RIGHT><img src="../images/installer/help_icon.gif" onClick="toggleBox('fdOSes');">&nbsp; <B>Choose operating systems to make available for deployment:</B> </TD>
	
</TABLE>
<TABLE>
		<TR><TD CLASS="rightBorder"><B>Installable?</B></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><B>Local / Remote?</B></TD><TD CLASS="rightBorder"><B>OS Name</TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT>All<input type="checkbox" id="checkAll" onClick='checkAllFields(1);'></TD><TD ALIGN=MIDDLE CLASS="rightBorder">&nbsp;</TD><TD CLASS="rightBorder">&nbsp;</TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="CentOS_4_5"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_CentOS_4_5" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_CentOS_4_5"></TD><TD CLASS="rightBorder" ALIGN=LEFT>CentOS 4.5 <IMG SRC="../images/os/centos_icon_20.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="CentOS_5"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_CentOS_5" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_CentOS_5"></TD><TD CLASS="rightBorder" ALIGN=LEFT>CentOS 5 <IMG SRC="../images/os/centos_icon_20.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Fedora_4"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Fedora_4" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Fedora_4"></TD><TD CLASS="rightBorder" ALIGN=LEFT>Fedora Core 4 <IMG SRC="../images/os/fedora_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Fedora_5"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Fedora_5" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Fedora_5"></TD><TD CLASS="rightBorder" ALIGN=LEFT>Fedora Core 5 <IMG SRC="../images/os/fedora_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Fedora_6"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Fedora_6" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Fedora_6"></TD><TD CLASS="rightBorder" ALIGN=LEFT>Fedora Core 6 <IMG SRC="../images/os/fedora_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Fedora_7"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Fedora_7" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Fedora_7"></TD><TD CLASS="rightBorder" ALIGN=LEFT>Fedora Core 7 <IMG SRC="../images/os/fedora_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Debian_3_1"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Debian_3_1" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Debian_3_1"></TD><TD CLASS="rightBorder" ALIGN=LEFT>Debian 3.1 <IMG SRC="../images/os/debian_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Debian_4"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Debian_4" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Debian_4"></TD><TD CLASS="rightBorder" ALIGN=LEFT>Debian 4 <IMG SRC="../images/os/debian_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Ubuntu_6_10_Server"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Ubuntu_6_10_Server" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_Ubuntu_6_10_Server"></TD><TD CLASS="rightBorder" CLASS="rightBorder" ALIGN=LEFT>Ubuntu 6.10 Server <IMG SRC="../images/os/ubuntu_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="RedHat_4_Enterprise"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_RedHat_4_Enterprise" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_RedHat_4_Enterprise"></TD><TD CLASS="rightBorder" ALIGN=LEFT>RedHat Enterprise Linux 4 <IMG SRC="../images/os/redhat_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="RedHat_5_Enterprise"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_RedHat_5_Enterprise" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_RedHat_5_Enterprise"></TD><TD CLASS="rightBorder" ALIGN=LEFT>RedHat Enterprise Linux 5 <IMG SRC="../images/os/redhat_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="VMware_3_ESX"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_VMware_3_ESX" CHECKED> / <INPUT TYPE=radio VALUE="0" NAME="os_mirror_local_VMware_3_ESX"></TD><TD CLASS="rightBorder" ALIGN=LEFT>VMware ESX Server 3<IMG SRC="../images/os/vmware_icon.gif"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Windows_XP_Professional"><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Windows_XP_Professional" CHECKED> / (N/A) </TD></TD><TD CLASS="rightBorder" ALIGN=LEFT>Windows XP Professional <IMG SRC="../images/os/windows_icon.png"></TD></TR>
		<TR><TD CLASS="rightBorder" ALIGN=RIGHT><INPUT TYPE=checkbox NAME='oses[]' value="Windows_2003_Standard"></TD><TD CLASS="rightBorder" ALIGN=MIDDLE><INPUT TYPE=radio VALUE="1" NAME="os_mirror_local_Windows_2003_Standard" CHECKED> / (N/A) </TD><TD CLASS="rightBorder" ALIGN=LEFT>Windows 2003 Server Standard <IMG SRC="../images/os/windows_icon.png"></TD></TR>

</TABLE>
<TABLE>
<TR><TD><B><div id="fdOSes" CLASS="longDescription">Choose the operating systems you want to make available for automated deployment. 
You may also choose whether or not to have some OS versions use remote, Internet accessible versions of the OS install image (potentially
much slower, depending on the speed of your Internet connectivity) or use a local OS mirror that will greatly speed up the deployment process.
Generally you'll want to use a local mirror unless you just want to test out a FastDeploy server install without a mirror, run a virtual appliance
of Fastdeploy, or just don't have the disk space available to have several local full operating system install file mirrors (50-100+ GB average range).  
</div>
</TD></TR>
</TABLE>