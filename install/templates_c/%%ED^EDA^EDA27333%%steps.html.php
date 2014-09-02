<?php /* Smarty version 2.6.14, created on 2007-08-29 17:06:08
         compiled from steps.html */ ?>
<form action="install.php?<?php echo $this->_tpl_vars['step_url']; ?>
" name=install METHOD=POST>
	<?php echo $this->_tpl_vars['hidden']; ?>

<table width="100%" border="0" cellpadding="0" class=installerLine>
  <tr valign=top bgcolor=#c9c9c9><td><B>New Installation :: Step <?php echo $this->_tpl_vars['number']; ?>
 :: <?php echo $this->_tpl_vars['step_description']; ?>
</B></td>
</tr>
</table>
<table width="100%" border="0" cellpadding="0" class=installerLine>
	<TR><TD>
		<?php if (( $this->_tpl_vars['number'] == '2' )): ?> 
			<?php echo $this->_tpl_vars['body']; ?>

		
		<?php else: ?>
    			<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => $this->_tpl_vars['body'], 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
    		<?php endif; ?>
</TD></TR>
</table>
<table border="0" width="100%" cellspacing="0" cellpadding="0" class=navigation>
  <tr bgcolor=#c9c9c9>
<td ALIGN="RIGHT"> <?php echo $this->_tpl_vars['next_button']; ?>
</td>
  </tr>
</table>
</FORM>