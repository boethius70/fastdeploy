<?php

/*

Serverminds FastDeploy Service (http://www.fastdeploy.com) 
This script is designed to enable sites to perform easy/simple automated server installations
using a variety of automated (scripted, imaged, etc.) methods.
 
Copyright (c) 2006, James Antoniou III
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

     * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the University of California, Berkeley nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.


THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

purpose:  This script is a "front-end" for adding new servers
to the deployment mechanism. 
 
*/
require_once('includes/common.php'); 	
 
if ($_SESSION['username'] != '') 
{
	if (sizeof($_GET) > 0) {
		$body = FastDeploy::server_op("edit"); 					 	     
	}
	elseif (sizeof($_POST) > 0) {
		$body = FastDeploy::server_op("edit"); 					 	       
	}	
	echo $body;
}	
else {
	$error['class'] = 'You do not appear to be authenticated'; 
	header("Location: index.php"); break;	
}
?>