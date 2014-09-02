<?php /* Smarty version 2.6.14, created on 2008-01-28 19:22:32
         compiled from profile.html */ ?>
 <?php if ($this->_tpl_vars['form_data']['javascript']): ?>
  <script language="javascript">
  <!-- 
      <?php echo $this->_tpl_vars['form_data']['javascript']; ?>

  //-->
  </script>
  
  <?php endif; ?>
 
  
  <form <?php echo $this->_tpl_vars['form_data']['attributes']; ?>
>
    <!-- important hidden fields -->
   <?php echo $this->_tpl_vars['form_data']['hidden']; ?>

    <!-- Display the fields -->
	<div dojoType="ContentPane" layoutAlign="top" id="bluebox" style="height:200px;">
	<p>
		<label for="domain"><b>Pick a base operating system to create a profile for: </b></label> <?php echo $this->_tpl_vars['select_os']; ?>

	</P>
	
	</div>