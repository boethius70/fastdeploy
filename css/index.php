<?php
//
// Serverminds FastDeploy Service
// Copyright 2005, 2006 Jim Antoniou
// This script is designed to enable sites to perform easy/simple automated server installations
// using Kickstart (many/most Redhat-based Distributions) and Pre-seeding (Debian-based distributions)
// 

session_start();

if($_SESSION['customer_id'] != '' && isset($_SESSION['customer_id']))
{
	require_once('common.php');
	require_once('config.php'); 
	
	echo '<html>
		<head><title>Serverminds FastDeploy Service </title>
			<script type="text/javascript">
			var current_tab = \'home_tab\';
			var current_menu = \'home_menu\';
			
			function chkThis(field)
			{
			     field.value = formatMAC(field.value);
			
			     if(field.createTextRange)
			     {
			          setCaretAtEnd(field);
			     }
			}
			function chkThisIP(field)
			{
			     field.value = formatIP(field.value);
			
			     if(field.createTextRange)
			     {
			          setCaretAtEnd(field);
			     }
			}
			
			function formatMAC(mac){
			     mac = mac.replace(/\W/g, "");
			
			     if(mac.length >= 2){
			          mac = mac.substring(0, 2) + \'-\' + mac.substring(2);
			
			         	if(mac.length >= 5){
			               mac = mac.substring(0, 5) + \'-\' + mac.substring(5);
			               
			               if(mac.length >= 8){
			               	mac = mac.substring(0, 8) + \'-\' + mac.substring(8);
			               	
			               	if(mac.length >= 11){
			               		mac = mac.substring(0, 11) + \'-\' + mac.substring(11);
			               		
			               		if(mac.length >= 14){
			               			mac = mac.substring(0, 14) + \'-\' + mac.substring(14);
			
			               			if(mac.length > 17)
			              	 			{
			                    			mac = mac.substring(0, 17);
			               			}
			          		}
			
			     		}
			     	    }
			          }
			     }
			
			     return mac;
			}
			function formatIP(ip){
			     ip = ip.replace(/\W/g, "");
			
			     if(ip.length >= 3){
			          ip = ip.substring(0, 3) + \'.\' + ip.substring(4);
			
			         	if(ip.length >= 7){
			               ip = ip.substring(0, 7) + \'.\' + ip.substring(8);
			               
			               if(ip.length >= 11){
			               	ip = ip.substring(0, 11) + \'.\' + ip.substring(12);
			               		if(ip.length > 15)
			              	 	{
			                    		ip = ip.substring(0, 15);
			               		}
			          	}
			          }
			     }
			     return ip;
			}
			
			function setCaretAtEnd(element){
			     var range = element.createTextRange();
			     range.moveStart("character", element.value.length);
			     range.collapse();
			     range.select();
			}
			
			function hideLayer(whichLayer) {
			
				if (document.getElementById) {
				// this is the way the standards work
				document.getElementById(whichLayer).style.display = "none";
				}
				else if (document.all) {
				// this is the way old msie versions work
				document.all[whichlayer].style.display = "none";
				}
				else if (document.layers) {
				// this is the way nn4 works
				document.layers[whichLayer].display = "none";
				}
			
			}
			
			function showLayer(whichLayer) {
			
				if (document.getElementById) {
				// this is the way the standards work
				document.getElementById(whichLayer).style.visibility = "inline";
				}
				else if (document.all) {
				// this is the way old msie versions work
				document.all[whichlayer].style.display = "inline";
				}
				else if (document.layers) {
				// this is the way nn4 works
				document.layers[whichLayer].display = "inline";
				}
			
			}
			
			function handleClick(whichClick) {
			
				if (whichClick == "hide it") {
				// then the user wants to hide the layer
				hideLayer("drive-ide");
				
				}
				else if (whichClick == "show it") {
				// then the user wants to show the layer
				showLayer("drive-ide");
				}
			
			}
			function applyDisplay(toggle,id)
			{
	 			//document.getElementById(id).style.visibility = value;
	 			if (toggle == "off") { 
	 				document.getElementById(id).style.display = "none";
	 			}
	 			else if (toggle == "on") {
	 				document.getElementById(id).style.display = "inline";
	 			}
			}
			function applyViz(value,id)
			{
				
	 				//document.getElementById(id).style.display = value;
	 				
	 				
	 					document.getElementById(id).style.display=(value==true)?"block":"none";
	 				
	 			
			}
						
			function showComments(s,id){
				if(!document.getElementById)return;
				var a = document.getElementById(id);
				a.style.display=(s==true)?"block":"none";
			}
			
			function hideComments(){		
				if(document.getElementById){
					document.write("<style>#ide-off{display:none;}</style>");
				}
			}
			
			
			
			function switch_menu(tab_id, menu_id)
			{
				if (current_tab !=\'\') document.getElementById(current_tab).className=\'m_nav\';
				if (current_menu != \'\') document.getElementById(current_menu).style.visibility=\'hidden\';
			
				current_tab=tab_id;
				current_menu=menu_id;
			
				document.getElementById(current_tab).className=\'current_tab\';
				document.getElementById(current_menu).style.visibility=\'visible\';
			}
			hideComments();
			
			</script>
	
		<link rel="stylesheet" type="text/css" href="fastdeploy.css">
		</head><body>';
	
	
		$list .= '<div id="masthead">
			<div id="logo_container">
				<a href="general.php?action=UserTickets&fun=home&username='.$username.'"><img src="assets/images/header.png" alt="ServerMinds" border="0" /></a><!--
			--></div><div id="main_nav">
				<!-- div style="float: right; padding-right: 5px;"><a href="#" class="m_nav">Sitemap</a></div -->
				<div id="main_tabs">
					<a href="general.php?action=UserTickets&fun=home&username='.$username.'" class="m_nav" id="home_tab" onmouseover="switch_menu(\'home_tab\', \'home_menu\');">Home</a>
					<a href="#" class="m_nav" id="ticket_tab" onmouseover="switch_menu(\'ticket_tab\', \'ticket_menu\');">New Ticket</a>
					<a href="general.php?action=UserTickets&fun=changepassword&username='.$username.'" class="m_nav" id="profile_tab" onmouseover="switch_menu(\'profile_tab\', \'profile_menu\');">My Profile</a>
					<a href="#" class="m_nav" id="fastdeploy_tab" onmouseover="switch_menu(\'fastdeploy_tab\', \'fastdeploy_menu\');">FastDeploy Services</a>
				</div>
			</div>
			<div id="sub_nav">
			  <div id="home_menu" class="subglobalNav"> 
			    <a href="general.php?action=UserTickets&fun=home&username='.$username.'">Home</a> 
			  </div> 
			  <div id="ticket_menu" class="subglobalNav"> 
			    <a href="general.php?action=UserTickets&fun=create&username='.$username.'"> New Ticket</a> | <a href="#">Modify Ticket</a> 
			  </div> 
			  <div id="profile_menu" class="subglobalNav"> 
			   
			  </div> 
			  <div id="fastdeploy_menu" class="subglobalNav"> 
			    <a href="general.php?action=UserTickets&fun=deploy&username='.$username.'">Deploy New Server</a> | <a href="general.php?action=UserTickets&fun=deploy&username='.$username.'&deploy_stage=list">Edit/List Installed Servers</a> 
			  </div>
			</div><!-- end sub_nav -->
			</div><!-- end masthead -->
				  
				';
	
		return $list;
	}
	
	function FastDeploy() { 
		global $mod_strings;
		$tz = array("Africa/Abidjan",
			"Africa/Accra",
			"Africa/Addis_Ababa",
			"Africa/Algiers" => "Africa/Algiers",
			"Africa/Asmera" => "Africa/Asmera",
			"Africa/Bamako" => "Africa/Bamako",
			"Africa/Bangui" => "Africa/Bangui",
			"Africa/Banjul" => "Africa/Banjul",
			"Africa/Bissau" => "Africa/Bissau",
			"Africa/Blantyre" => "Africa/Blantyre",
			"Africa/Brazzaville" => "Africa/Brazzaville",
			"Africa/Bujumbura" => "Africa/Bujumbura",
			"Africa/Cairo" => "Africa/Cairo",
			"Africa/Casablanca" => "Africa/Casablanca",
			"Africa/Ceuta" => "Africa/Ceuta",
			"Africa/Conakry" => "Africa/Conakry",
			"Africa/Dakar" => "Africa/Dakar",
			"Africa/Dar_es_Salaam" => "Africa/Dar_es_Salaam",
			"Africa/Djibouti" => "Africa/Djibouti",
			"Africa/Douala" => "Africa/Douala",
			"Africa/El_Aaiun" => "Africa/El_Aaiun",
			"Africa/Freetown" => "Africa/Freetown",
			"Africa/Gaborone" => "Africa/Gaborone",
			"Africa/Harare" => "Africa/Harare",
			"Africa/Johannesburg" => "Africa/Johannesburg",
			"Africa/Kampala" => "Africa/Kampala",
			"Africa/Khartoum" => "Africa/Khartoum",
			"Africa/Kigali" => "Africa/Kigali",
			"Africa/Kinshasa" => "Africa/Kinshasa",
			"Africa/Lagos" => "Africa/Lagos",
			"Africa/Libreville" => "Africa/Libreville",
			"Africa/Lome" => "Africa/Lome",
			"Africa/Luanda" => "Africa/Luanda",
			"Africa/Lubumbashi" => "Africa/Lubumbashi",
			"Africa/Lusaka" => "Africa/Lusaka",
			"Africa/Malabo" => "Africa/Malabo",
			"Africa/Maputo" => "Africa/Maputo",
			"Africa/Maseru" => "Africa/Maseru",
			"Africa/Mbabane" => "Africa/Mbabane",
			"Africa/Mogadishu" => "Africa/Mogadishu",
			"Africa/Monrovia" => "Africa/Monrovia",
			"Africa/Nairobi" => "Africa/Nairobi",
			"Africa/Ndjamena" => "Africa/Ndjamena",
			"Africa/Niamey" => "Africa/Niamey",
			"Africa/Nouakchott" => "Africa/Nouakchott",
			"Africa/Ouagadougou" => "Africa/Ouagadougou",
			"Africa/Porto-Novo" => "Africa/Porto-Novo",
			"Africa/Sao_Tome" => "Africa/Sao_Tome",
			"Africa/Timbuktu" => "Africa/Timbuktu",
			"Africa/Tripoli" => "Africa/Tripoli",
			"Africa/Tunis" => "Africa/Tunis",
			"Africa/Windhoek" => "Africa/Windhoek",
			"America/Adak" => "America/Adak",
			"America/Anchorage" => "America/Anchorage",
			"America/Anguilla" => "America/Anguilla",
			"America/Antigua" => "America/Antigua",
			"America/Araguaina" => "America/Araguaina",
			"America/Argentina/Buenos_Air" => "America/Argentina/Buenos_Air",
			"America/Argentina/Catamarca" => "America/Argentina/Catamarca",
			"America/Argentina/ComodRivad" => "America/Argentina/ComodRivad",
			"America/Argentina/Cordoba" => "America/Argentina/Cordoba",
			"America/Argentina/Jujuy" => "America/Argentina/Jujuy",
			"America/Argentina/La_Rioja " => "America/Argentina/La_Rioja ",
			"America/Argentina/Mendoza" => "America/Argentina/Mendoza",
			"America/Argentina/Rio_Galleg" => "America/Argentina/Rio_Galleg",
			"America/Argentina/San_Juan " => "America/Argentina/San_Juan ",
			"America/Argentina/Tucuman" => "America/Argentina/Tucuman",
			"America/Argentina/Ushuaia" => "America/Argentina/Ushuaia",
			"America/Aruba" => "America/Aruba",
			"America/Asuncion" => "America/Asuncion",
			"America/Atka" => "America/Atka",
			"America/Bahia" => "America/Bahia",
			"America/Barbados" => "America/Barbados",
			"America/Belem" => "America/Belem",
			"America/Belize" => "America/Belize",
			"America/Boa_Vista" => "America/Boa_Vista",
			"America/Bogota" => "America/Bogota",
			"America/Boise" => "America/Boise",
			"America/Buenos_Aires" => "America/Buenos_Aires",
			"America/Cambridge_Bay" => "America/Cambridge_Bay",
			"America/Campo_Grande" => "America/Campo_Grande",
			"America/Cancun" => "America/Cancun",
			"America/Caracas" => "America/Caracas",
			"America/Catamarca" => "America/Catamarca",
			"America/Cayenne" => "America/Cayenne",
			"America/Cayman" => "America/Cayman",
			"America/Chicago" => "America/Chicago",
			"America/Chihuahua" => "America/Chihuahua",
			"America/Cordoba" => "America/Cordoba",
			"America/Costa_Rica" => "America/Costa_Rica",
			"America/Cuiaba" => "America/Cuiaba",
			"America/Curacao" => "America/Curacao",
			"America/Danmarkshavn" => "America/Danmarkshavn",
			"America/Dawson" => "America/Dawson",
			"America/Dawson_Creek" => "America/Dawson_Creek",
			"America/Denver" => "America/Denver",
			"America/Detroit" => "America/Detroit",
			"America/Dominica" => "America/Dominica",
			"America/Edmonton" => "America/Edmonton",
			"America/Eirunepe" => "America/Eirunepe",
			"America/El_Salvador" => "America/El_Salvador",
			"America/Ensenada" => "America/Ensenada",
			"America/Fort_Wayne" => "America/Fort_Wayne",
			"America/Fortaleza" => "America/Fortaleza",
			"America/Glace_Bay" => "America/Glace_Bay",
			"America/Godthab" => "America/Godthab",
			"America/Goose_Bay" => "America/Goose_Bay",
			"America/Grand_Turk" => "America/Grand_Turk",
			"America/Grenada" => "America/Grenada",
			"America/Guadeloupe" => "America/Guadeloupe",
			"America/Guatemala" => "America/Guatemala",
			"America/Guayaquil" => "America/Guayaquil",
			"America/Guyana" => "America/Guyana",
			"America/Halifax" => "America/Halifax",
			"America/Havana" => "America/Havana",
			"America/Hermosillo" => "America/Hermosillo",
			"America/Indiana/Indianapolis" => "America/Indiana/Indianapolis",
			"America/Indiana/Knox" => "America/Indiana/Knox",
			"America/Indiana/Marengo" => "America/Indiana/Marengo",
			"America/Indiana/Vevay" => "America/Indiana/Vevay",
			"America/Indianapolis" => "America/Indianapolis",
			"America/Inuvik" => "America/Inuvik",
			"America/Iqaluit" => "America/Iqaluit",
			"America/Jamaica" => "America/Jamaica",
			"America/Jujuy" => "America/Jujuy",
			"America/Juneau" => "America/Juneau",
			"America/Kentucky/Louisville" => "America/Kentucky/Louisville",
			"America/Kentucky/Monticello" => "America/Kentucky/Monticello",
			"America/Knox_IN" => "America/Knox_IN",
			"America/La_Paz" => "America/La_Paz",
			"America/Lima" => "America/Lima",
			"America/Los_Angeles" => "America/Los_Angeles",
			"America/Louisville" => "America/Louisville",
			"America/Maceio" => "America/Maceio",
			"America/Managua" => "America/Managua",
			"America/Manaus" => "America/Manaus",
			"America/Martinique" => "America/Martinique",
			"America/Mazatlan" => "America/Mazatlan",
			"America/Mendoza" => "America/Mendoza",
			"America/Menominee" => "America/Menominee",
			"America/Merida" => "America/Merida",
			"America/Mexico_City" => "America/Mexico_City",
			"America/Miquelon" => "America/Miquelon",
			"America/Monterrey" => "America/Monterrey",
			"America/Montevideo" => "America/Montevideo",
			"America/Montreal" => "America/Montreal",
			"America/Montserrat" => "America/Montserrat",
			"America/Nassau" => "America/Nassau",
			"America/New_York" => "America/New_York",
			"America/Nipigon" => "America/Nipigon",
			"America/Nome" => "America/Nome",
			"America/Noronha" => "America/Noronha",
			"America/North_Dakota/Center" => "America/North_Dakota/Center",
			"America/Panama" => "America/Panama",
			"America/Pangnirtung" => "America/Pangnirtung",
			"America/Paramaribo" => "America/Paramaribo",
			"America/Phoenix" => "America/Phoenix",
			"America/Port-au-Prince" => "America/Port-au-Prince",
			"America/Port_of_Spain" => "America/Port_of_Spain",
			"America/Porto_Acre" => "America/Porto_Acre",
			"America/Porto_Velho" => "America/Porto_Velho",
			"America/Puerto_Rico" => "America/Puerto_Rico",
			"America/Rainy_River" => "America/Rainy_River",
			"America/Rankin_Inlet" => "America/Rankin_Inlet",
			"America/Recife" => "America/Recife",
			"America/Regina" => "America/Regina",
			"America/Rio_Branco" => "America/Rio_Branco",
			"America/Rosario" => "America/Rosario",
			"America/Santiago" => "America/Santiago",
			"America/Santo_Domingo" => "America/Santo_Domingo",
			"America/Sao_Paulo" => "America/Sao_Paulo",
			"America/Scoresbysund" => "America/Scoresbysund",
			"America/Shiprock" => "America/Shiprock",
			"America/St_Johns" => "America/St_Johns",
			"America/St_Kitts" => "America/St_Kitts",
			"America/St_Lucia" => "America/St_Lucia",
			"America/St_Thomas" => "America/St_Thomas",
			"America/St_Vincent" => "America/St_Vincent",
			"America/Swift_Current" => "America/Swift_Current",
			"America/Tegucigalpa" => "America/Tegucigalpa",
			"America/Thule" => "America/Thule",
			"America/Thunder_Bay" => "America/Thunder_Bay",
			"America/Tijuana" => "America/Tijuana",
			"America/Toronto" => "America/Toronto",
			"America/Tortola" => "America/Tortola",
			"America/Vancouver" => "America/Vancouver",
			"America/Virgin" => "America/Virgin",
			"America/Whitehorse" => "America/Whitehorse",
			"America/Winnipeg" => "America/Winnipeg",
			"America/Yakutat" => "America/Yakutat",
			"America/Yellowknife" => "America/Yellowknife",
			"Antarctica/Casey" => "Antarctica/Casey",
			"Antarctica/Davis" => "Antarctica/Davis",
			"Antarctica/DumontDUrville" => "Antarctica/DumontDUrville",
			"Antarctica/Mawson" => "Antarctica/Mawson",
			"Antarctica/McMurdo" => "Antarctica/McMurdo",
			"Antarctica/Palmer" => "Antarctica/Palmer",
			"Antarctica/Rothera" => "Antarctica/Rothera",
			"Antarctica/South_Pole" => "Antarctica/South_Pole",
			"Antarctica/Syowa" => "Antarctica/Syowa",
			"Antarctica/Vostok" => "Antarctica/Vostok",
			"Arctic/Longyearbyen" => "Arctic/Longyearbyen",
			"Asia/Aden" => "Asia/Aden",
			"Asia/Amman" => "Asia/Amman",
			"Asia/Anadyr" => "Asia/Anadyr",
			"Asia/Aqtau" => "Asia/Aqtau",
			"Asia/Aqtobe" => "Asia/Aqtobe",
			"Asia/Ashgabat" => "Asia/Ashgabat",
			"Asia/Ashkhabad" => "Asia/Ashkhabad",
			"Asia/Baghdad" => "Asia/Baghdad",
			"Asia/Bahrain" => "Asia/Bahrain",
			"Asia/Baku" => "Asia/Baku",
			"Asia/Bangkok" => "Asia/Bangkok",
			"Asia/Beirut" => "Asia/Beirut",
			"Asia/Bishkek" => "Asia/Bishkek",
			"Asia/Brunei" => "Asia/Brunei",
			"Asia/Calcutta" => "Asia/Calcutta",
			"Asia/Choibalsan" => "Asia/Choibalsan",
			"Asia/Chongqing" => "Asia/Chongqing",
			"Asia/Chungking" => "Asia/Chungking",
			"Asia/Colombo" => "Asia/Colombo",
			"Asia/Dacca" => "Asia/Dacca",
			"Asia/Damascus" => "Asia/Damascus",
			"Asia/Dhaka" => "Asia/Dhaka",
			"Asia/Dili" => "Asia/Dili",
			"Asia/Dubai" => "Asia/Dubai",
			"Asia/Dushanbe" => "Asia/Dushanbe",
			"Asia/Gaza" => "Asia/Gaza",
			"Asia/Harbin" => "Asia/Harbin",
			"Asia/Hong_Kong" => "Asia/Hong_Kong",
			"Asia/Hovd" => "Asia/Hovd",
			"Asia/Irkutsk" => "Asia/Irkutsk",
			"Asia/Istanbul" => "Asia/Istanbul",
			"Asia/Jakarta" => "Asia/Jakarta",
			"Asia/Jayapura" => "Asia/Jayapura",
			"Asia/Jerusalem" => "Asia/Jerusalem",
			"Asia/Kabul" => "Asia/Kabul",
			"Asia/Kamchatka" => "Asia/Kamchatka",
			"Asia/Karachi" => "Asia/Karachi",
			"Asia/Kashgar" => "Asia/Kashgar",
			"Asia/Katmandu" => "Asia/Katmandu",
			"Asia/Krasnoyarsk" => "Asia/Krasnoyarsk",
			"Asia/Kuala_Lumpur" => "Asia/Kuala_Lumpur",
			"Asia/Kuching" => "Asia/Kuching",
			"Asia/Kuwait" => "Asia/Kuwait",
			"Asia/Macao" => "Asia/Macao",
			"Asia/Macau" => "Asia/Macau",
			"Asia/Magadan" => "Asia/Magadan",
			"Asia/Makassar" => "Asia/Makassar",
			"Asia/Manila" => "Asia/Manila",
			"Asia/Muscat" => "Asia/Muscat",
			"Asia/Nicosia" => "Asia/Nicosia",
			"Asia/Novosibirsk" => "Asia/Novosibirsk",
			"Asia/Omsk" => "Asia/Omsk",
			"Asia/Oral" => "Asia/Oral",
			"Asia/Phnom_Penh" => "Asia/Phnom_Penh",
			"Asia/Pontianak" => "Asia/Pontianak",
			"Asia/Pyongyang" => "Asia/Pyongyang",
			"Asia/Qatar" => "Asia/Qatar",
			"Asia/Qyzylorda" => "Asia/Qyzylorda",
			"Asia/Rangoon" => "Asia/Rangoon",
			"Asia/Riyadh" => "Asia/Riyadh",
			"Asia/Riyadh87" => "Asia/Riyadh87",
			"Asia/Riyadh88" => "Asia/Riyadh88",
			"Asia/Riyadh89" => "Asia/Riyadh89",
			"Asia/Saigon" => "Asia/Saigon",
			"Asia/Sakhalin" => "Asia/Sakhalin",
			"Asia/Samarkand" => "Asia/Samarkand",
			"Asia/Seoul" => "Asia/Seoul",
			"Asia/Shanghai" => "Asia/Shanghai",
			"Asia/Singapore" => "Asia/Singapore",
			"Asia/Taipei" => "Asia/Taipei",
			"Asia/Tashkent" => "Asia/Tashkent",
			"Asia/Tbilisi" => "Asia/Tbilisi",
			"Asia/Tehran" => "Asia/Tehran",
			"Asia/Tel_Aviv" => "Asia/Tel_Aviv",
			"Asia/Thimbu" => "Asia/Thimbu",
			"Asia/Thimphu" => "Asia/Thimphu",
			"Asia/Tokyo" => "Asia/Tokyo",
			"Asia/Ujung_Pandang" => "Asia/Ujung_Pandang",
			"Asia/Ulaanbaatar" => "Asia/Ulaanbaatar",
			"Asia/Ulan_Bator" => "Asia/Ulan_Bator",
			"Asia/Urumqi" => "Asia/Urumqi",
			"Asia/Vientiane" => "Asia/Vientiane",
			"Asia/Vladivostok" => "Asia/Vladivostok",
			"Asia/Yakutsk" => "Asia/Yakutsk",
			"Asia/Yekaterinburg" => "Asia/Yekaterinburg",
			"Asia/Yerevan" => "Asia/Yerevan",
			"Atlantic/Azores" => "Atlantic/Azores",
			"Atlantic/Bermuda" => "Atlantic/Bermuda",
			"Atlantic/Canary" => "Atlantic/Canary",
			"Atlantic/Cape_Verde" => "Atlantic/Cape_Verde",
			"Atlantic/Faeroe" => "Atlantic/Faeroe",
			"Atlantic/Jan_Mayen" => "Atlantic/Jan_Mayen",
			"Atlantic/Madeira" => "Atlantic/Madeira",
			"Atlantic/Reykjavik" => "Atlantic/Reykjavik",
			"Atlantic/South_Georgia" => "Atlantic/South_Georgia",
			"Atlantic/St_Helena" => "Atlantic/St_Helena",
			"Atlantic/Stanley" => "Atlantic/Stanley",
			"Australia/ACT" => "Australia/ACT",
			"Australia/Adelaide" => "Australia/Adelaide",
			"Australia/Brisbane" => "Australia/Brisbane",
			"Australia/Broken_Hill" => "Australia/Broken_Hill",
			"Australia/Canberra" => "Australia/Canberra",
			"Australia/Darwin" => "Australia/Darwin",
			"Australia/Hobart" => "Australia/Hobart",
			"Australia/LHI" => "Australia/LHI",
			"Australia/Lindeman" => "Australia/Lindeman",
			"Australia/Lord_Howe" => "Australia/Lord_Howe",
			"Australia/Melbourne" => "Australia/Melbourne",
			"Australia/NSW" => "Australia/NSW",
			"Australia/North" => "Australia/North",
			"Australia/Perth" => "Australia/Perth",
			"Australia/Queensland" => "Australia/Queensland",
			"Australia/South" => "Australia/South",
			"Australia/Sydney" => "Australia/Sydney",
			"Australia/Tasmania" => "Australia/Tasmania",
			"Australia/Victoria" => "Australia/Victoria",
			"Australia/West" => "Australia/West",
			"Australia/Yancowinna" => "Australia/Yancowinna",
			"Brazil/Acre" => "Brazil/Acre",
			"Brazil/DeNoronha" => "Brazil/DeNoronha",
			"Brazil/East" => "Brazil/East",
			"Brazil/West" => "Brazil/West",
			"CET" => "CET",
			"CST6CDT " => "CST6CDT ",
			"Canada/Atlantic" => "Canada/Atlantic",
			"Canada/Central" => "Canada/Central",
			"Canada/East-Saskatchewan" => "Canada/East-Saskatchewan",
			"Canada/Eastern" => "Canada/Eastern",
			"Canada/Mountain" => "Canada/Mountain",
			"Canada/Newfoundland" => "Canada/Newfoundland",
			"Canada/Pacific" => "Canada/Pacific",
			"Canada/Saskatchewan" => "Canada/Saskatchewan",
			"Canada/Yukon" => "Canada/Yukon",
			"Chile/Continental" => "Chile/Continental",
			"Chile/EasterIsland" => "Chile/EasterIsland",
			"Cuba" => "Cuba",
			"EET" => "EET",
			"EST" => "EST",
			"EST5EDT" => "EST5EDT",
			"Egypt" => "Egypt",
			"Eire" => "Eire",
			"Etc/GMT" => "Etc/GMT",
			"Etc/GMT+0" => "Etc/GMT+0",
			"Etc/GMT+1" => "Etc/GMT+1",
			"Etc/GMT+10" => "Etc/GMT+10",
			"Etc/GMT+11" => "Etc/GMT+11",
			"Etc/GMT+12" => "Etc/GMT+12",
			"Etc/GMT+2" => "Etc/GMT+2",
			"Etc/GMT+3" => "Etc/GMT+3",
			"Etc/GMT+4" => "Etc/GMT+4",
			"Etc/GMT+5" => "Etc/GMT+5",
			"Etc/GMT+6" => "Etc/GMT+6",
			"Etc/GMT+7" => "Etc/GMT+7",
			"Etc/GMT+8" => "Etc/GMT+8",
			"Etc/GMT+9" => "Etc/GMT+9",
			"Etc/GMT-0" => "Etc/GMT-0",
			"Etc/GMT-1" => "Etc/GMT-1",
			"Etc/GMT-10" => "Etc/GMT-10",
			"Etc/GMT-11" => "Etc/GMT-11",
			"Etc/GMT-12" => "Etc/GMT-12",
			"Etc/GMT-13" => "Etc/GMT-13",
			"Etc/GMT-14" => "Etc/GMT-14",
			"Etc/GMT-2" => "Etc/GMT-2",
			"Etc/GMT-3" => "Etc/GMT-3",
			"Etc/GMT-4" => "Etc/GMT-4",
			"Etc/GMT-5" => "Etc/GMT-5",
			"Etc/GMT-6" => "Etc/GMT-6",
			"Etc/GMT-7" => "Etc/GMT-7",
			"Etc/GMT-8" => "Etc/GMT-8",
			"Etc/GMT-9" => "Etc/GMT-9",
			"Etc/GMT0" => "Etc/GMT0",
			"Etc/Greenwich" => "Etc/Greenwich",
			"Etc/UCT" => "Etc/UCT",
			"Etc/UTC" => "Etc/UTC",
			"Etc/Universal" => "Etc/Universal",
			"Etc/Zulu" => "Etc/Zulu",
			"Europe/Amsterdam" => "Europe/Amsterdam",
			"Europe/Andorra" => "Europe/Andorra",
			"Europe/Athens" => "Europe/Athens",
			"Europe/Belfast" => "Europe/Belfast",
			"Europe/Belgrade" => "Europe/Belgrade",
			"Europe/Berlin" => "Europe/Berlin",
			"Europe/Bratislava" => "Europe/Bratislava",
			"Europe/Brussels" => "Europe/Brussels",
			"Europe/Bucharest" => "Europe/Bucharest",
			"Europe/Budapest" => "Europe/Budapest",
			"Europe/Chisinau" => "Europe/Chisinau",
			"Europe/Copenhagen" => "Europe/Copenhagen",
			"Europe/Dublin" => "Europe/Dublin",
			"Europe/Gibraltar" => "Europe/Gibraltar",
			"Europe/Helsinki" => "Europe/Helsinki",
			"Europe/Istanbul" => "Europe/Istanbul",
			"Europe/Kaliningrad" => "Europe/Kaliningrad",
			"Europe/Kiev" => "Europe/Kiev",
			"Europe/Lisbon" => "Europe/Lisbon",
			"Europe/Ljubljana" => "Europe/Ljubljana",
			"Europe/London" => "Europe/London",
			"Europe/Luxembourg" => "Europe/Luxembourg",
			"Europe/Madrid" => "Europe/Madrid",
			"Europe/Malta" => "Europe/Malta",
			"Europe/Mariehamn" => "Europe/Mariehamn",
			"Europe/Minsk" => "Europe/Minsk",
			"Europe/Monaco" => "Europe/Monaco",
			"Europe/Moscow" => "Europe/Moscow",
			"Europe/Nicosia" => "Europe/Nicosia",
			"Europe/Oslo" => "Europe/Oslo",
			"Europe/Paris" => "Europe/Paris",
			"Europe/Prague" => "Europe/Prague",
			"Europe/Riga" => "Europe/Riga",
			"Europe/Rome" => "Europe/Rome",
			"Europe/Samara" => "Europe/Samara",
			"Europe/San_Marino" => "Europe/San_Marino",
			"Europe/Sarajevo" => "Europe/Sarajevo",
			"Europe/Simferopol" => "Europe/Simferopol",
			"Europe/Skopje" => "Europe/Skopje",
			"Europe/Sofia" => "Europe/Sofia",
			"Europe/Stockholm" => "Europe/Stockholm",
			"Europe/Tallinn" => "Europe/Tallinn",
			"Europe/Tirane" => "Europe/Tirane",
			"Europe/Tiraspol" => "Europe/Tiraspol",
			"Europe/Uzhgorod" => "Europe/Uzhgorod",
			"Europe/Vaduz" => "Europe/Vaduz",
			"Europe/Vatican" => "Europe/Vatican",
			"Europe/Vienna" => "Europe/Vienna",
			"Europe/Vilnius" => "Europe/Vilnius",
			"Europe/Warsaw" => "Europe/Warsaw",
			"Europe/Zagreb" => "Europe/Zagreb",
			"Europe/Zaporozhye" => "Europe/Zaporozhye",
			"Europe/Zurich" => "Europe/Zurich",
			"Factory " => "Factory ",
			"GB" => "GB",
			"GB-Eire " => "GB-Eire ",
			"GMT" => "GMT",
			"GMT+0 " => "GMT+0 ",
			"GMT-0 " => "GMT-0 ",
			"GMT0" => "GMT0",
			"Greenwich " => "Greenwich ",
			"HST" => "HST",
			"Hongkong " => "Hongkong ",
			"Iceland" => "Iceland",
			"Indian/Antananarivo" => "Indian/Antananarivo",
			"Indian/Chagos" => "Indian/Chagos",
			"Indian/Christmas" => "Indian/Christmas",
			"Indian/Cocos" => "Indian/Cocos",
			"Indian/Comoro" => "Indian/Comoro",
			"Indian/Kerguelen" => "Indian/Kerguelen",
			"Indian/Mahe" => "Indian/Mahe",
			"Indian/Maldives" => "Indian/Maldives",
			"Indian/Mauritius" => "Indian/Mauritius",
			"Indian/Mayotte" => "Indian/Mayotte",
			"Indian/Reunion" => "Indian/Reunion",
			"Iran " => "Iran ",
			"Israel " => "Israel ",
			"Jamaica" => "Jamaica",
			"Japan " => "Japan ",
			"Kwajalein" => "Kwajalein",
			"Libya " => "Libya ",
			"MET" => "MET",
			"MST" => "MST",
			"MST7MDT" => "MST7MDT",
			"Mexico/BajaNorte" => "Mexico/BajaNorte",
			"Mexico/BajaSur" => "Mexico/BajaSur",
			"Mexico/General" => "Mexico/General",
			"Mideast/Riyadh87" => "Mideast/Riyadh87",
			"Mideast/Riyadh88" => "Mideast/Riyadh88",
			"Mideast/Riyadh89" => "Mideast/Riyadh89",
			"NZ" => "NZ",
			"NZ-CHAT" => "NZ-CHAT",
			"Navajo" => "Navajo",
			"PRC" => "PRC",
			"PST8PDT " => "PST8PDT ",
			"Pacific/Apia" => "Pacific/Apia",
			"Pacific/Auckland" => "Pacific/Auckland",
			"Pacific/Chatham" => "Pacific/Chatham",
			"Pacific/Easter" => "Pacific/Easter",
			"Pacific/Efate" => "Pacific/Efate",
			"Pacific/Enderbury" => "Pacific/Enderbury",
			"Pacific/Fakaofo" => "Pacific/Fakaofo",
			"Pacific/Fiji" => "Pacific/Fiji",
			"Pacific/Funafuti" => "Pacific/Funafuti",
			"Pacific/Galapagos" => "Pacific/Galapagos",
			"Pacific/Gambier" => "Pacific/Gambier",
			"Pacific/Guadalcanal" => "Pacific/Guadalcanal",
			"Pacific/Guam" => "Pacific/Guam",
			"Pacific/Honolulu" => "Pacific/Honolulu",
			"Pacific/Johnston" => "Pacific/Johnston",
			"Pacific/Kiritimati" => "Pacific/Kiritimati",
			"Pacific/Kosrae" => "Pacific/Kosrae",
			"Pacific/Kwajalein" => "Pacific/Kwajalein",
			"Pacific/Majuro" => "Pacific/Majuro",
			"Pacific/Marquesas" => "Pacific/Marquesas",
			"Pacific/Midway" => "Pacific/Midway",
			"Pacific/Nauru" => "Pacific/Nauru",
			"Pacific/Niue" => "Pacific/Niue",
			"Pacific/Norfolk" => "Pacific/Norfolk",
			"Pacific/Noumea" => "Pacific/Noumea",
			"Pacific/Pago_Pago" => "Pacific/Pago_Pago",
			"Pacific/Palau" => "Pacific/Palau",
			"Pacific/Pitcairn" => "Pacific/Pitcairn",
			"Pacific/Ponape>Pacific/Pona" => "Pacific/Ponape>Pacific/Pona",
			"Pacific/Port_Moresby" => "Pacific/Port_Moresby",
			"Pacific/Rarotonga" => "Pacific/Rarotonga",
			"Pacific/Saipan" => "Pacific/Saipan",
			"Pacific/Samoa" => "Pacific/Samoa",
			"Pacific/Tahiti" => "Pacific/Tahiti",
			"Pacific/Tarawa" => "Pacific/Tarawa",
			"Pacific/Tongatapu" => "Pacific/Tongatapu",
			"Pacific/Truk" => "Pacific/Truk",
			"Pacific/Wake" => "Pacific/Wake",
			"Pacific/Wallis" => "Pacific/Wallis",
			"Pacific/Yap" => "Pacific/Yap",
			"Poland" => "Poland",
			"Portugal " => "Portugal ",
			"ROK" => "ROK",
			"Singapore" => "Singapore",
			"SystemV/AST4" => "SystemV/AST4",
			"SystemV/AST4ADT" => "SystemV/AST4ADT",
			"SystemV/CST6" => "SystemV/CST6",
			"SystemV/CST6CDT" => "SystemV/CST6CDT",
			"SystemV/EST5" => "SystemV/EST5",
			"SystemV/EST5EDT" => "SystemV/EST5EDT",
			"SystemV/HST10" => "SystemV/HST10",
			"SystemV/MST7" => "SystemV/MST7",
			"SystemV/MST7MDT" => "SystemV/MST7MDT",
			"SystemV/PST8" => "SystemV/PST8",
			"SystemV/PST8PDT" => "SystemV/PST8PDT",
			"SystemV/YST9" => "SystemV/YST9",
			"SystemV/YST9YDT" => "SystemV/YST9YDT",
			"Turkey" => "Turkey",
			"UCT" => "UCT",
			"US/Alaska" => "US/Alaska",
			"US/Aleutian" => "US/Aleutian",
			"US/Arizona" => "US/Arizona",
			"US/Central" => "US/Central",
			"US/East-Indiana" => "US/East-Indiana",
			"US/Eastern" => "US/Eastern",
			"US/Hawaii" => "US/Hawaii",
			"US/Indiana-Starke" => "US/Indiana-Starke",
			"US/Michigan" => "US/Michigan",
			"US/Mountain" => "US/Mountain",
			"US/Pacific" => "US/Pacific",
			"US/Samoa" => "US/Samoa",
			"UTC" => "UTC",
			"Universal" => "Universal",
			"W-SU" => "W-SU ",
			"WET" => "WET",
			"Zulu" => "Zulu");
			
			$lang = array("af_ZA" => "Afrikaans (South Africa)",
					"sq_AL" => "Albanian",
					"ar_DZ" => "Arabic (Algeria)",
					"ar_BH" => "Arabic (Bahrain)",
					"ar_EG" => "Arabic (Egypt)",
					"ar_IN" => "Arabic (India)",
					"ar_IQ" => "Arabic (Iraq)",
					"ar_JO" => "Arabic (Jordan)",
					"ar_KW" => "Arabic (Kuwait)",
					"ar_LB" => "Arabic (Lebanon)",
					"ar_LY" => "Arabic (Libyan)",
					"ar_MA" => "Arabic (Morocco)",
					"ar_OM" => "Arabic (Oman)",
					"ar_QA" => "Arabic (Qatar)",
					"ar_SA" => "Arabic (Saudi",
					"ar_SD" => "Arabic (Sudan)",
					"ar_SY" => "Arabic (Syrian",
					"ar_TN" => "Arabic (Tunisia)",
					"ar_AE" => "Arabic (United",
					"ar_YE" => "Arabic (Yemen)",
					"eu_ES" => "Basque (Spain)",
					"be_BY" => "Belarusian",
					"bn_BD" => "Bengali (BD)",
					"bn_IN" => "Bengali (India)",
					"bs_BA" => "Bosnian (Bosnia",
					"br_FR" => "Breton (France)",
					"bg_BG" => "Bulgarian",
					"ca_ES" => "Catalan (Spain)",
					"zh_HK" => "Chinese (Hong",
					"zh_CN.GB18030" => "Chinese (P.R.C.)",
					"zh_TW" => "Chinese (Taiwan)",
					"kw_GB" => "Cornish (Britain)",
					"hr_HR" => "Croatian",
					"cs_CZ" => "Czech",
					"da_DK" => "Danish",
					"nl_BE" => "Dutch (Belgium)",
					"nl_NL" => "Dutch (Netherlands)",
					"en_AU" => "English (Australia)",
					"en_BW" => "English (Botswana)",
					"en_CA" => "English (Canada)",
					"en_DK" => "English (Denmark)",
					"en_GB" => "English (Great Britain)",
					"en_HK" => "English (Hong Kong)",
					"en_IN" => "English (India)",
					"en_IE" => "English (Ireland)",
					"en_NZ" => "English (New Zealand)",
					"en_PH" => "English (Philippines)",
					"en_SG" => "English (Singapore)",
					"en_ZA" => "English (South Africa)",
					"en_US" => "English (USA)",
					"en_ZW" => "English (Zimbabwe)",
					"et_EE" => "Estonian",
					"fo_FO" => "Faroese (Faroe Islands)",
					"fi_FI" => "Finnish",
					"fr_BE" => "French (Belgium)",
					"fr_CA" => "French (Canada)",
					"fr_FR" => "French (France)",
					"fr_LU" => "French (Luxemburg)",
					"fr_CH" => "French (Switzerland)",
					"gl_ES" => "Galician (Spain)",
					"de_AT" => "German (Austria)",
					"de_BE" => "German (Belgium)",
					"de_DE" => "German (Germany)",
					"de_LU" => "German (Luxemburg)",
					"de_CH" => "German (Switzerland)",
					"el_GR" => "Greek",
					"kl_GL" => "Greenlandic (Greenland)",
					"gu_IN" => "Gujarati (India)",
					"he_IL" => "Hebrew (Israel)",
					"hi_IN" => "Hindi (India)",
					"hu_HU" => "Hungarian",
					"is_IS" => "Icelandic",
					"id_ID" => "Indonesian",
					"ga_IE" => "Irish",
					"it_IT" => "Italian (Italy)",
					"it_CH" => "Italian (Switzerland)",
					"ja_JP" => "Japanese",
					"ko_KR" => "Korean (Republic",
					"lo_LA" => "Lao (Laos)",
					"lv_LV" => "Latvian (Latvia)",
					"lt_LT" => "Lithuanian",
					"mk_MK" => "Macedonian",
					"ms_MY" => "Malay (Malaysia)",
					"mt_MT" => "Maltese (malta)",
					"gv_GB" => "Manx Gaelic",
					"mr_IN" => "Marathi (India)",
					"se_NO" => "Northern Saami",
					"no_NO" => "Norwegian",
					"nn_NO" => "Norwegian, Nynorsk",
					"oc_FR" => "Occitan (France)",
					"fa_IR" => "Persian (Iran)",
					"pl_PL" => "Polish",
					"pt_BR" => "Portuguese (Brasil)",
					"pt_PT" => "Portuguese (Portugal)",
					"pa_IN" => "Punjabi (India)",
					"ro_RO" => "Romanian",
					"ru_RU" => "Russian",
					"ru_UA" => "Russian (Ukraine)",
					"sr_YU@cyrillic" => "Serbian (Yugoslavia)",
					"sk_SK" => "Slovak",
					"sl_SI" => "Slovenian (Slovenia)",
					"es_AR" => "Spanish (Argentina)",
					"es_BO" => "Spanish (Bolivia)",
					"es_CL" => "Spanish (Chile)",
					"es_CO" => "Spanish (Colombia)",
					"es_CR" => "Spanish (Costa Rica)",
					"es_DO" => "Spanish (Dominican Republic)",
					"es_SV" => "Spanish (El Salvador)",
					"es_EC" => "Spanish (Equador)",
					"es_GT" => "Spanish (Guatemala)",
					"es_HN" => "Spanish (Honduras)",
					"es_MX" => "Spanish (Mexico)",
					"es_NI" => "Spanish (Nicaragua)",
					"es_PA" => "Spanish (Panama)",
					"es_PY" => "Spanish (Paraguay)",
					"es_PE" => "Spanish (Peru)",
					"es_PR" => "Spanish (Puerto Rico)",
					"es_ES" => "Spanish (Spain)",
					"es_US" => "Spanish (USA)",
					"es_UY" => "Spanish (Uruguay)",
					"es_VE" => "Spanish (Venezuela)",
					"sv_FI" => "Swedish (Finland)",
					"sv_SE" => "Swedish (Sweden)",
					"tl_PH" => "Tagalog (Philipines)",
					"ta_IN" => "Tamil (India)",
					"te_IN" => "Telgu (India)",
					"th_TH" => "Thai",
					"tr_TR" => "Turkish",
					"uk_UA" => "Ukrainian",
					"ur_PK" => "Urdu (Pakistan)",
					"uz_UZ" => "Uzbek (Uzbekistan)",
					"wa_BE@euro" => "Walloon (Belgium)",
					"cy_GB" => "Welsh (Great Britain)",
					"xh_ZA" => "Xhosa (South Africa)",
					"zu_ZA" => "Zulu (South Africa)");
			
				
			if ($_REQUEST['deploy_error_check'] == "new_stage2") { 
				if ($_REQUEST['editserver'] != "") { // in other words, the user is EDITING an existing server entry
					 	                 // rather than passing it through the form submission process.
					$mysqlc = mysql_connect('localhost','root','Ashcan33');
					if (!$mysqlc) {
		   				die('Could not connect: ' . mysql_error());
		   			}
		   			else { 
		   				DBConnect();
		   				$server_list = mysql_query("SELECT * FROM servers WHERE mac='". $_REQUEST['editserver'] ."'"); 
		   				while($item_row = mysql_fetch_object($server_list)) { 
		   					$_REQUEST['os'] = $item_row->os; 
		   					$_REQUEST['addresstype'] = $item_row->addresstype; 
		   					$_REQUEST['harddrive'] = $item_row->harddrive; 
		   					$_REQUEST['arch'] = $item_row->arch; 
		   					$_REQUEST['language'] = $item_row->language; 
		   					$_REQUEST['timezone'] = $item_row->timezone; 
		   					$_REQUEST['install-web-server'] = $item_row->install_web_server; 
		   					$_REQUEST['install-dns-server'] = $item_row->install_dns_server; 
		   					$_REQUEST['install-mysql-server'] = $item_row->install_mysql_server; 
		   					$_REQUEST['install-minimal'] = $item_row->install_minimal; 
		   					$_REQUEST['ip'] = $item_row->ip; 
		   					$_REQUEST['netmask'] = $item_row->netmask; 
		   					$_REQUEST['gateway'] = $item_row->gateway; 
		   					$_REQUEST['dns_1'] = $item_row->dns_1; 
		   					$_REQUEST['dns_2'] = $item_row->dns_2; 
		   					$_REQUEST['hostname'] = $item_row->hostname; 
		   					$_REQUEST['domain'] = $item_row->domain; 
		   					$_REQUEST['mac'] = $item_row->mac; 
		   					$_REQUEST['customer_id'] = $item_row->mac; 
		   					
		   				}
		   			}
	   			}
	   			// beginning of discrete state-less processes (i.e., not tied to a particular stage)
	   			if ($_REQUEST['os'] == "") { $error_code['os'] = "Please choose an operating system to install"; }
				if ($_REQUEST['mac'] == "") { 
					$error_code['mac'] = "Please enter a MAC address"; 
				}
				if ($_REQUEST['addresstype'] == "") { $error_code['addresstype'] = "Please select an IP address type"; }
				if ($_REQUEST['hostname'] == "") { $error_code['hostname'] = "Please enter a hostname"; }
				if ($_REQUEST['domain'] == "") { $error_code['domain'] = "Please enter a domain name to use"; }
				if ($_REQUEST['language'] == "") { $error_code['language'] = "Please select a default language to use"; }
				if ($_REQUEST['timezone'] == "") { $error_code['timezone'] = "Please select a default timezone to use"; }
				if ($_REQUEST['arch'] == "") { $error_code['arch'] = "Please select a hardware architecture (i386/x86 or amd64/x64)"; }
				if ($_REQUEST['harddrive'] == "") { $error_code['harddrive'] = "Please select a hard drive interface type"; }
				if ($_REQUEST['rootpw_orig'] == "") { $error_code['rootpw'] = "Please enter a password for the root user"; }
				if ($_REQUEST['rootpw_orig'] != "") { 
					if ($_REQUEST['rootpw_confirm'] != $_REQUEST['rootpw_orig']) {
						 $error_code['rootpw'] = "Your root passwords don't match"; 
					}
				}
				$check_mysqlc = mysql_connect('localhost','root','Ashcan33');
				if ($_REQUEST['editserver'] == "") {
					if ($_REQUEST['editing'] == "") { 
						if (!$check_mysqlc) {
							die('Could not connect: ' . mysql_error());
						}
						else { 
							mysql_select_db('serverminds'); 
							$server_check = mysql_query("SELECT mac FROM servers WHERE mac='". $_REQUEST['mac'] ."'"); 
							if (mysql_num_rows($server_check) > 0) { 
								$error_code['macexists'] = "That MAC address already exists in the database";	
							}
							mysql_close($check_mysqlc); 
						}
					}
				}
				
				// setting proper values after initial stage... make this smarter :)
				if ($_REQUEST['os'] == "centos4") { $selected_os_c4 = 'SELECTED'; }
				if ($_REQUEST['os'] == "centos3.5") { $selected_os_c35 = 'SELECTED'; }
				if ($_REQUEST['os'] == "centos3.6") { $selected_os_c36 = 'SELECTED'; }
				if ($_REQUEST['os'] == "fedora3") { $selected_os_f3 = 'SELECTED'; }
				if ($_REQUEST['os'] == "fedora4") { $selected_os_f4 = 'SELECTED'; }
				if ($_REQUEST['os'] == "debian3.1") { $selected_os_d31 = 'SELECTED'; }
				if ($_REQUEST['os'] == "ubuntu") { $selected_os_ub = 'SELECTED'; }
				
				if (($_REQUEST['addresstype'] == "dynamic") || ($_REQUEST['addresstype'] == "")) { 
					$dynamic_type = "CHECKED"; 
					$ip_display = 'style="display : none;"'; // this determines whether to display or not display
				}					 // the full listing of static IP address info
				if ($_REQUEST['addresstype'] == "static") { 
					$static_type = "CHECKED"; 
					$ip_display = 'style="display : true;"';
					$static_display = 'style="display : true;"';
					if ($_REQUEST['ip'] == "") { $error_code['ip'] = "Please enter an IP address"; } 
					if ($_REQUEST['netmask'] == "") { $error_code['netmask'] = "Please enter a netmask"; } 
					if ($_REQUEST['gateway'] == "") { $error_code['gateway'] = "Please enter a gateway"; } 
					if ($_REQUEST['dns_1'] == "") { $error_code['dns_1'] = "Please enter a primary DNS"; } 
				}
				
				if ($_REQUEST['harddrive'] == "ide") { $ide_checked = "CHECKED"; }
				if ($_REQUEST['harddrive'] == "scsi") { $scsi_checked = "CHECKED"; }
				if ($_REQUEST['harddrive'] == "sata") { $sata_checked = "CHECKED"; }
			
				if ($_REQUEST['arch'] == "i386") { $x86_checked = "CHECKED"; }
				if ($_REQUEST['arch'] == "x86_64") { $x86_64_checked = "CHECKED"; }
				
				if ($_REQUEST['install-web-server'] == "on" ) { $web_server_sel = "CHECKED"; } 
				if ($_REQUEST['install-dns-server'] == "on" ) { $dns_server_sel = "CHECKED"; } 
				if ($_REQUEST['install-mysql-server'] == "on" ) { $mysql_server_sel = "CHECKED"; } 
				if ($_REQUEST['install-mysql-server'] == "on" ) { $mysql_server_sel = "CHECKED"; } 
				if ($_REQUEST['install-minimal'] == "on") { $minimal_sel = "CHECKED"; }
				
				if ($_REQUEST['notify'] == "on" ) { $notify_checked = "CHECKED"; } 
				
				if (($_REQUEST['timezone'] != "") || ($_REQUEST['language'] != "")) { // NOW populate tz/lang if it's selected.
					foreach ($tz as $timez => $v) {
					
						if ($timez == $_REQUEST['timezone']) { 
							$selected_tz = "SELECTED";	
						}
						else { 
							$selected_tz = "";	
						}
						$tz_list .= "<option value=\"". $timez ."\" $selected_tz>". $v ."</option>\n"; 
					}
					
					foreach ($lang as $k => $v) {
						if ($k == $_REQUEST['language']) {
						$selected_lang = "SELECTED"; 
						}
						else {
							$selected_lang = "";
						}
						$lang_list .= "<option value=\"". $k ."\" $selected_lang>". $v ."</option>\n"; 
					}
				}
				$error_codes = implode ("<br>", $error_code);
				$all_codes = '<table border="0" cellspacing="2" cellpadding="0"><tr><td><td><font color=red>'. $error_codes .'</font></td></tr></table>';
				
				if ((sizeof($error_code) == 0) && ($_REQUEST['verify'] == "yes")) {
					if ($_REQUEST['deploy_error_check'] == "new_stage2") { // user MAY have it all right; 1st time check
						$stage_display = '<input type=hidden value="new_stage2" name="deploy_error_check">';
						$stage_display .= '<input type=hidden value="no" name="verify">';
						$all_codes = '<table border="0" cellspacing="2" cellpadding="0"><tr><td><td><font color=black>Please verify that the values are correct</font></td></tr></table>';
						$stage_val_display = "Verify your settings";
						if ($_REQUEST['editing'] != "") { // preserve the editing state
							$stage_display .= '<input type=hidden value="yes" name="editing">';
						}
					}				
				}
				elseif ((sizeof($error_code) > 0) && ($_REQUEST['verify'] == "yes")) {
					if ($_REQUEST['deploy_error_check'] == "new_stage2") { // user MAY have it all right; 1st time check
						$stage_display = '<input type=hidden value="new_stage2" name="deploy_error_check">';
						$stage_display .= '<input type=hidden value="yes" name="verify">';
						
						//$all_codes = '<table border="0" cellspacing="2" cellpadding="0"><tr><td><td><font color=black>Please verify that the values are correct</font></td></tr></table>';
						$stage_val_display = "Verify your settings";
					}
					if ($_REQUEST['editing'] != "") { // put this in to preserve the editing state
						$stage_display .= '<input type=hidden value="yes" name="editing">';
					}
				}
				elseif ((sizeof($error_code) == 0) && ($_REQUEST['verify'] == "no")) { // in other words, we're done and now want to 
											 // to add/edit/modify the server
					$username = $_SESSION['customer_name'];
					$tr_username = str_replace("@", "at", $username);
					
					// Let's put this server into this user's database FIRST so we can use this server's stored DB information
					// anywhere during the writing of the automation file; e.g., serverid comes to mind.
					$mysqlc = mysql_connect('localhost','root','Ashcan33');
					if (!$mysqlc) {
			   			die('Could not connect: ' . mysql_error());
			   		}
			   		else { 
			   			mysql_select_db('serverminds'); 
			   			if ($_REQUEST['editing'] == "") { 
			   				$check_server = mysql_query("SELECT * FROM servers WHERE mac='". $_REQUEST['mac'] ."'"); 
			   				if (mysql_num_rows($check_server) == 0) { // don't insert this server if it already exists in the DB!
			   					$session_check = session_id();
			   					$mysql_q = mysql_query("INSERT INTO servers (customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install_web_server,install_dns_server,install_mysql_server,install_minimal,language,timezone,arch,harddrive,sessid) VALUES('". $username ."','". $_REQUEST['os'] ."','". $_REQUEST['mac'] ."','". $_REQUEST['addresstype'] ."','". $_REQUEST['ip'] ."','". $_REQUEST['netmask'] ."','". $_REQUEST['gateway'] ."','". $_REQUEST['dns_1'] ."','". $_REQUEST['dns_2'] ."','". $_REQUEST['hostname'] ."','". $_REQUEST['domain'] ."','". $_REQUEST['install-web-server'] ."','". $_REQUEST['install-dns-server'] ."','". $_REQUEST['install-mysql-server'] ."','". $_REQUEST['install-minimal'] ."','". $_REQUEST['language'] ."','". $_REQUEST['timezone'] ."','". $_REQUEST['arch'] ."','". $_REQUEST['harddrive'] ."','". $session_check ."')");
				   				$server_list = mysql_query("SELECT * FROM servers WHERE customer_id='". $_SESSION['customer_name'] ."'"); 
				   				$allboxen = array(); 
			   					// serverid,customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install-web-server,install-dns-server,install-mysql-server,language,timezone,arch,harddrive
			   					array_push($allboxen,"<table width=750 cellspacing=0 cellpadding=0 border=0 class=data_set>
			   						  <tr bgcolor=#cccccc><td><font><b>os</b></font></td><td><font><b>mac</b></font></td><td><font><b>Addr</b></font></td><td><font><b>IP</b></font></td>
			   				                      <td><font><b>host</b></font></td><td><font><b>lang</b></font></td><td><font><b>arch</b></font></td><td><font><b>drive</b></font></td></tr>"); 
			   						   				
			   					if (mysql_num_rows($server_list) > 0) { 
			   						while($item_row = mysql_fetch_object($server_list)) { 
			   							array_push($allboxen,"<tr><td><font>". $item_row->os ."</font></td><td><font>". $item_row->mac ."</font></td><td><font>". $item_row->addresstype ."</font></td><td><font>". $item_row->ip ."</font></td>
			   							<td><font>". $item_row->hostname ."</font></td><td><font>". $item_row->language ."</font></td><td><font>". $item_row->arch ."</font></td><td><font>". $item_row->harddrive ."</font></td></tr>");               
			   						}
			   					}
			   				
			   					array_push($allboxen,"</table>");
			   					//$list = implode("", $allboxen); 
				   			}
				   			else { // that server already exists in the database!  Return a response to the user!
			   					$list = "<table width=750 cellspacing=0 cellpadding=0 border=0> 
			   					<tr><td><b>The server associated with MAC address ". $_REQUEST['mac'] ." already exists in the database.
			   					<a href=\"general.php?action=UserTickets&fun=deploy&username=". $username . "&editserver=". $_REQUEST['mac'] ."\">Click here</a> if you'd like
			   					to edit this server.";	
			   				}
				   		}
				   		elseif ($_REQUEST['editing'] != "") {    // watch out about resetting MAC address for single node licenses; e.g.,
				   			$session_check = session_id(); // we may decide to make the MAC address a 'sacred' table key at some point.
				   			$update_server = mysql_query("UPDATE servers SET customer_id='". $username ."',os='". $_REQUEST['os'] ."',mac='". $_REQUEST['mac'] ."',addresstype='". $_REQUEST['addresstype'] ."',ip='". $_REQUEST['ip'] ."',netmask='". $_REQUEST['netmask'] ."',gateway='". $_REQUEST['gateway'] ."',dns_1='". $_REQUEST['dns_1'] ."',dns_2='". $_REQUEST['dns_2'] ."',hostname='". $_REQUEST['hostname'] ."',domain='". $_REQUEST['domain'] ."',install_web_server='". $_REQUEST['install-web-server'] ."',install_dns_server='". $_REQUEST['install-dns-server'] ."',install_mysql_server='". $_REQUEST['install-mysql-server'] ."',install_minimal='". $_REQUEST['install-minimal'] ."',language='". $_REQUEST['language'] ."',timezone='". $_REQUEST['timezone'] ."',arch='". $_REQUEST['arch'] ."',harddrive='". $_REQUEST['harddrive'] ."',sessid='". $session_check ."' WHERE mac='". $_REQUEST['mac'] ."'"); 
			   				$server_list = mysql_query("SELECT * FROM servers WHERE customer_id='". $_SESSION['customer_name'] ."'"); 
				   			
				   			$allboxen = array(); 
			   				// serverid,customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install-web-server,install-dns-server,install-mysql-server,language,timezone,arch,harddrive
			   				array_push($allboxen,"
			   					  <table width=750 cellspacing=0 cellpadding=0 border=0>
			   					  <tr><td><b>Your deployed servers</b></td></tr>
			   					  </table>
			   				            <table width=750 cellspacing=0 cellpadding=0 border=0 class=data_set>
			   					  <tr bgcolor=#cccccc><td><font><b>os</b></font></td><td><font><b>mac</b></font></td><td><font><b>Addr</b></font></td><td><font><b>IP</b></font></td>
			   				                     <td><font><b>host</b></font></td><td><font><b>lang</b></font></td><td><font><b>arch</b></font></td><td><font><b>drive</b></font></td></tr>"); 
			   					   				
			   				if (mysql_num_rows($server_list) > 0) { 
			   					while($item_row = mysql_fetch_object($server_list)) { 
			   						array_push($allboxen,"<tr><td><font>". $item_row->os ."</font></td><td><font>". $item_row->mac ."</font></td><td><font>". $item_row->addresstype ."</font></td><td><font>". $item_row->ip ."</font></td>
			   						<td><font>". $item_row->hostname ."</font></td><td><font>". $item_row->language ."</font></td><td><font>". $item_row->arch ."</font></td><td><font>". $item_row->harddrive ."</font></td></tr>"); 
					   			                      
			   					}
			   				}
			   				array_push($allboxen,"</table>");
			   				//$list = implode("", $allboxen);
			   			}
						mysql_close($mysqlc);	
			   		}
					
					// assuming checks pass, write out the files used by the auto-installers
					if (($_REQUEST['os'] == "centos4") || ($_REQUEST['os'] == "centos4.1") || ($_REQUEST['os'] == "centos3.5") || ($_REQUEST['os'] == "centos3.6") || ($_REQUEST['os'] == "fedora3") || ($_REQUEST['os'] == "fedora4")) { 
						$handle_read = file("/www/serverminds.com/deploy/ks-centos-template.cfg"); 
						$handle_write = fopen("/www/serverminds.com/deploy/ks-centos-". $tr_username ."-". $_REQUEST['hostname'] ."-". $_REQUEST['mac'] .".txt","w+"); 
						
						//$text_change = file($handle_read,filesize('/minds.com/deploy/ks-centos-template.txt'));
						foreach ($handle_read as $line) {
						 	if (preg_match("/ks-lang-username-hostname-mac/", $line)) {
						 		//$line = str_replace("ks-lang-username-hostname-mac","ks-lang-". $tr_username ."-". $_REQUEST['hostname'] ."-". $_REQUEST['mac'] .".txt", $line); 
						 		$line = str_replace("ks-lang-username-hostname-mac","lang ". $_REQUEST['language'] .".UTF-8\nlangsupport --default ". $_REQUEST['language'] .".UTF-8 ". $_REQUEST['language'] .".UTF-8\n", $line); 
						 		fputs($handle_write,$line);
						 	}
						 	elseif (preg_match("/ks-part-username-hostname-mac/", $line)) {
						 		//$line = str_replace("ks-part-username-hostname-mac","ks-part-". $tr_username ."-". $_REQUEST['hostname'] ."-". $_REQUEST['mac'] .".txt", $line); 
						 		//if ($_REQUEST['part'] == "auto") {
			   						//$line = str_replace("ks-part-username-hostname-mac","clearpart  --all --drives=". $_REQUEST['drive_value0'] ."\nautopart",$line); 
			   						$line = str_replace("ks-part-username-hostname-mac","clearpart  --all\nautopart",$line); 
			   					//}
			   					//elseif ($_REQUEST['part'] == "custom") {
			   				
			   					//}
			   				
						 		fputs($handle_write,$line);
						 	}
						 	elseif (preg_match("/ks-enter-deployment/", $line)) {  // to enter the deployment status
						 		DBConnect(); 
			   					$server_check = mysql_query("SELECT * FROM servers WHERE sessid='".session_id() ."' AND customer_id='". $_SESSION['customer_name'] ."' AND mac='". $_REQUEST['mac'] ."'" );	
			   					while ($server_row = mysql_fetch_assoc($server_check)) { 
			   						$server_id = $server_row["serverid"]; 
			   						$session_id = $server_row["sessid"]; 
			   					}
			   					mysql_close($server_check); 
						 		// VALUES ('". $_REQUEST['hostname'] ."','". $_REQUEST['mac'] ."','". $_REQUEST['os'] ."','". $_REQUEST['username'] ."','". $_REQUEST['domain'] ."')
						 		$line = "/usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?hostname=". $_REQUEST['hostname'] ."&username=". $_SESSION['customer_name'] ."&ip=". $_REQUEST['ip'] ."&mac=". $_REQUEST['mac'] ."&os=". $_REQUEST['os'] ."&domain=". $_REQUEST['domain'] ."&op=3&sessid=". $session_id ."&sid=". $server_id ."\" -O /dev/null"; 					 		
						 		fputs($handle_write,$line);
						 	}
						 	elseif (preg_match("/ks-packages-username-hostname-mac/", $line)) {
						 	 	//$line = str_replace("ks-packages-username-hostname-mac","ks-packages-". $tr_username ."-". $_REQUEST['hostname'] ."-". $_REQUEST['mac'] .".txt", $line); 
						 	 	fputs ($handle_write, "%packages --resolvedeps\n");
								if ($_REQUEST['install-dns-server'] == "on") { 
					   				$dns_line = "@dns-server\n";
					   				//fwrite ($handle_write, $line);
					   			}
								if ($_REQUEST['install-mysql-server'] == "on") { 
									$mysql_line = "@mysql\nmysql-server\n";
									//fputs ($handle_write, $line); 
								}
								if ($_REQUEST['install-web-server'] == "on") {
									$web_line= "@web-server\r
	php\r
	php-mysql\r"; 
								//fputs (handle_write, $web_server_text); 
								}
								if ($_REQUEST['install-minimal'] == "on") { 
									$minimal_line ="
	#minimalist distribution - remove as much as possible
	-anacron
	-apmd
	-autofs
	-bluez-libs
	-bluez-bluefw
	-bluez-hcidump
	-bluez-utils
	-comps
	-cups
	-cups-libs
	-desktop-file-utils
	-dhcpv6_client
	-diskdumputils
	-dmraid
	-eject
	-finger
	-lftp
	-logwatch
	-rpmdb-CentOS
	-fbset
	-freetype
	-fontconfig
	-htmlview
	-ipsec-tools
	-iptables
	-irda-utils
	-isdn4k-utils
	-lockdev
	-mailcap
	-mdadm
	-mgetty
	-minicom
	-mt-st
	-nano
	-nc
	-netdump
	-nfs-utils
	-quota
	-pcmcia-cs
	-pinfo
	-portmap
	-rdist
	-rmt
	-rp-pppoe
	-rsh
	-statserial
	-setserial
	-slocate
	-specspo
	-stunnel
	-sysreport
	-system-config-securitylevel-tui
	-system-config-network-tui
	-talk
	-tcpdump
	-up2date
	-vconfig
	-wvdial
	-wireless-tools
	-ypbind
	-yp-tools
	#
	-redhat-lsb
	-xorg-x11-Mesa-libGL
	-xorg-x11-libs
	#
	#system-config-mouse
	#
	-pyxf86config
	-rhpl
	#
	-libwvstreams
	-ppp
	#
	-utemper
	-wireless-tools
	#";
		
								}
								$line = "". $dns_line . "" . $mysql_line . "" . $web_line ."". $minimal_line ."
	sudo
	kernel
	grub
	joe
	yum
	wget
	vim-enhanced"; 
						
						 	 	fputs($handle_write,$line);
						 	 }
							elseif (preg_match("/ks-tz/", $line)) {			 	 	
						 		$line = str_replace("ks-tz","". $_REQUEST['timezone'] ."", $line); 
						 		fputs($handle_write,$line);
						 	}
						 	elseif (preg_match("/ks-rootpw/", $line)) { 
						 		$line = str_replace("ks-rootpw","--iscrypted ". crypt($_REQUEST['rootpw_orig']) ."", $line); 	
						 		fputs($handle_write,$line);
						 	}
						 	elseif (preg_match("/ks-url/", $line)) { 
						 		if ($_REQUEST['os'] == "centos4") { $os_ver = "4"; $dist="centos"; }
						 		elseif ($_REQUEST['os']  == "centos3.5") { $os_ver = "3.5"; $dist="centos"; }
						 		elseif ($_REQUEST['os']  == "centos3.6") { $os_ver = "3.6"; $dist="centos"; }
						 		elseif ($_REQUEST['os']  == "centos4.1") { $os_ver = "4.1"; $dist="centos"; }
						 		elseif ($_REQUEST['os']  == "fedora3") { $os_ver = "3"; $dist="fedora"; }
						 		elseif ($_REQUEST['os']  == "fedora4") { $os_ver = "4"; $dist="fedora"; }
						 		if ($dist == "fedora") { 
						 			$line = str_replace("ks-url","url --url http://mirrors.kernel.org/". $dist ."/core/". $os_ver ."/". $_REQUEST['arch'] ."/os",$line);
						 		}
						 		elseif ($dist == "centos") { 
						 			$line = str_replace("ks-url","url --url http://mirrors.kernel.org/". $dist ."/". $os_ver ."/os/". $_REQUEST['arch'] ."/",$line);
						 		}
						 		// centos/4/os/i386
						 		// fedora/core/4/i386/os 
						 		fputs($handle_write,$line);				 		
						 	}
						 	elseif (preg_match("/ks-addressing/", $line)) {
						 		if ($_REQUEST['addresstype'] == "static") {
						 			$line = str_replace("ks-addressing","static --ip=". $_REQUEST['ip'] ." --netmask=". $_REQUEST['netmask'] ." --gateway=". $_REQUEST['gateway'] ." --nameserver=". $_REQUEST['dns'] ."",$line);  
						 			$line = str_replace("ks-hostname",$_REQUEST['hostname'],$line); 
						 			fputs($handle_write,$line); 
						 		}
						 		else {
						 			$line = str_replace("ks-addressing","dhcp",$line); 
						 			$line = str_replace("ks-hostname",$_REQUEST['hostname'],$line); 
						 			fputs($handle_write,$line); 
						 		}
						 	}
						 	elseif (preg_match("/ks-hostname/", $line)) {
						 		
						 	}
			   				elseif (preg_match("/ks-cleanup-post/", $line)) {  // for misc. post-install cleanup tasks
			   					DBConnect(); 
			   					$server_check = mysql_query("SELECT * FROM servers WHERE sessid='".session_id() ."' AND customer_id='". $_SESSION['customer_name'] ."' AND mac='". $_REQUEST['mac'] ."'" );	
			   					while ($server_row = mysql_fetch_assoc($server_check)) { 
			   						$server_id = $server_row["serverid"]; 
			   						$session_id = $server_row["sessid"]; 
			   					}
			   					mysql_close($server_check); 
			   					if ($_REQUEST['notify'] == "on") {
			   						$line = "/usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?username=". $_SESSION['customer_name'] ."&sessid=". $session_id ."&sid=". $server_id ."&op=1\" -O /dev/null";
			   						$line .= "
	/usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?username=". $_SESSION['customer_name'] ."&sessid=". $session_id ."&mac=". $_REQUEST['mac'] ."&sid=". $server_id ."&op=2\" -O /dev/null";
			   					}		   					
			   					fputs($handle_write,$line);
			   				}
						 	else { 
						 		fputs($handle_write,$line);
						 	}
						 	
						}
			  
			   			fclose($handle_write);
								   			
		   			}
		   			elseif (($_REQUEST['os'] == "debian3.1") || ($_REQUEST['os'] == "ubuntu")){
		   				$deb_handle_read = file("/home/mirrors/preseed.template.cfg"); 
		   				$new_mac = str_replace("-","", $_REQUEST['mac']);
						$deb_handle_write = fopen("/home/mirrors/". $new_mac ."","w+"); 
						
						//$text_change = file($handle_read,filesize('/minds.com/deploy/ks-centos-template.txt'));
						foreach ($deb_handle_read as $line) {
						 	if (preg_match("/preseed-network-config/", $line)) {
						 		if ($_REQUEST['addresstype'] == "static") {
						 			$line=str_replace("preseed-network-config","d-i netcfg/disable_dhcp                boolean true
	d-i netcfg/get_nameservers             string ". $_REQUEST['dns_1'] ." ". $_REQUEST['dns_2'] ."
	d-i netcfg/get_ipaddress               string ". $_REQUEST['ip'] ."
	d-i netcfg/get_netmask                 string ". $_REQUEST['netmask'] ."
	d-i netcfg/get_gateway                 string ". $_REQUEST['gateway'] ."
	d-i netcfg/confirm_static              boolean true
	d-i netcfg/get_hostname                string ". $_REQUEST['hostname'] .".". $_REQUEST['domain'] ."
	d-i netcfg/get_domain                  string ". $_REQUEST['domain'] ."",$line);
									fputs($deb_handle_write,$line);
								}
								elseif ($_REQUEST['addresstype'] == "dhcp") { 
									$line = str_replace("preseed-network-config","d-i  netcfg/get_hostname                string ". $_REQUEST['hostname'] ."\r
	d-i netcfg/get_domain                  string ". $_REQUEST['domain'] ."\r
	d-i netcfg/disable_dhcp                boolean false \r
	d-i netcfg/dhcp_hostname               string ". $_REQUEST['hostname'] ."\r",$line); 
									fputs($deb_handle_write,$line);
		
		   						}
		   					}
		   					elseif (preg_match("/preseed-disk-recipe/", $line)) { 
		   						//if ($_REQUEST['part'] == "auto") {
			   						$line = str_replace("preseed-disk-recipe","d-i  partman-auto/disk                  string /dev/discs/disc0/disc\nd-i partman-auto/choose_recipe select All files in one partition (recommended for new users)",$line); 
			   						fputs($deb_handle_write,$line);
			   					//}
			   					//elseif ($_REQUEST['part'] == "custom") {
			   				
			   					//}
			   				}
			   				elseif (preg_match("/preseed-rootpw/", $line)) { 
			   					$line = str_replace("preseed-rootpw", $_REQUEST['rootpw_orig'], $line);
			   					fputs($deb_handle_write,$line);
			   				}
			   				elseif (preg_match("/preseed-tz/", $line)) { 
			   					list($country, $zone) = split ("/", $_REQUEST['timezone']); 
			   					$line = str_replace("preseed-tz","base-config  tzconfig/choose_country_zone/". $country ."          select ". $zone ."", $line);
			   					fputs($deb_handle_write,$line);	
			   				}
			   				elseif (preg_match("/preseed-mirror/", $line)) { 
			   					if ($_REQUEST['os'] == "debian3.1") { 
			   						$line = str_replace("preseed-mirror","d-i  mirror/http/hostname               string mirrors.kernel.org\nd-i  mirror/http/directory             string /debian\nd-i  mirror/suite                       string sarge\n",$line); 
			   					}
								elseif ($_REQUEST['os'] == "ubuntu") {
									$line = str_replace("preseed-mirror","d-i  mirror/http/hostname               string mirrors.xmission.com\nd-i  mirror/http/directory              string /ubuntu\nd-i  mirror/suite                       string breezy",$line);
								}
								fputs($deb_handle_write,$line);	
			   				}
			   				elseif (preg_match("/preseed-apt/", $line)) { 
			   					if ($_REQUEST['os'] == "debian3.1") { 
			   						$line = str_replace("preseed-apt","base-config  apt-setup/hostname         string mirrors.kernel.org\nbase-config  apt-setup/directory        string /debian\n",$line); 
			   					}
								elseif ($_REQUEST['os'] == "ubuntu") {
									$line = str_replace("preseed-apt","base-config  apt-setup/hostname         string mirrors.xmission.com\nbase-config  apt-setup/directory        string /ubuntu\n",$line);
								}
								fputs($deb_handle_write,$line);	
			   				}
			   				elseif (preg_match("/preseed-lang/", $line)) { 
			   					$line = str_replace("preseed-lang","d-i		language string ". $_REQUEST['language'] ."", $line);
			   					fputs($deb_handle_write,$line);	
			   				}
			   				elseif (preg_match("/preseed-task/", $line)) { 
			   					$all_line_task = array(); 
			   					$all_multitasks = array(); 
			   					
			   					//$all_line_task is for late_commands ONLY
			   					array_push($all_line_task,"base-config base-config/late_command    string  apt-get install --assume-yes "); 
			   					//$all_lines is for "multiselect" tasks in D-I
			   					if ($_REQUEST['install-dns-server'] == "on") { 
			   					    	array_push($all_multitasks,"DNS server");
				   				}
			   					if ($_REQUEST['install-web-server'] == "on") { 
									array_push($all_multitasks,"Web server");
				   				}
				   				if ($_REQUEST['install-mysql-server'] == "on") { 
			   						array_push($all_line_task,"mysql-server php-mysql");
			   					}
			   					// set the hostname here
			   					array_push($all_line_task, "; echo ". $_REQUEST['hostname'] ." > /target/etc/hostname; echo ". $_REQUEST['hostname'] ." > /etc/hostname"); 
			   					
				   				$lines = implode(" ", $all_line_task); 
				   			
				   				$lines_too = "tasksel	tasksel/first	multiselect ". implode(", ",$all_multitasks) ."";     
				   				$line = $lines ."\n". $lines_too; 
				   				//$line = str_replace("preseed-task", $lines_all, $line); 
				   				fputs($deb_handle_write,$line);		
			   				}
			   				elseif (preg_match("/preseed-afterinst1/", $line)) { 
			   					DBConnect(); 
			   					$server_check = mysql_query("SELECT * FROM servers WHERE sessid='".session_id() ."' AND customer_id='". $_SESSION['customer_name'] ."' AND mac='". $_REQUEST['mac'] ."'" );	
			   					while ($server_row = mysql_fetch_assoc($server_check)) { 
			   						$server_id = $server_row["serverid"]; 
			   						$session_id = $server_row["sessid"]; 
			   					}
			   					mysql_close($server_check); 
			   					$all_lines = array();
			   					array_push($all_lines,"d-i preseed/late_command	string "); 
			   					if ($_REQUEST['notify'] == "on") { 
			   						// /usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?hostname=". $_REQUEST['hostname'] ."&username=". $_SESSION['customer_name'] ."&ip=". $_REQUEST['ip'] ."&mac=". $_REQUEST['mac'] ."&os=". $_REQUEST['os'] ."&domain=". $_REQUEST['domain'] ."&op=3&sessid=". $session_id ."&sid=". $server_id ."\" -O /dev/null
			   						// /usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?username=". $_SESSION['customer_name'] ."&sessid=". $session_id ."&sid=". $server_id ."&op=1\" -O /dev/null";
									// /usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?username=". $_SESSION['customer_name'] ."&sessid=". $session_id ."&sid=". $server_id ."&op=2\" -O /dev/null";
			   						array_push($all_lines,"/usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?username=". $_SESSION['customer_name'] ."&sessid=". $session_id ."&sid=". $server_id ."&op=1\" -O /dev/null; ");
			   					}
			   					// now run the op to delete the auto-start/-PXE file(s)...
			   					array_push($all_lines,"/usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?username=". $_SESSION['customer_name'] ."&mac=". $_REQUEST['mac'] ."&sessid=". $session_id ."&sid=". $server_id ."&op=2\" -O /dev/null ;");
			   					// now set the hostname
			   					array_push($all_lines,"echo ". $_REQUEST['hostname'] ." > /target/etc/hostname"); 
			   					$line = implode (" ", $all_lines);
			   					fputs($deb_handle_write,$line);
			   				}
			   				
			   				elseif (preg_match("/preseed-preinst1/", $line)) { 
			   					DBConnect(); 
			   					$server_check = mysql_query("SELECT * FROM servers WHERE sessid='".session_id() ."' AND customer_id='". $_SESSION['customer_name'] ."' AND mac='". $_REQUEST['mac'] ."'" );	
			   					while ($server_row = mysql_fetch_assoc($server_check)) { 
			   						$server_id = $server_row["serverid"]; 
			   						$session_id = $server_row["sessid"]; 
			   					}
			   					mysql_close($server_check); 
			   					$line = "d-i preseed/early_command              string	/usr/bin/wget -q \"http://secure.serverminds.com/support/ops.php?hostname=". $_REQUEST['hostname'] ."&username=". $_SESSION['customer_name'] ."&ip=". $_REQUEST['ip'] ."&mac=". $_REQUEST['mac'] ."&os=". $_REQUEST['os'] ."&domain=". $_REQUEST['domain'] ."&op=3&sessid=". $session_id ."&sid=". $server_id ."\" -O /dev/null \n";
			   					fputs($deb_handle_write,$line);
			   				}
		   					else { // this must be done so that all non-parsed--or default--preseed template config file 
		   				                 // lines are also written 
		   						fputs($deb_handle_write,$line);	
		   					}	
			   			}
		   				fclose($deb_handle_write);
		   			}
		   			
		   			// Now let's copy the default pxelinux file to the MAC-associated pxelinux boot file.
		   			$new_mac = str_replace("-","", $_REQUEST['mac']);
					system("cp /tftpboot/pxelinux.cfg/default /tftpboot/pxelinux.cfg/01-". $_REQUEST['mac'] ."-read"); 
					$mac_read = file("/tftpboot/pxelinux.cfg/01-". $_REQUEST['mac'] ."-read"); 
					$mac_write = fopen("/tftpboot/pxelinux.cfg/01-". $_REQUEST['mac'] ."","w+"); 
					foreach ($mac_read as $mac_line) {
						if (preg_match("/timeout 0/", $mac_line)) {
							$mac_line = str_replace("timeout 0", "timeout 50", $mac_line); 
							fputs($mac_write, $mac_line);
						}
						elseif (preg_match("/prompt 1/", $mac_line)) {
							$mac_line = str_replace("prompt 1", "prompt 1\n default ". $_REQUEST['os'] ."", $mac_line); 
							fputs($mac_write, $mac_line);
						}
						elseif (preg_match("/default local/", $mac_line)) {
							$mac_line = str_replace("default local", "", $mac_line); 
							fputs($mac_write, $mac_line);
						}
						elseif (preg_match("/ks-". $_REQUEST['os'] ."-". $_REQUEST['arch'] .".txt/", $mac_line)) { 
							$mac_line = str_replace("ks-". $_REQUEST['os'] ."-". $_REQUEST['arch'] .".txt", "ks-centos-". $tr_username ."-". $_REQUEST['hostname'] ."-". $_REQUEST['mac'] .".txt", $mac_line); 
							fputs($mac_write, $mac_line);
						}
						//elseif ($_REQUEST['os'] == "debian3.1") {
						elseif (preg_match("/preseed-i386-3.1.cfg/", $mac_line)) {
							//$new_mac = str_replace("-","", $_REQUEST['mac']);
							$mac_line = str_replace("preseed-i386-3.1.cfg", $new_mac, $mac_line);
							fputs($mac_write, $mac_line);
						}
						//}
						else {
							fputs($mac_write, $mac_line); 	
						}
					}
		   			fclose($mac_write); 			 
		   			system("rm -f /tftpboot/pxelinux.cfg/01-". $_REQUEST['mac'] ."-read"); 
		   			// display a verification results screen: 
		   			
			   		$mysqlc = mysql_connect('localhost','root','Ashcan33');
			   		mysql_select_db('serverminds'); 
			   		$server_list = mysql_query("SELECT * FROM servers WHERE customer_id='". $_SESSION['customer_name'] ."'"); 
				   	$allboxen = array(); 
			   		// serverid,customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install-web-server,install-dns-server,install-mysql-server,language,timezone,arch,harddrive
			   		array_push($allboxen,"<table width=750 cellspacing=0 cellpadding=0 border=0 class=data_set>
			   			            <tr bgcolor=#cccccc><td><font><b>os</b></font></td><td><font><b>mac</b></font></td><td><font><b>Addr</b></font></td><td><font><b>IP</b></font></td>
			   				  <td><font><b>host</b></font></td><td><font><b>lang</b></font></td><td><font><b>arch</b></font></td><td><font><b>drive</b></font></td></tr>"); 
			   					   				
			   		if (mysql_num_rows($server_list) > 0) { 
			   			while($item_row = mysql_fetch_object($server_list)) { 
			   				array_push($allboxen,"<tr><td><font>". $item_row->os ."</font></td><td><font>". $item_row->mac ."</font></td><td><font>". $item_row->addresstype ."</font></td><td><font>". $item_row->ip ."</font></td>
			   					<td><font>". $item_row->hostname ."</font></td><td><font>". $item_row->language ."</font></td><td><font>". $item_row->arch ."</font></td><td><font>". $item_row->harddrive ."</font></td></tr>"); 
					   	}
			   		}
			   		array_push($allboxen,"</table>");
			   		$allboxen = implode("", $allboxen);
					$list = "The server with the following configuration is ready for deployment: <BR>
						<table cellspacing=0 cellpadding=0 border=0 width=750>
						<tr bgcolor=#cccccc><td align=right><font><b>Operating system version:</b></font></td><td><font>". $_REQUEST['os'] ."</font></td></tr>
						<tr bgcolor=#cccccc><td align=right><font><b>MAC address</b></font></td><td><font>". $_REQUEST['mac'] ."</font></td></tr>
						<tr bgcolor=#cccccc><td align=right><font><b></b></font></td><td><font>". $_REQUEST['hostname'] ."</font></td></tr>
						<tr bgcolor=#cccccc><td align=right><font><b>Domain name:</b></font></td><td><font>". $_REQUEST['domain'] ."</font></td></tr>
						<tr bgcolor=#cccccc><td align=right><font><b>IP address type:</b></font></td><td><font>". $_REQUEST['addresstype'] ."</font></td></tr>
						<tr bgcolor=#cccccc><td align=right><font><b>CPU type:</b></font></td><td><font>". $_REQUEST['arch'] ."</font></td></tr>
						<tr bgcolor=#cccccc><td align=right><font><b>Hard drive:</b></font></td><td><font>". $_REQUEST['harddrive'] ."</font></td></tr>
						</table>
						<table cellspacing=0 cellpadding=0 border=0 width=750>
						<tr><td><font><b>Not sure what to do next?  Refer to our <a href=\"http://secure.serverminds.com/support/index.php?fun=faq_comments&faqid=63\">Serverminds FastDeploy Service User Guide</a> for additional information on 
						using this service to automate the deployment of operating systems. </font></td></tr>
						</table>". $allboxen ."
						"; 
				} // end of server deployment - deploy_error is OVER
			}
			if (($_REQUEST['timezone'] == "") || ($_REQUEST['language'] == "")) { // don't bother to populate language/tz SELECT
						// if there's already a selected language/timezone value - go below to build 
				foreach ($tz as $k => $v) {
					if ($tz[$k] == "US/Pacific") { 
						$selected_tz = "SELECTED";	
					}
					else { 
						$selected_tz = "";	
					}
					$tz_list .= "<option value=\"". $tz[$k] ."\" $selected_tz>". $v ."</option>\n"; 
				}
				
				foreach ($lang as $k => $v) {
					if ($k == "en_US") {
						$selected_lang = "SELECTED"; 
					}
					else {
						$selected_lang = "";
			 		}
					$lang_list .= "<option value=\"". $k ."\" $selected_lang>". $v ."</option>\n"; 
				}
			}
				// put your real error-checking code in here
				//serverid,customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install-web-server,install-dns-server,install-mysql-server,language,timezone,arch,harddrive
			
			if (($_REQUEST['deploy_stage'] == "") && ($_REQUEST['verify'] != "no") || (sizeof($error_code) > 0) || ($_REQUEST['verify'] == "yes")) { // i.e., still go back to the form if there are errors OR
										// it's a completely new entry OR it's existing being EDITED			
				if (($_REQUEST['deploy_stage'] == "") && ($_REQUEST['deploy_error_check'] != "new_stage2") && ($_REQUEST['editserver'] == "")) { 
					$ip_display = 'style="display : none;"'; 
					$stage_display = '<input type=hidden value="new_stage2" name="deploy_error_check">';
					$stage_display .= '<input type=hidden value="yes" name="verify">';
					$all_codes = '<table border="0" cellspacing="2" cellpadding="0"><tr><td><td><font color=black>Please verify that the values are correct</font></td></tr></table>';
					$stage_val_display = "Deploy new server";
				} 
				elseif ($_REQUEST['editserver'] != "") { // server IS being edited....
					//$ip_display = 'style="display : none;"'; 
					$stage_display = '<input type=hidden value="new_stage2" name="deploy_error_check">';
					$stage_display .= '<input type=hidden value="yes" name="verify">';
					$stage_display .= '<input type=hidden value="'. $_REQUEST['mac'] .'" name="editing">';
					$all_codes = '<table border="0" cellspacing="2" cellpadding="0"><tr><td><td><font color=black>Please verify that the values are correct</font></td></tr></table>';
					$stage_val_display = "Edit Server";
				} 
				elseif ((sizeof($error_code) > 0) && ($_REQUEST['verify'] == "no")) { // in other words, there was an error during FINAL verify
					//$ip_display = 'style="display : none;"'; 
					$stage_display = '<input type=hidden value="new_stage2" name="deploy_error_check">';
					$stage_display .= '<input type=hidden value="yes" name="verify">';
					//$all_codes = '<table border="0" cellspacing="2" cellpadding="0"><tr><td><td><font color=black>Please verify that the values are correct</font></td></tr></table>';
					$stage_val_display = "Verify settings";
					if ($_REQUEST['editing'] != "") { // preserve the editing state
						$stage_display .= '<input type=hidden value="yes" name="editing">';
					}
				}
				$errs = sizeof($error_code); 
				$err_code = implode (",",$error_code); 
				$list = '<table width=100% border=0 cellspacing=1 cellpadding=0 align=center> 
				<tr><td class="pageTitle uline">FastDeploy Services :: '. $stage_val_display .'</td></tr><table>
				'. $all_codes .'
				<table border="0" cellspacing="2" cellpadding="0">
				<form name="deployForm" method="POST" action="UserTickets.php">
				<input type=hidden value="deploy" name="fun"> 
				'. $stage_display .'
				<tr><td align=right class=tblColBg>Pick an operating system to install:</td><td align=left><select tabindex=1 name="os"> 
						 <option value="">--> Pick an operating system </option>
				                     <option value="centos4" '. $selected_os_c4 .'>CentOS 4 - Latest</option>
				                     <option value="centos3.6" '. $selected_os_c35 .'>CentOS 3.6</option>
				                     <option value="centos3.5" '. $selected_os_c36 .'>CentOS 3.5</option>
				                     <option value="fedora3" '. $selected_os_f3 .'>Fedora Core 3</option>
				                     <option value="fedora4" '. $selected_os_f4 .'>Fedora Core 4</option>
				                     <option value="debian3.1" '. $selected_os_d31 .'>Debian 3.1 - stable "sarge"</option>
				                     <option value="ubuntu" '. $selected_os_ub .'>Ubuntu 5.10 - stable "breezy"</option>
						</select> 
						</td></tr>
				<tr><td align=right class=tblColBg>Enter system <a href="#" onClick="window.open(\'http://secure.serverminds.com/support/help.php?p=mac\',\'mywindow\',\'width=200,height=200\')">MAC Address</A></td><td align=left><input type=text size=17 tabindex=2 onKeyUp="chkThis(this);" maxlength=17 value="'. $_REQUEST['mac'] .'" name=mac></td></tr>				
				<tr><td align=right class=tblColBg>Network addressing</td><td align=left><input type=radio tabindex=3 name=addresstype value="dynamic" onClick="applyDisplay(\'off\',\'static\'); applyDisplay(\'off\',\'ip\');" '. $dynamic_type .'>Dynamic IP <input onClick="applyViz(this.checked,\'static\'); applyViz(this.checked,\'ip\');" type=radio name=addresstype value="static" '. $static_type .'>Static IP</td></tr>
				<tr><td id="static" style="display : none;" align=right valign=top class=tblColBg>&nbsp;</td><td align=left>
				<div id="ip" '. $ip_display .'><table cellspacing=0 cellpadding=0 border=0 width=100%>
					<tr><td align=right>IP address:</td><td align=left><input type=text size=15 tabindex=5 name=ip value="'. $_REQUEST['ip'] .'" name=ip size=15 maxlength=15></td></tr>
					<tr><td align=right>Netmask:<td align=left><input type=text size=15 tabindex=6 name=netmask value="'. $_REQUEST['netmask'] .'" name=netmask size=15 maxlength=15></td></tr>
					<tr><td align=right>Gateway:<td align=left><input type=text size=15 tabindex=7 name=gateway value="'. $_REQUEST['gateway'] .'" name=gateway size=15 maxlength=15></td></tr>
					<tr><td align=right>Primary DNS:<td align=left><input type=text size=15 tabindex=8 name=dns_1 value="'. $_REQUEST['dns_1'] .'" name=dns_1 size=15 maxlength=15></td></tr>
					<tr><td align=right>Secondary DNS:<td align=left><input type=text size=15 tabindex=9 name=dns_2 value="'. $_REQUEST['dns_2'] .'" name=dns_2 size=15 maxlength=15></td></tr>
					</table>
				</div>				     
				</td></tr>
				<tr><td align=right class=tblColBg>Enter system <a href="#" onClick="window.open(\'http://secure.serverminds.com/support/help.php?p=hostname\',\'mywindow\',\'width=200,height=200\')">hostname</A></td><td align=left><input type=text size=20 tabindex=10 maxlength=50 value="'. $_REQUEST['hostname'] .'" name=hostname></td></tr>				
				<tr><td align=right class=tblColBg>Enter system <a href="#" onClick="window.open(\'http://secure.serverminds.com/support/help.php?p=domain\',\'mywindow\',\'width=200,height=200\')">domain name</A></td><td align=left><input type=text size=20 tabindex=11 maxlength=50 value="'. $_REQUEST['domain'] .'" name=domain></td></tr>				
				<tr><td align=right valign=top class=tblColBg>Choose standard server profile install options: </td>
				<td align=left><input type=checkbox tabindex=12 name="install-web-server" '. $web_server_sel .'>Web Server : Apache + PHP<BR>
				               <input type=checkbox tabindex=13 name="install-dns-server" '. $dns_server_sel .'>DNS Server : BIND<BR>
				               <input type=checkbox tabindex=14 name="install-mysql-server" '. $mysql_server_sel .'>MySQL Server<BR>			               
				</td></tr>
				<tr><td align=right class=tblColBg>Enter system <a href="#" onClick="window.open(\'http://secure.serverminds.com/support/help.php?p=rootpass\',\'mywindow\',\'width=200,height=200\')">root password</A></td><td align=left><input type=password tabindex=16 size=20 maxlength=50 value="'. $_REQUEST['rootpw_orig'] .'" name=rootpw_orig></td></tr>				
				<tr><td align=right class=tblColBg>Confirm root password</td><td align=left><input type=password size=20 tabindex=17 maxlength=50 value="'. $_REQUEST['rootpw_orig'] .'" name=rootpw_confirm></td></tr>				
				<tr><td align=right class=tblColBg>Choose language: </td>
				    <td align=left><select name=language tabindex=18>
				                    '. $lang_list .'
						</select>
				</td></tr>
				<tr><td align=right class=tblColBg>Choose the time zone: </td>
				<td align=left><select name=timezone tabindex=19>'. $tz_list .'</select>
				</td></tr>
				<TR>
				<td align=right class=tblColBg>Choose your CPU: </td><td align=left><input type=radio tabindex=20 name="arch" value="i386" '. $x86_checked .'>Intel/AMD x86 <input type=radio name="arch" value="x86_64" '. $x86_64_checked .'>AMD64 </td>
				</tr>
				<tr><td align=right class=tblColBg>Choose your hard drive type:</td><td align=left><input type=radio tabindex=21 name=harddrive value=ide '. $ide_checked .'>IDE <input type=radio name=harddrive value=scsi '. $scsi_checked .'>SCSI <input type=radio name=harddrive value=sata '. $sata_checked .'>Serial ATA</td></tr>
				<tr><td align=right class=tblColBg>Email notify after server is installed?</td><td align=left><input type=checkbox name=notify '. $notify_checked .'></td></tr>
				</table>
				<table WIDTH=750 border="0" cellspacing="2" cellpadding="0">
				<tr><td><font><B>PLEASE NOTE:  Serverminds will automatically partition your FIRST hard drive!!! This means you WILL LOSE ALL DATA ON THIS DRIVE!!!
				WE CANNOT GUARANTEE, PROTECT AGAINST, OR BE HELD LIABLE FOR ANY DATA LOSS ON <U>ANY</U> HARD DRIVE!!!  THIS IS IMPORTANT!!!</b></font></td></tr>
				</table>
				<table border="0" cellspacing="2" cellpadding="0">
				<tr><td align=right class=tblColBg>Confirm this setup > </td><td align=left><input type=submit tabindex=21 value="Deploy Server"></td></tr>
				
				</table>
				</form>
				<script language="JavaScript">
				document.deployForm.os.focus();
				</script>
				';
				
			} // end of empty stage
			elseif ($_REQUEST['deploy_stage'] == "list") { 
				$mysqlc = mysql_connect('localhost','root','Ashcan33');
				mysql_select_db('serverminds'); 
	   				$server_list = mysql_query("SELECT * FROM servers WHERE customer_id='". $_SESSION['customer_name'] ."'"); 
				if (!$mysqlc) {
	   				die('Could not connect: ' . mysql_error());
	   			}
	   			elseif (mysql_num_rows($server_list) > 0) { // don't bother displaying a list of servers if there are none
	   				
	   				$allboxen = array(); 
	   				// serverid,customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install-web-server,install-dns-server,install-mysql-server,language,timezone,arch,harddrive
	   				// href=\"general.php?action=UserTickets&fun=deploy&username=". $_SESSION['customer_name'] ."&mac=". $item_row->mac ."&deploy_stage=delserver\"
	   				array_push($allboxen,"<table width=750 cellspacing=0 cellpadding=0 border=0 class=data_set>
	   						  <tr bgcolor=#cccccc><td><font><b>os</b></font></td><td><font><b>mac</b></font></td><td><font><b>Addr</b></font></td><td><font><b>IP</b></font></td>
	   				                      <td><font><b>host</b></font></td><td><font><b>lang</b></font></td><td><font><b>arch</b></font></td><td><font><b>drive</b></font></td>
	   				                      <td><font><b>delete?</b></font></td><td><font><b>edit?</b></font></td>
	   				                      </tr>"); 
	   				
	   				
	   				if (mysql_num_rows($server_list) > 0) { 
	   					$row_num = 0; 
	   					while($item_row = mysql_fetch_object($server_list)) { 
	   						array_push($allboxen,"<tr><td><font>". $item_row->os ."</font></td><td><font>". $item_row->mac ."</font></td><td><font>". $item_row->addresstype ."</font></td><td><font>". $item_row->ip ."</font></td>
	   						<td><font>". $item_row->hostname ."</font></td><td><font>". $item_row->language ."</font></td><td><font>". $item_row->arch ."</font></td><td><font>". $item_row->harddrive ."</font></td>
	   						<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   						    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"general.php?action=UserTickets&fun=deploy&username=". $_SESSION['customer_name'] ."&mac=". $item_row->mac ."&deploy_stage=delserver\">yes?</a><a href=\"\"> no?</a></font></div></td>
	   						<td><font><a href=\"general.php?action=UserTickets&fun=deploy&username=". $_SESSION['customer_name'] ."&editserver=". $item_row->mac ."&deploy_error_check=new_stage2\">edit?</a></font></td></tr>"); 
			   				$row_num++;                   
	   					}
	   				}
	   				array_push($allboxen,"</table>");
	   				$list = implode("", $allboxen); 
	   			}
	   			else {
	   				$list = "<table width=750 cellspacing=0 cellpadding=0 border=0> 
	   					<tr><td><font><b>Sorry, you don't appear to have installed any servers yet</b></font></td></tr>
	   					</table>"; 
	   			}	
			}
			elseif ($_REQUEST['deploy_stage'] == "delserver") { 
				$mysqlc = mysql_connect('localhost','root','Ashcan33');
				if (!$mysqlc) {
	   				die('Could not connect: ' . mysql_error());
	   			}
	   			else { 
	   				mysql_select_db('serverminds'); 
	   				$server_delete = mysql_query("DELETE FROM servers WHERE mac='". $_REQUEST['mac'] ."'"); 
	   				$server_list = mysql_query("SELECT * FROM servers WHERE customer_id='". $_SESSION['customer_name'] ."'"); 
	   				$allboxen = array(); 
	   				// serverid,customer_id,os,mac,addresstype,ip,netmask,gateway,dns_1,dns_2,hostname,domain,install-web-server,install-dns-server,install-mysql-server,language,timezone,arch,harddrive
	   				array_push($allboxen,"<table width=750 cellspacing=0 cellpadding=0 border=0 class=data_set>
	   						  <tr bgcolor=#cccccc><td><font><b>os</b></font></td><td><font><b>mac</b></font></td><td><font><b>Addr</b></font></td><td><font><b>IP</b></font></td>
	   				                      <td><font><b>host</b></font></td><td><font><b>lang</b></font></td><td><font><b>arch</b></font></td><td><font><b>drive</b></font></td><td><font><b>delete?</b></font></td>
	   				                      <td><font><b>edit?</b></font></td></tr>"); 
	   				
	   				
	   				if (mysql_num_rows($server_list) > 0) { 
	   					while($item_row = mysql_fetch_object($server_list)) { 
	   						array_push($allboxen,"<tr><td><font>". $item_row->os ."</font></td><td><font>". $item_row->mac ."</font></td><td><font>". $item_row->addresstype ."</font></td><td><font>". $item_row->ip ."</font></td>
	   						<td><font>". $item_row->hostname ."</font></td><td><font>". $item_row->language ."</font></td><td><font>". $item_row->arch ."</font></td><td><font>". $item_row->harddrive ."</font></td>
	   						<td><div id=\"show_del[". $row_num ."]\"><font><a href=\"#\" onClick=\"applyDisplay('off','show_del[". $row_num ."]'); applyDisplay('on','show_yesno[". $row_num ."]')\">del?</a></font></div>
	   						    <div style=\"display : none;\" id=\"show_yesno[". $row_num ."]\"><font><a href=\"general.php?action=UserTickets&fun=deploy&username=". $_SESSION['customer_name'] ."&mac=". $item_row->mac ."&deploy_stage=delserver\">yes?</a><a href=\"\"> no?</a></font></div></td>
	   						<td><font><a href=\"general.php?action=UserTickets&fun=deploy&username=". $_SESSION['customer_name'] ."&editserver=". $item_row->mac ."&deploy_error_check=new_stage2\">edit?</a></font></td>
	   						</tr>"); 
			   				                      
	   					}
	   				}
	   				array_push($allboxen,"</table>");
	   				$list = implode("", $allboxen); 
	   			}		
			}
			else { 
				
			}	
			return $list;
	}	
	
	// basic page-switching logic
	if($_REQUEST['page'] == 'home')
	{
		$list = HomePage($result);
		$list .= "<table width=750 cellspacing=0 cellpadding=0>
			<tr><td width=100% bgcolor=#cccccc>&nbsp;</td></tr>
			</table>";
		echo $list;
	}
	
	if ($_REQUEST['fun'] == 'deploy') {
		$list = FastDeploy(); 
		$list .= "<table width=750 cellspacing=0 cellpadding=0>
			<tr><td width=100% bgcolor=#cccccc>&nbsp;</td></tr>
			</table>"; 
		echo $list; 	
	}


else
{
	echo '<html><head><title>Serverminds FastDeploy Login Screen</title>
		<link rel="stylesheet" type="text/css" href="fastdeploy.css">
		</head>
		<body bgcolor=#ffffff>
		<center>
		Please login first: 
		<table cellspacing=0 cellpadding=0 border=1 style="border : black 1px" width=200>
		<tr><td><B>Username:</b></td><td><Input type=text size=20 maxlength=20 name=username value="'.  $_REQUEST['username'] .'"></td></tr>
		<tr><td><B>Password:</b></td><td><Input type=text size=20 maxlength=20 name=password value="'.  $_REQUEST['password'] .'"></td></tr>
		</table>
		<table cellspacing=0 cellpadding=0 border=0>
		<tr><td>&nbsp;</td></tr>
		<tr><td>Don\'t have a username?  Please <a href="?page=register>click here</a> to register for free access</td></tr>
		</table>
		</center>
		</body>
		</html>
		'; 
		
		
}
?>