<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// This script is designed to enable sites to perform easy/simple automated server installations
// using a variety of automated (scripted, imaged, etc.) methods.
// Copyright (c) 2006, James Antoniou III
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//    * Neither the name of the University of California, Berkeley nor the
//      names of its contributors may be used to endorse or promote products
//      derived from this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Purpose:  English language labels used for Windows 2003 Server form
$plugin_language = "English"; // follow ISO 639-2 English language naming conventions here!

$form_strings = array(
'LBL_HOSTNAME' => 'Enter hostname',
'LBL_DOMAIN' => 'Enter domain name',
'LBL_MAC' => 'Enter system MAC address',
'LBL_MAC_EXISTS' => 'Enter system MAC address',
'LBL_ADDR_TYPE' => 'Network Addressing',
'LBL_IPADDR' => 'Enter a static IP address',
'LBL_NETMASK' => 'Enter a Netmask',
'LBL_GATEWAY' => 'Enter a Gateway',
'LBL_DNS_1' => 'Primary DNS',
'LBL_DNS_2' => 'Secondary DNS',
'LBL_PASSWORD' => 'Enter admin password',
'LBL_PASSWORD_CONFIRM' =>  'Confirm admin password',
'LBL_LANG' => 'Choose language',
'LBL_TZ' => 'Choose timezone',
'LBL_CPU' => 'Choose your CPU type',
'LBL_HD' => 'Choose your hard drive',
'LBL_NOTIFY' => 'Email notify after server is installed?',
'LBL_PRE_INSTALL' => 'Enter scripted values for pre-installation tasks',
'LBL_POST_INSTALL' => 'Enter scripted values for post-installation tasks',
'LBL_SOFTWARE' => 'Choose one or more system profile types',
'LBL_PROFILE_CREATE_NAME' => 'Enter a generic system/server profile name'
);

$error_strings = array(
'ERR_HOSTNAME' => 'Please choose a hostname',
'ERR_DOMAIN' => 'Enter domain name',
'ERR_MAC' => 'Enter system MAC address',
'ERR_MAC_EXISTS' => 'That MAC address already exists',
'ERR_ADDR_TYPE' => 'Pick a network addressing type',
'ERR_IPADDR' => 'Pick a static IP address',
'ERR_NETMASK' => 'Enter a netmask',
'ERR_GATEWAY' => 'Enter a gateway',
'ERR_DNS_1' => 'Enter a primary DNS server',
'ERR_DNS_2' => 'Enter a secondary DNS server',
'ERR_PASSWORD' => 'Please choose an admin password',
'ERR_PASSWORD_CONFIRM' => 'Confirm admin password',
'ERR_LANG' => 'Choose language',
'ERR_TZ' => 'Choose timezone',
'ERR_CPU' => 'Choose your CPU type',
'ERR_HD' => 'Choose your hard drive',
'ERR_NOTIFY' => 'Notify via email after server is installed?',
'ERR_PRE_INSTALL' => 'Enter scripted values for pre-installation tasks',
'ERR_POST_INSTALL' => 'Enter scripted values for post-installation tasks',
'ERR_SOFTWARE' => 'Choose one or more system profile types',
'ERR_PROFILE_CREATE_NAME' => 'Enter a generic system/server profile name'
);