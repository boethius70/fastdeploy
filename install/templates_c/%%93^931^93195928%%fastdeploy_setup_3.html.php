<?php /* Smarty version 2.6.14, created on 2007-10-03 00:16:17
         compiled from fastdeploy_setup_3.html */ ?>
<TR><TD COLSPAN=2 ALIGN=RIGHT><FONT COLOR=red><B><?php echo $this->_tpl_vars['error']; ?>
</b></td></tr>
<TR><TD COLSPAN=2 ALIGN=RIGHT> <B>Database information to use to <u>connect</u> to the Fastdeploy database:</b></td></tr>
<TR><TD ALIGN=RIGHT><B>Database hostname: </TD><TD ALIGN=LEFT> <INPUT TYPE=text size=20 maxlength=50 name=dbhost value="<?php echo $this->_tpl_vars['dbhost']; ?>
"></td></tr>
<TR><TD ALIGN=RIGHT><B>Database name: </TD><TD ALIGN=LEFT> <INPUT TYPE=text size=20 maxlength=50 name=db value="<?php echo $this->_tpl_vars['db']; ?>
"></td></tr>
<TR><TD ALIGN=RIGHT><B>Database username: </TD><TD ALIGN=LEFT> <INPUT TYPE=text size=20 maxlength=50 name=dbuser value="<?php echo $this->_tpl_vars['dbuser']; ?>
"></td></tr>
<TR><TD ALIGN=RIGHT><B>Database password: </TD><TD ALIGN=LEFT> <INPUT TYPE=PASSWORD size=20 maxlength=50 name=dbpassword value="<?php echo $this->_tpl_vars['dbpassword']; ?>
"></td></tr>
<TR><TD COLSPAN=2 ALIGN=RIGHT> <B>Database information to use to <u>create</u> the Fastdeploy database (i.e., a DB admin with CREATE DATABASE privileges):</b></td></tr>
<TR><TD ALIGN=RIGHT><B>Database username: </TD><TD ALIGN=LEFT> <INPUT TYPE=text size=20 maxlength=50 name=db_setup_username value="<?php echo $this->_tpl_vars['db_setup_username']; ?>
"></td></tr>
<TR><TD ALIGN=RIGHT><B>Database password: </TD><TD ALIGN=LEFT> <INPUT TYPE=PASSWORD size=20 maxlength=50 name=db_setup_password value=""></td></tr>